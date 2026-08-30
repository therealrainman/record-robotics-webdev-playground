# record-robotics-webdev-playground
Playground for trying out web development for record-robotics.

This is an example branch for SpaceOfJelly to work in.

Currently contains a recreation of the [recordrobotics.org](https://www.recordrobotics.org/)
home page, built with plain HTML, CSS, and JavaScript — no framework, no build
step, no dependencies to install.

## Running it

### Option 1 — just open the file

Double-click `index.html`, or drag it into a browser window.

Good enough for a quick look. Two caveats: the Google Calendar and YouTube
embeds may be blocked by the browser when a page is opened this way, and this
is not how the site will actually be served, so prefer Option 2 when you are
testing changes.

### Option 2 — run a local server (recommended)

From the project folder, pick whichever you have installed:

```bash
python3 -m http.server 8765
```

```bash
npx serve -l 8765
```

Then open <http://localhost:8765>. Press `Ctrl+C` in the terminal to stop it.

A server is the accurate way to test: embeds behave normally, and paths resolve
the way they will in production.

### Option 3 — VS Code

Install the **Live Server** extension, then right-click `index.html` →
*Open with Live Server*. It reloads automatically as you edit.

## Project layout

```
index.html          the home page
coming-soon.html    shared stub — every nav link points here
css/styles.css      all styles; design tokens are at the top
js/main.js          burger menu, scroll reveal, stub page naming
assets/img/         logo, hero photo, sponsor logos
assets/fonts/       Familjen Grotesk + Arimo (self-hosted)
docs/               design spec
```

## Editing notes

- **The header and footer appear in both HTML files.** There is no templating,
  so a change to the nav has to be made in `index.html` *and*
  `coming-soon.html`. The markup is marked with a comment in both.
- **Design tokens live in `:root`** at the top of `css/styles.css` — colours,
  font sizes, and the content width. Change them there, not inline.
- **The responsive breakpoint is 800px**, matching the live site.
- Nav links use a hash to tell the stub which page was wanted, e.g.
  `coming-soon.html#gallery`. The mapping is in `js/main.js`.

## Not yet built

The eight content pages (About Us, Mission Statement, Outreach, Competitions,
Media, Newsletters, Gallery, Join) and the donate flow. All of them currently
land on `coming-soon.html`.
