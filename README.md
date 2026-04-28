# Stroke

Premium multi-service digital agency platform built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Available pages

- `/`
- `/services`
- `/services/[serviceSlug]`
- `/services/[serviceSlug]/[categorySlug]`
- `/portfolio`
- `/portfolio/[slug]`
- `/about`
- `/contact`

## Platform structure

- Dynamic services system:
  each service has its own category experience and plan-based detail pages
- Portfolio detail routes:
  each featured project opens into a dedicated case-study page
- Public assets:
  favicon files and `site.webmanifest` live in `public/assets/`

## Production build

```bash
npm run build
npm start
```

## Notes

If `npm` is not available in an older terminal session, open a new terminal window so it picks up the latest Node.js installation path.

If port `3000` is already in use on your machine, Next.js will automatically start on the next available port such as `3001`.
