# Ashish Manocha — Creative Digital Studio

A static, multipage portfolio for Ashish Manocha.

## Pages

- `index.html` — editorial landing page
- `about.html` — studio background and approach
- `services.html` — creative and digital services
- `technologies.html` — Technologies We Teach
- `process.html` — working process
- `work.html` — selected work and project details
- `stories.html` — writing and client stories
- `contact.html` — contact form and project preparation guide

## Run locally

The site has no build step and can be served directly:

```bash
python3 -m http.server 3000
```

Then open <http://localhost:3000>.

## Deploy

Upload the complete folder to any static host such as Vercel, Netlify, GitHub Pages, Cloudflare Pages, or an Apache/Nginx document root. Keep the HTML files at the site root so the standalone page links work.

## Notes

- Generated project visuals are included in `images/` for self-hosting.
- Google Fonts, Font Awesome, Tailwind CDN, and technology logo assets are referenced from public CDNs.
- The contact form is currently front-end only and displays a success message; connect it to a form backend or email endpoint before using it for production submissions.
- `manus-routes.json` lists the published page routes for the managed preview.
