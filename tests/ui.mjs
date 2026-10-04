import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import assert from 'node:assert/strict';
const base = '/Zalatte-app/';
const server = createServer((req,res) => {
  const url = new URL(req.url, 'http://localhost');
  if (!url.pathname.startsWith(base)) { res.writeHead(404).end(); return; }
  const path = resolve(url.pathname.slice(base.length) || 'index.html');
  if (!path.startsWith(process.cwd() + '/') || !existsSync(path) || !statSync(path).isFile()) { res.writeHead(404).end(); return; }
  const mime = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.webmanifest':'application/manifest+json', '.svg':'image/svg+xml', '.png':'image/png'};
  res.writeHead(200, {'Content-Type': mime[extname(path)] || 'application/octet-stream'}).end(readFileSync(path));
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;
let browser;
try {
  browser = await chromium.launch({headless:true, executablePath:process.env.CHROMIUM_PATH || undefined});
  for (const viewport of [{width:390,height:844},{width:1280,height:900}]) {
    const context = await browser.newContext({viewport, serviceWorkers:'allow'});
    const page = await context.newPage();
    const errors=[], failed=[], dbRequests=[];
    // Never allow production user-data APIs during smoke tests.
    await context.route(/https:\/\/(firestore|identitytoolkit|securetoken|fcmregistrations|firebaseinstallations)\.googleapis\.com\//, route => {
      dbRequests.push(new URL(route.request().url()).hostname);
      return route.abort();
    });
    page.on('pageerror', e=>errors.push(e.message));
    page.on('response', r=> { if(r.url().startsWith(origin) && r.status()>=400) failed.push(r.url()); });
    await page.goto(origin+base);
    await page.getByRole('heading',{name:'김자라 박라떼',exact:true}).waitFor();
    for(let i=0;i<3;i++) {
      await page.getByRole('button',{name:'아직 계정이 없으신가요? 회원가입하기'}).click();
      await page.getByRole('heading',{name:'회원가입',exact:true}).waitFor();
      await page.getByRole('button',{name:'이미 가입하셨나요? 로그인하기'}).click();
      await page.getByRole('heading',{name:'로그인',exact:true}).waitFor();
      await page.reload();
      await page.getByRole('heading',{name:'로그인',exact:true}).waitFor();
    }
    await page.goto(origin+base+'?app=kimjara-parklatte');
    await page.getByRole('heading',{name:'로그인',exact:true}).waitFor();
    const manifest = await page.evaluate(async()=>await (await fetch(document.querySelector('link[rel=manifest]').href)).json());
    assert.equal(manifest.id,'./?app=kimjara-parklatte');
    assert.ok(await page.getByRole('button',{name:'Google 계정으로 로그인하기 🌟'}).isVisible());
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth),false);
    assert.deepEqual(errors,[]); assert.deepEqual(failed,[]); assert.deepEqual(dbRequests,[]);
    console.log(`PASS ${viewport.width}px: login, signup toggles, reloads, PWA launch, assets; no DB/auth API requests`);
    if (process.env.CI) {
      await page.waitForFunction(async()=> (await navigator.serviceWorker.getRegistrations()).some(r=>r.active), {timeout:20000});
    }
    const registrations = await page.evaluate(async()=> (await navigator.serviceWorker.getRegistrations()).map(r=>({scope:r.scope,script:r.active?.scriptURL})));
    if (process.env.CI) {
      assert.equal(registrations.length,1);
      assert.equal(registrations[0].scope,origin+base);
      assert.equal(registrations[0].script,origin+base+'firebase-messaging-sw.js');
    }
    console.log('Service worker registrations:',JSON.stringify(registrations));
    await context.close();
  }
} finally { await browser?.close(); server.close(); }
