import { readdirSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
export function sourceHash() {
  const hash = createHash('sha256');
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a,b) => a.name.localeCompare(b.name, 'en'))) {
      if (['node_modules', 'dist'].includes(entry.name)) continue;
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(path);
      else hash.update(path).update('\0').update(readFileSync(path)).update('\0');
    }
  }
  walk('frontend');
  return hash.digest('hex');
}
