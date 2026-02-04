# Tyler Callan Portfolio

[![Build and Deploy](https://github.com/tylerscallan/tylerscallan-dot-com/actions/workflows/deploy.yml/badge.svg)](https://github.com/tylerscallan/tylerscallan-dot-com/actions/workflows/deploy.yml)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

A personal portfolio website showcasing photography, editorial collections, and software projects.

## Features

- **Responsive Photo Gallery** - Masonry-style grid with lightbox viewer
- **Editorial Collections** - Curated photo series with dedicated pages
- **Software Showcase** - Project portfolio with detailed views
- **iOS-Style Contact Grid** - Social and contact links in a familiar format
- **Dark Mode** - System-preference aware with manual toggle
- **Accessibility** - Reduced motion support for animations
- **Performance** - Lazy loading, code splitting, and image optimization

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3 | UI framework |
| TypeScript | 5.6 | Type safety |
| Vite | 5.4 | Build tool |
| React Router | 6.28 | Client-side routing |
| Tailwind CSS | 3.4 | Styling |
| Lucide React | 0.468 | Icons |
| Yet Another React Lightbox | 3.21 | Image lightbox |

## Quick Start

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:27100
```

## Development Commands

### Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 27100 |
| `npm run build` | TypeScript compile + Vite production build |
| `npm run preview` | Preview production build locally |

### Code Quality

| Command | Description |
|---------|-------------|
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run typecheck` | Run TypeScript type checking |

### Testing

| Command | Description |
|---------|-------------|
| `npm run test:unit` | Vitest unit tests (watch mode) |
| `npm run test:unit:run` | Vitest unit tests (single run) |
| `npm run test:e2e` | Playwright E2E tests |
| `npm run test:e2e:ui` | Playwright with UI mode |
| `npm run test:coverage` | Unit tests with coverage report |

### CI

```bash
make ci  # Runs: install, lint, format-check, typecheck, test-unit
```

## Project Structure

```
├── src/
│   ├── main.tsx              # Application entry point
│   ├── App.tsx               # Root component with routing
│   ├── index.css             # Global styles and Tailwind
│   ├── components/
│   │   ├── primitives/       # Low-level UI (Skeleton)
│   │   ├── composites/       # Feature components (Gallery, EditorialCard, etc.)
│   │   ├── layouts/          # App structure (Layout, ErrorBoundary)
│   │   └── loading/          # Async states (PageLoader, skeletons)
│   ├── pages/                # Route page components
│   ├── hooks/                # Custom React hooks
│   ├── data/                 # Static content data
│   ├── types/                # TypeScript type definitions
│   ├── config/               # App configuration (routes)
│   ├── constants/            # Shared constants
│   └── lib/                  # Utility functions
├── config/                   # Build tool configurations
│   ├── tailwind.config.js
│   ├── eslint.config.js
│   ├── vitest.config.ts
│   └── playwright.config.ts
├── tests/
│   ├── unit/                 # Vitest unit tests
│   └── e2e/                  # Playwright E2E tests
└── public/                   # Static assets
```

## Deployment

Build for production:

```bash
npm run build
```

The output in `dist/` can be deployed to any static hosting provider (Netlify, Vercel, Cloudflare Pages, etc.).

## License

### Source Code
This project's source code is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

### Photography & Assets
All photographs, images, and visual assets are **Copyright Tyler Callan** - All Rights Reserved. See [ASSETS-LICENSE.md](ASSETS-LICENSE.md) for details.

### Editorial Content
All editorial content, captions, and written project descriptions are **Copyright Tyler Callan** - All Rights Reserved.

**Note**: Open-sourcing this code does NOT grant any rights to the photographs, images, or editorial content.
