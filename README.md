# Yousef Elshaer — Personal Website

Source for **https://yousefelshaer.com**. A responsive portfolio built with HTML, CSS, and JavaScript. No framework, dependencies, or build step.

## Edit

- `dist/index.html` — page content, navigation, and projects.
- `dist/styles.css` — colors, typography, and responsive layouts.
- `dist/script.js` — small enhancements.
- `dist/favicon.svg` — browser icon.

Open `dist/index.html` in a browser, or run `python3 -m http.server 8000 --directory dist` and visit http://localhost:8000.

## Cloudflare Workers deployment

Connect this repository in Cloudflare Workers. Leave the build command empty, use `npx wrangler deploy` as the deploy command, and choose **main** as the production branch. `wrangler.jsonc` tells Cloudflare to serve the static files in `dist`. Once connected, pushes to main deploy automatically.

Add `yousefelshaer.com` under the Worker's **Settings → Domains & Routes → Add → Custom domain**. Cloudflare manages DNS and HTTPS.

## Alternative: Cloudflare Pages deployment

Connect this repository in Cloudflare Pages. Choose **None** as the framework preset, leave the build command empty, and set the build output directory to **dist**. Use **main** as the production branch. Once connected, pushes to main deploy automatically.

Add `yousefelshaer.com` under the Pages project's **Custom domains**. Cloudflare will guide DNS setup and issue HTTPS. Add `www.yousefelshaer.com` there as well if desired.

## Content

The portfolio includes education, skills, experience, and the Sentinel, Security Monitoring System, and Personal Portfolio projects from the current résumé. The visual design is inspired by marwanghazal.com, with original content and styling.

## Update the résumé

Replace `dist/resume.pdf` with the new PDF, keeping that filename. Commit and push the change; both résumé buttons will keep working. If education, skills, projects, or experience change, also update the corresponding text in `dist/index.html`.

Fonts are loaded from Google Fonts (Syne and DM Sans), with local fallbacks. No analytics or forms are included.
