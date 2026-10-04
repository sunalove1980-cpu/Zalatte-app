import { cpSync, writeFileSync } from 'node:fs';
import { sourceHash } from './source-hash.mjs';
// Keep old hashed chunks so already-open sessions can finish lazy imports.
cpSync('frontend/dist', '.', { recursive: true });
writeFileSync('.nojekyll', '');
writeFileSync('release.json', JSON.stringify({ sourceHash: sourceHash() }, null, 2) + '\n');
