import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
const base = 'https://sunalove1980-cpu.github.io/Zalatte-app/';
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const files = ['index.html','release.json','firebase-messaging-sw.js','manifest.webmanifest','manifest-v2.webmanifest'];
function walk(dir) { for(const e of readdirSync(dir,{withFileTypes:true})) { const p=`${dir}/${e.name}`; e.isDirectory()?walk(p):files.push(p.replace('frontend/dist/','')); } }
walk('frontend/dist/assets'); walk('frontend/dist/icons');
let error;
for (let attempt=0;attempt<30;attempt++) {
  try {
    for (const file of files) {
      const response = await fetch(`${base}${file}?verify=${process.env.GITHUB_SHA || Date.now()}`,{cache:'no-store',signal:AbortSignal.timeout(20000)});
      if (!response.ok) throw new Error(`${file}: HTTP ${response.status}`);
      if (hash(Buffer.from(await response.arrayBuffer())) !== hash(readFileSync(file))) throw new Error(`${file}: content differs`);
    }
    console.log(`LIVE VERIFIED: ${files.length} files match local build; commit ${process.env.GITHUB_SHA || 'local'}; ${base}`);
    process.exit(0);
  } catch(e) { error=e; console.log(`Waiting for Pages (${attempt+1}/30): ${e.message}`); }
  await new Promise(r=>setTimeout(r,10000));
}
throw error;
