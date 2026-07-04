# Republic

A modern civic platform. Clean, trustworthy public-service design — huge serif
display type, a restrained warm-paper palette, and a single gold accent.

The web app lives in [`web/`](./web).

## Stack

- **Next.js 16** (App Router, Turbopack) — static export
- **Tailwind CSS v4** — design tokens in `web/app/globals.css`
- **Fonts**: Instrument Serif (display), Geist + Geist Mono (text / labels)
- No component library — a couple of small hand-rolled components

## Develop

```bash
cd web
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
cd web
npm run build    # outputs static site to web/out
```

## Deploy on AWS

The app is a static export (`output: "export"` in `next.config.ts`), so it
deploys as plain files. Two paths:

- **S3 + CloudFront** — upload `web/out` to an S3 bucket and serve it through a
  CloudFront distribution (cheapest, fully static).
- **AWS Amplify Hosting** — point Amplify at this repo, set the base directory
  to `web`, build command `npm run build`, and output directory `out`.
