# Muhammad Moeed — Portfolio

A retro-terminal themed personal site for **Muhammad Moeed**, Backend & AI Engineer. Built with React 18, Vite, GSAP, and React Three Fiber.

Live site: see `VITE_SITE_URL` in your `.env`.

---

## Stack

- **React 18** + **Vite 5** — SPA, fast dev server, ESBuild builds
- **GSAP** — hero & section reveal animations
- **React Three Fiber + drei + three.js** — animated 3D background (lazy-loaded with WebGL fallback)
- **Web3Forms** — serverless contact-form delivery (no backend needed)
- **ESLint + Prettier** — code quality
- **Vitest + React Testing Library** — unit / smoke tests

## Project layout

```
src/
  components/    React components (one per UI section)
  data/          Static content (projects, etc.)
  hooks/         Custom hooks (e.g. useRoboVoice)
  config.js      Centralized env-driven config
  main.jsx       Entry point
  App.jsx        Root component
  styles.css     Global styles
public/          Static assets served as-is
fonts/           Custom web fonts
```

## Setup

```bash
# 1. Install
npm install

# 2. Configure environment
cp .env.example .env
# then fill in the values (see .env.example for keys)

# 3. Dev server
npm run dev          # http://localhost:5173

# 4. Production build
npm run build
npm run preview      # serve the built dist/ locally
```

## Environment variables

All env vars are surfaced to the client and must be prefixed `VITE_`.

| Key                  | What it's for                                                |
| -------------------- | ------------------------------------------------------------ |
| `VITE_WEB3FORMS_KEY` | Access key for the contact form. Get one at web3forms.com.   |
| `VITE_CONTACT_EMAIL` | Email shown in Contact / Footer; used for Gmail compose URL. |
| `VITE_GITHUB_URL`    | GitHub profile URL.                                          |
| `VITE_LINKEDIN_URL`  | LinkedIn profile URL.                                        |
| `VITE_SITE_URL`      | Production URL — used for SEO canonical / OG tags.           |

## Scripts

| Script            | What it does                          |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start Vite dev server with HMR.       |
| `npm run build`   | Type-check & build to `dist/`.        |
| `npm run preview` | Preview the production build locally. |
| `npm run lint`    | Run ESLint on `src/`.                 |
| `npm run format`  | Format the codebase with Prettier.    |
| `npm run test`    | Run the Vitest suite.                 |

## Deployment

Deploys cleanly on **Vercel** (config in `vercel.json`) or **Netlify**.

### Vercel

1. Import the repo in the Vercel dashboard.
2. Add the env vars from `.env.example`.
3. Deploy — Vercel auto-detects the Vite framework.

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add the env vars from `.env.example`.
4. Add a SPA redirect: `/* /index.html 200`.

## Contact

- Email: see `VITE_CONTACT_EMAIL`
- GitHub: see `VITE_GITHUB_URL`
- LinkedIn: see `VITE_LINKEDIN_URL`
