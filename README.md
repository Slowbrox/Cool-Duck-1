# Cool Duck 1 (Gangsta Penguin edition)

A browser game drawn on a single `<canvas>`. No libraries, no build step.

## How to run
Double-click **`index.html`**. That's it. (Works straight from your computer; no web server needed.)

## Folder structure

```
cool-duck-gangsta-penguin/
├── index.html                      The page: canvas, controls text, touch buttons, and the <script> list
├── README.md                       This file
├── css/
│   └── style.css                   Page layout, light/dark colours, touch-control buttons
└── js/
    ├── data/                       Embedded assets (base64). Big files - you never need to edit these
    │   ├── font-data.js              "Tag" + "TagBig" graffiti fonts
    │   ├── sidewalk-swagger-data.js  Radio track 1: "Sidewalk Swagger" (MP3)
    │   ├── music-data.js             Radio track 2: "Old Theme" (MP3)
    │   ├── late-night-data.js        Radio track 3: "Late Night" (MP3)
    │   ├── clear-skies-data.js       Radio track 4: "Clear Skies" (MP3)
    │   ├── scratch-sound-data.js     DJ scratch sound (level-clear screen)
    │   └── stamp-sound-data.js       Rank-stamp sound (level-clear screen)
    │
    ├── 01-setup.js                 Canvas, world size, game state variables
    ├── 02-input.js                 Keyboard / mouse / touch input
    ├── 03-audio.js                 Sound effects (sfx, noiz), mixer, music loops
    ├── 04-drawing-helpers.js       Tiny helpers: R (rectangle), TX (text), rn (random), ov (overlap)
    ├── 05-level.js                 World 1-1 HANA MEADOW layout (P, coins, slimes, bubbles)
    ├── 06-city-background.js       Skyline, sky gradient, particles, confetti
    ├── 07-duck-model.js            The 3D duck model and how it is drawn
    ├── 08-player-animation.js      Player pose, scarf physics, water spit effects
    ├── 09-space-tutorial.js        Opening tutorial scene
    ├── 10-coins-flowers-platforms.js  Collectibles, flowers, platforms, parachute jacket
    ├── 11-spit-attack.js           Old spit attack (no longer triggered: there is no water any more)
    ├── 12-bubble-attack.js         Old bubble attack (no longer triggered; replaced by the egg)
    ├── 13-game-logic.js            start(), movement, damage, entering shops, main update upd()
    ├── 14-characters-drawing.js    Humans, NPCs, pigeons
    ├── 15-scenery.js               Mountains, clouds, forest, hedges, foreground
    ├── 16-slimes-and-kills.js      Slime enemies, kill effects, HUD, dialog box, shop/end screens
    ├── 17-tutorial-level.js        Tutorial level helpers
    ├── 18-cosmetics-and-save.js    Hats / jackets / scarves list + save & load (localStorage)
    ├── 19-main-screen.js           Room wall, door, wardrobe, boot + title screens
    ├── 20-lobby-and-shop.js        Lobby and wardrobe shop UI
    ├── 21-street-level.js          Street level ("t1"): update, draw, HUD
    ├── 22-render-pipeline.js       draw() for every screen + pixel-art colour grading
    ├── 23-street-floor.js          Road and sidewalk tiles
    ├── 24-penguin-enemy.js         90s streetwear penguin enemy (code names still say "golem")
    ├── 25-car-and-level-clear.js   90s car and the level-clear / rank screen
    ├── 26-music-and-main-loop.js   Radio tracks, music, and the 60 fps game loop
    ├── 27-tutorial-scenery.js      Tutorial scenery (lesson scrolls, statues, flags)
    ├── 28-hits-stars-gameover.js   Hit feedback, game over, hidden bread positions, level-1 dressing
    ├── 29-skate-tricks-props.js    Skate tricks, crates, vending machines
    ├── 30-level-two.js             World 1-2 SAKURA HILLS layout (bubbles + egg tunnel) + coin icon + intro card
    ├── 31-colors-and-boards.js     Duck colours, skateboards, bread wallet
    ├── 32-level-three.js           World 1-3 MATSU CLIFFS layout (hooks + glide) + level names
    ├── 33-grassland-scenery.js     Grassland look of World 1: background, ground, natural hills ("h", caves),
    │                               floating grass islands, flower-wreath anchors, spiky chestnut
    ├── 34-pro-ui.js                Level HUD, transitions, pause menu
    ├── 35-egg-attack.js            Egg throw (F / click), level records, "enemies left" lock on the club
    ├── 36-star-book.js             Lobby book: star road with each level's best grade + score
    ├── 37-gamepad.js               Controller support (maps buttons onto the keyboard controls)
    ├── 38-cinematic-intro.js       Boot screen + SLOWBRO PRODUCTION logo + Cool Duck egg-splat intro
    ├── 39-bread-and-story.js       Stars drawn as bread loaves + story screen after the tutorial
    ├── 40-floating-platforms.js    Bouncy soap bubbles (tutorial + the "b" platforms of the World 1 levels)
    ├── 41-world-map.js             World map: top-down island overworld, World 1-1 ... 1-10 (mini-boss tower),
    │                               pier to World 2, training side path; walk, peace sign, start the level
    └── 42-checkpoint.js            Mid-level checkpoint flag: hoists when you pass it, game over sends you back to it
```

## Level design (World 1)
Every level has ONE core idea, told in 4 steps (Nintendo's "introduce, develop, twist, finale"):
the first use is safe, the next ones add pits, the twist combines it with something new, the end is a reward.
The mechanics are REQUIRED: each gate is impossible without its mechanic and possible with it (checked by a test bot).
Coins only mark the way (about 60 per level), decoration stays sparse. Knocking out an enemy shows no text.
Every level is 212 tiles long (`WW` in 01-setup.js; the goal car and the club sit at the end). Halfway through there is a
checkpoint flag next to a stone lantern: after you pass it, losing all hearts sends you back to the flag instead of the start,
and only the coins picked up after the flag are lost. The second half of each level develops the core idea further:
- 1-1 Hana Meadow - the parachute: glide over pits too wide to jump; bubbles bounce you up to the launch points.
  Second half: a bubble ladder up a high cliff, the longest glide of the level, two quick glide hops.
- 1-2 Sakura Hills - soap bubbles bounce you up walls and higher ledges; a spiky chestnut in a low tunnel needs an egg (F).
  Second half: a bubble at the pit edge + a floating bubble up to a high plateau, a longer tunnel with two chestnuts.
- 1-3 Matsu Cliffs - swing on flower wreaths (Q) up to a higher cliff, glide (hold jump) over the valley.
  Second half: a chain of four wreaths over a wide pit, a swing up a high cliff, a glide over the next valley.

## Important rules
- **Load order matters.** The numbers in the file names are the order they run, and `index.html` lists them in that order. If you add a file, add its `<script>` tag in the right place.
- The game code is the **exact original code**, only moved into files. Nothing was renamed, rewritten, or reformatted, so it behaves the same as `Cool_Duck_Gangsta_Penguin_FINAL.html`.
- Files are plain scripts (not modules) on purpose, so the game still opens by double-clicking `index.html`.
- Saves use `localStorage` under the key `cool_duck_1` (level records: `cool_duck_1_lv`, radio song: `cool_duck_1_track`).

## Controls
← → / A D move · Space / W jump · F / Click throw an egg · E talk & enter · M mute · Shift skateboard · Q / right-click scarf
Lobby: B star-road book · R radio · wardrobe: arrows + Enter to pick · door: world map
World map: arrows / click a pad to walk · Enter / Space / click the duck's pad to play · Esc back to the lobby

**Controller** (Xbox / PlayStation / Switch Pro, plug in or pair, then press any button):
stick / D-pad move · A jump (hold: glide) · X throw egg · Y talk / enter · RB/RT skateboard · LB/LT scarf · START pause · SELECT mute.
Menus: A confirm · B back. Lobby: X book · Y radio. Radio: X shuffle. Wardrobe: LB/RB change page.
