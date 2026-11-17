# DIAMOND BLOOM — a baseball arcade

An original, complete browser game built for the make.fun **"Make the best game"** bounty.
Single self-contained file — no build step, no server, no external assets.

## Play

Open `index.html` directly in any modern browser (double-click it, or serve it
from any static host). It works from `file://`.

Bottom of the ninth, two outs, and #17 — a two-way star — steps to the plate.
Fielders hunt you down and pitchers throw heat — but every ball you smash is a
**hit**. Hits move the runner around the bases (1st → 2nd → 3rd → home); four
hits scores a **run**. A hot hitting streak turns hits into doubles and triples.
Survive the innings and score runs before the third out ends the game. And when
the moment calls for it, take the mound yourself and deal 100mph heat.

A fan tribute inspired by Shohei Ohtani (#17) — not affiliated with or endorsed
by him.

## Controls

- **WASD / Arrow keys**, **mouse**, or **touch drag** — run (baseballs fire automatically at the nearest opponent)
- **SPACE** — slide (brief burst of speed + invulnerability, 2.5s cooldown)
- **X / Right-click / PITCH button** — pitch a 100mph fastball (pierces through enemies in a line, 4s cooldown)
- **P / Esc** — pause
- **M** — mute
- **Enter / R** — start / restart

## Features

- **Ohtani elements (二刀流)**: the batter wears jersey **#17**; a **pitch** ability (X / right-click / PITCH button) throws a 100mph fastball that pierces through enemies in a line (4s cooldown, 2s during SHOTIME); a **SHOTIME meter** fills with hits and runs — when full it activates SHOTIME for 8 seconds (faster, harder baseballs, double-speed streak, +1 base per hit, halved pitch cooldown, gold aura and banner); every **home run** shows a gold "SHOTIME!" banner with a fanfare. Title screen carries a "fan tribute inspired by Shohei Ohtani" credit line.
- Title screen, pause screen, game-over screen with stats and restart
- Innings instead of waves: Fielders, Base Stealers, Sluggers (split into Foul Balls), and Pitchers (throw baseballs back from range). Difficulty keeps rising past the 9th inning into extra innings
- Bases and runs: a live diamond in the HUD shows the runner; every 4 hits scores a run; inning-clear bonuses add runs
- Hitting streak (combo) multiplier — up to a 4-base advance per hit when hot
- Power-ups: Helmet (blocks one out), Fastball (double baseballs), Glove (attracts hit balls), Home Run (clears the field and scores a run)
- 3 outs, slide with invulnerability frames, screen shake, particles, floating score text
- Persistent best score (localStorage)
- Synthesized WebAudio sound effects (no audio files) with mute toggle
- All art drawn on canvas: green field with mow stripes, dirt infield diamond, bases, pitcher's mound and foul lines

## Files

- `index.html` — the entire game (HTML + CSS + JS, ~50 KB)

## Testing

Verified headlessly in Chromium (DevTools Protocol): `node --check` on the
game script passes; zero external URLs in the file. An automated 15-second play
session scored runs with hits and retired fielders, then reached inning 2;
title → start → pause/resume → game-over → restart were all exercised with zero
console errors or page exceptions. Baseball mechanics were verified directly:
four hit-orbs advance the runner 1st → 2nd → 3rd → home and score a run; the
home-run power-up scores a run and clears the field; an idle batter loses all
three outs (game over in inning 4 in testing), while an actively played batter
survives and scores. Ohtani mechanics were verified the same way: the pitch
retires enemies and keeps flying after its first kill (pierce), with a ~4s
cooldown (2s during SHOTIME); SHOTIME activates from a full meter with a gold
banner, halves the pitch cooldown, and makes a single hit advance 2+ bases,
then ends cleanly after 8 seconds; a home run shows the gold "SHOTIME!" banner.
Screenshots of the title, gameplay, SHOTIME, and game-over screens were
inspected visually (jersey #17 and the gold SHOTIME aura render correctly).

A built-in self-test hook is included: opening `index.html?autotest=1` auto-plays
the game for ~15 seconds and writes the result into the page (used only for
automated testing; it does nothing during normal play).
