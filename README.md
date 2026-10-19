# Mozma Games website

Served by GitHub Pages at **https://tempestgames99.github.io** from the repository
`TempestGames99/TempestGames99.github.io`. It must stay named `TempestGames99.github.io`
(that is what makes it the root site, which app-ads.txt needs) and public. The studio was
renamed from its first name to **Mozma Games** in October 2026; the address and the Google Play
package names keep the old name, as neither can change, but nothing on the pages shows it.
This README is not published (`_config.yml` excludes it).

Plain HTML and CSS, no build step: edit, commit, push, and Pages republishes in a minute or two.

## What's where

| Path | What it is for |
|---|---|
| `index.html` | The studio page (the "Website" field on every store listing): hero, featured game, a card per game, studio blurb |
| `games/<slug>/` | One folder per game: its page (`index.html`) and all of its pictures |
| `games/_template/` | The game page to copy for a new game. Folders starting with `_` are not published |
| `privacy-policy.html` | One privacy policy for **every** title. Each game has a note under "Game-specific notes" with `id="<slug>"` |
| `assets/site.css` | The whole look, shared by every page. Game pages re-colour it with variables, never by editing this file |
| `assets/site.js` | Store buttons, trailer and screenshot viewer, driven entirely by the HTML |
| `assets/` (images) | Studio favicon, stacked logo, link-preview picture |
| `mozma-games.webp` | The wide studio logo (top bar and footer) |
| `app-ads.txt` | AdMob's authorised-seller line for publisher `pub-1197327241056126`. Must stay at the site root |

Game folders today: `rise-and-bake`, `wobble-shot-league` and `hazard-pay` (all complete).

## Adding a game

1. **Pick a slug**: the name in lowercase with dashes, e.g. `rise-and-bake`. It becomes the page's
   address (`/games/rise-and-bake/`), so don't change it once the link is out.
2. **Copy** `games/_template/` to `games/<slug>/`.
3. **Add the pictures** (sizes under "Pictures"). Only `icon.webp` is required.
4. **Fill in** `games/<slug>/index.html`: every spot is marked `FILL`; see the next section.
5. **Add a card** to `index.html` under "Our games", newest first: copy an `<a class="card">` block,
   change link, pictures, title, pitch, tags and `--c` (the game's main colour). With a
   `card.webp` use `<div class="art">` (like Rise & Bake); without, `<div class="art from-icon">`
   with the icon twice. Add `<span class="chip status">Coming soon</span>`
   inside `.art` until launch.
6. **Spotlight it** (optional): the "featured" banner on `index.html` shows one game. Change its
   link, `keyart.webp`, `logo.webp`, sentence, eyebrow text and the three colours in its `style`.
7. **Privacy**: add `<h3 id="<slug>">Game name</h3><p>...</p>` under "9. Game-specific notes" in
   `privacy-policy.html`, saying exactly what the game uses (ad network and formats, in-app
   purchases, analytics, or "the game itself collects nothing"). If it uses a service the policy
   doesn't describe yet (another ad network or analytics provider, sign-in, cloud saves,
   multiplayer servers...), add it to the general sections and update the "Effective" date.
   The policy must always match what the games do.
8. Add the game's name to the `<meta name="description">` of `index.html`.
9. **Check it locally**, then **commit and push**.

## Filling in a game page

For each game's team. Open `games/<slug>/index.html` beside `games/_template/index.html` and
bring over what's missing. Only title, pitch and icon are required; empty parts hide themselves.

| Part | Where | What to put |
|---|---|---|
| Release state | `<body data-status="...">` | `coming-soon` before launch (empty store buttons read "Coming soon to Google Play", the trailer box reads "Trailer coming soon"); `""` once out (empty bits are hidden) |
| Colours | `<body style="...">` | `--bg` dark page tinted to the game, `--surface`/`--surface-2` two lighter steps, `--accent` main colour, `--accent-2` lighter, `--on-accent` text on the accent, `--glow` accent at ~35%. Optional `--display` heading font, loaded in `<head>` |
| Store links | `<a class="btn store" href="">` in the hero **and** the facts box | The Google Play URL. More stores: copy the button (web example in the template) |
| Trailer | `<div class="trailer" data-youtube="">` | YouTube link or 11-character id; plays muted and looping when scrolled to |
| Hero | `<section class="game-hero">` | With key art: `<img class="bg" src="keyart.webp">`, add `copy-right` if the characters are on the left. Without: `game-hero from-icon` plus `<img class="side-icon" src="icon.webp">` |
| Title | `<h1>`, `<img class="logo">` | With a logo keep `<h1 class="sr">` and the logo; without, delete the logo and drop `class="sr"` |
| Pitch | `<p class="tagline">`, `<meta name="description">` | One or two sentences |
| About | `.about-game` | Headline, `<p class="lead">` hook, one or two paragraphs |
| Features | `<ul class="features">` | 4–8 `<li><strong>Name</strong>One line.</li>`, an even number |
| Facts | `<aside class="facts">` | Genre, platforms, players, controls, release, privacy link `../../privacy-policy.html#<slug>` |
| Screenshots | `<div class="shots">` | `<a href="shots/NN.webp"><img src="shots/NN.webp" alt="Caption"></a>` per shot; first shows big |
| Link preview | `<meta property="og:image">` | Full URL of `share.jpg` |

**When a game goes live:** set `data-status=""`, paste the store link into both buttons and the
trailer into `data-youtube`, change "Coming soon" (page chips, home card, featured banner) to
"Out now" or remove it, and put the release date in the facts box.

## Pictures

Use `.webp` (`Image.open("in.png").save("out.webp", quality=82, method=6)` with Pillow);
`share.jpg` stays JPEG for link previews.

| File | Size | Notes |
|---|---|---|
| `icon.webp` | 512 × 512 | Required |
| `keyart.webp` | 1600–1920 wide, ~16:9 | Page backdrop and featured banner, no text on it |
| `logo.webp` | ~760 wide | Transparent background |
| `card.webp` | 960 × 540 | Home page card; key art with the logo works well |
| `share.jpg` | 1200 × 630 | Shown when the link is shared |
| `shots/01.webp`... | 1600 × 900 or 1280 × 720 | Landscape, numbered in order, under ~200 KB each |

Keep a game folder under a few MB so pages open instantly on a phone.

## Checking locally

```
python -m http.server 8765
```

Open http://localhost:8765 and check both a wide window and phone width.

## Publishing

```
git add -A
git commit -m "Add <game>"
git push origin main
```

Commit from this folder (it has its own studio git identity), not from a game's repository.
