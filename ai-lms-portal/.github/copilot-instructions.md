## Purpose

This file gives an AI coding agent the minimal, actionable knowledge to be productive in this repository.

## Quick start commands

- Install: `npm install`
- Dev server: `npm run dev` (runs Vite)
- Build: `npm run build` (Vite build)
- Preview build: `npm run preview`
- Lint: `npm run lint` (uses `eslint` and `eslint.config.js`)

## High-level architecture

- Vite + React SPA. Entry: `src/main.jsx` loads `src/App.jsx` which declares routes.
- Routing uses `react-router-dom` v6 (see `src/App.jsx` — `Routes`/`Route`).
- Pages live under `src/pages` (examples: `src/pages/Home.jsx`, `src/pages/auth/login.jsx`).
- Shared UI components live under `src/component/common` (examples: `Card.jsx`, `Navbar.jsx`).
- Layout components live under `src/layouts` (example: `MainLayouts.jsx`).
- Static assets in `public/` and `src/assets`.

## Important files to inspect/modify

- Routing: [src/App.jsx](src/App.jsx#L1-L20)
- App bootstrap: [src/main.jsx](src/main.jsx#L1-L20)
- Shared components: [src/component/common/Card.jsx](src/component/common/Card.jsx#L1-L20), [src/component/common/Navbar.jsx](src/component/common/Navbar.jsx#L1-L20)
- Pages: [src/pages/Home.jsx](src/pages/Home.jsx) and any `src/pages/**` files
- Tailwind config: [tailwind.config.cjs](tailwind.config.cjs) and global CSS imports in [src/index.css](src/index.css)
- Vite config: [vite.config.js](vite.config.js) — uses `@vitejs/plugin-react`
- ESLint: [eslint.config.js](eslint.config.js)

## Project-specific conventions

- JavaScript + ESM (`type: "module"` in `package.json`). Don't add TypeScript files unless assembling a migration.
- Component filenames use PascalCase and default exports for React components (see `Card.jsx`, `Navbar.jsx`).
- Pages are top-level route targets and live under `src/pages` — add a file and register it in `src/App.jsx`.
- Styling uses Tailwind utility classes inside JSX (see `Card.jsx`) and global CSS in `src/index.css`.

## Where to add things (examples)

- New page: create `src/pages/MyPage.jsx` and add a route in `src/App.jsx`:

```jsx
// src/App.jsx (example)
import MyPage from "./pages/MyPage";
<Route path="/my-page" element={<MyPage />} />
```

- New shared component: add `src/component/common/MyComponent.jsx` and export default a React function component.

## Debugging & build notes

- If dev server fails, check the terminal for Vite errors; common causes are missing imports or relative path mistakes.
- Use `npm run lint` to catch stylistic issues; ESLint config is at the repo root.

## Integration points & dependencies

- Router: `react-router-dom` — route declarations are central to navigation.
- Vite plugin: `@vitejs/plugin-react` is configured in `vite.config.js`.
- No backend code in this repo — it's a frontend SPA that expects API calls to be added where needed.

## What not to change without discussion

- `vite.config.js` unless adding build-time plugins.
- `package.json` scripts unless adding corresponding CI changes.

## If you need more context

- Inspect [README.md](README.md) for template origin notes.
- Browse `src/` to learn component and layout patterns; start with `src/App.jsx`, `src/layouts/MainLayouts.jsx`, and `src/component/common/Navbar.jsx`.

---
If anything here is unclear or missing, please tell me which area to expand (routing, build, styling, components, or tests).
