# Tempest Games website

Served by GitHub Pages at **https://tempestgames99.github.io** from the repository
`TempestGames99/TempestGames99.github.io`. It must stay named `TempestGames99.github.io`
(that is what makes it the root site, which app-ads.txt needs) and public.

| File | What it is for |
|---|---|
| `index.html` | The studio page (the "Website" field on every store listing) |
| `privacy-policy.html` | One privacy policy for **every** Tempest Games title. Link it in each game's store listing and inside each game. For a new game, add a short note under "Game-specific notes" |
| `app-ads.txt` | AdMob's authorised-seller line for publisher `pub-1197327241056126`. It covers every app under that AdMob account; it has to stay at the site root |

Adding a game: put its icon here, add a `section.game` block to `index.html` and a note to
`privacy-policy.html`, commit and push. Pages republishes in a minute or two.
