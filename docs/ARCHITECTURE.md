# Architecture Overview

This document provides an overview of the tylerscallan-dot-com portfolio website architecture.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Deployment**: GitHub Pages via GitHub Actions

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Loading/         # Loading states and skeletons
│   ├── IOSIcon/         # iOS-style icon components
│   ├── ErrorBoundary.tsx
│   ├── Gallery.tsx
│   ├── Layout.tsx
│   └── ...
├── hooks/               # Custom React hooks
│   ├── useMediaQuery.ts
│   └── useReducedMotion.ts
├── lib/                 # Utility functions
│   └── utils.ts
├── pages/               # Page components
├── test/                # Test setup and utilities
└── App.tsx              # Application entry point
```

## Key Design Decisions

### Component Architecture

- Components are organized by feature/domain
- Shared UI components live in `components/`
- Page-level components live in `pages/`
- Loading states are co-located in `components/Loading/`

### Styling Strategy

- Tailwind CSS for utility-first styling
- `cn()` utility for conditional class merging (clsx + tailwind-merge)
- CSS custom properties for theming where needed

### Performance Optimizations

- Code splitting with React.lazy for routes
- Manual chunk splitting for vendor dependencies (React, Lightbox, Icons)
- Image optimization with sharp during build

### Testing Strategy

- **Unit Tests**: Vitest + React Testing Library for components, hooks, and utilities
- **E2E Tests**: Playwright for critical user flows
- Tests run in CI before deployment

## CI/CD Pipeline

The deployment workflow (`.github/workflows/deploy.yml`) includes:

1. **Linting & Formatting**: ESLint + Prettier checks
2. **Type Checking**: TypeScript compilation
3. **Security Audit**: npm audit for vulnerabilities
4. **Unit Tests**: Vitest test suite
5. **E2E Tests**: Playwright browser tests
6. **Build**: Production build with Vite
7. **Deploy**: GitHub Pages deployment (main branch only)

## Development Workflow

1. Clone the repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Run tests: `npm run test:unit` (unit) or `npm run test:e2e` (e2e)
5. Commit with conventional format: `feat: add feature` or `fix: resolve issue`
