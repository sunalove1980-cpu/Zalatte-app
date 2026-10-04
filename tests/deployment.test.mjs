import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { sourceHash } from '../scripts/source-hash.mjs';
const text = p => readFileSync(p, 'utf8');
test('published output matches source and every fresh build file', () => {
  assert.equal(JSON.parse(text('release.json')).sourceHash, sourceHash());
  function walk(dir) {
    for (const e of readdirSync(dir, { withFileTypes:true })) {
      const p = `${dir}/${e.name}`;
      if (e.isDirectory()) walk(p);
      else assert.deepEqual(readFileSync(p), readFileSync(p.replace('frontend/dist/', '')));
    }
  }
  walk('frontend/dist');
});
test('Pages base, PWA identity, icons and entry assets resolve', () => {
  const html = text('index.html');
  for (const [, url] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    assert.ok(url.startsWith('/Zalatte-app/'), url);
    assert.ok(existsSync(url.slice('/Zalatte-app/'.length)), url);
  }
  for (const name of ['manifest.webmanifest', 'manifest-v2.webmanifest']) {
    const manifest = JSON.parse(text(name));
    assert.equal(manifest.scope, './');
    assert.equal(manifest.start_url, './');
    for (const icon of manifest.icons) assert.ok(existsSync(icon.src));
  }
  assert.equal(JSON.parse(text('manifest-v2.webmanifest')).id, './?app=kimjara-parklatte');
  assert.equal(text('firebase-messaging-sw.js'), text('frontend/public/firebase-messaging-sw.js'));
  assert.ok(!/caches\.(open|delete)/.test(text('firebase-messaging-sw.js')));
});
test('no credential files, server deployments or private backups in tracked files', async () => {
  const { execFileSync } = await import('node:child_process');
  const files = execFileSync('git', ['ls-files'], {encoding:'utf8'}).trim().split('\n');
  const forbidden = /(^|\/)(\.env(?:\..*)?|functions|firestore\.rules|firebase\.json|\.firebaserc|.*\.bundle|.*\.pem|.*\.key|.*service.account.*\.json)$/i;
  const signatures = [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, /gh[pousr]_[A-Za-z0-9]{30,}/, /github_pat_[A-Za-z0-9_]{30,}/, /AKIA[A-Z0-9]{16}/, /"private_key"\s*:/];
  for (const f of files) {
    assert.ok(!forbidden.test(f), `Forbidden path: ${f}`);
    const body = text(f);
    for (const pattern of signatures) assert.ok(!pattern.test(body), `Credential signature in ${f}`);
  }
});
