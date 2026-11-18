// DIAMOND BLOOM — make.fun "Make the best game" (best-game-01) entrypoint.
//
// The game itself is plain static files under game/ (a single self-contained
// index.html: canvas art, synthesized WebAudio, no build step, no network).
// This program hands the entry in: it copies game/ and screenshots/ from
// beside this file into the output directory and writes dossier.json with
// the kit's vendored library, so the judge can read the game.
//
// Run it locally the same way the grader does, with MAKEFUN_OUTPUT_DIR
// standing in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Then serve game/ with any static server to play it:
//   node serve.ts   (or: python3 -m http.server -d game)

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });

// The game: every file under game/ goes to the output verbatim.
cpSync(join(repoRoot, 'game'), join(outDir, 'game'), { recursive: true });

// The screenshots: 3-4 real renders of the game (title, play, SHOTIME,
// game over). The first by name is the cover the judge sees largest.
mkdirSync(join(outDir, 'screenshots'), { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), join(outDir, 'screenshots'), { recursive: true });
}

// The dossier: what the judge reads. Caps mirror the competition's gate
// (see the kit's RULES.txt): at most 4 screenshots of 256 KiB, game/ at
// most 993 files / 48 MiB, and the dossier text capped at 160 KiB.
writeFileSync(
  join(outDir, 'dossier.json'),
  buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    game_max_files: 993,
    game_max_bytes: 50331648,
    game_path_max_bytes: 1000,
  }),
);
