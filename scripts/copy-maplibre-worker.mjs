/**
 * Copy MapLibre GL JS v6 worker assets into public/ for Next.js (Turbopack/webpack).
 * @see https://maplibre.org/maplibre-gl-js/docs/ (Turbopack / Next.js section)
 */
import { copyFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const dist = path.join(
  path.dirname(createRequire(import.meta.url).resolve('maplibre-gl/package.json')),
  'dist',
);
const dest = path.join(process.cwd(), 'public', 'maplibre');

mkdirSync(dest, { recursive: true });
for (const file of ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs']) {
  copyFileSync(path.join(dist, file), path.join(dest, file));
}

console.log(`Copied MapLibre worker assets to ${dest}`);
