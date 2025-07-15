# Summary

An app to make it fast and easier for a patient to access label information digitally

# eLabel-frontEnd

A Vite-powered React/TypeScript single-page application for looking up clinical trial labels by identifier code, trial + batch, or trial + kit. Built with [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://github.com/shadcn/ui).

---

## 🚀 Features

- 🔎 Lookup by:
  - QR code / Identifier Code
  - Sponsor Name + Trial Identifier + Batch Number
  - Sponsor Name + Trial Identifier + Kit Number
- 🌐 Multi-language display (EN, ES, FR, JA, etc.)
- 🎨 Styled with Tailwind CSS & shadcn/ui components
- 📦 Client-side routing with React Router
- 📡 Fetches from a REST API (`/api/labels/...`)
- 🛡️ Error boundary to catch render-time errors
- 🧪 Type-safe with TypeScript
- 🔍 Linted with ESLint & `standard` rules
- ⚡️ Fast refresh & build via Vite

---

## 📋 Prerequisites

- **Node.js** ≥ 18
- **npm** (or Yarn/Pnpm)
- A running instance of the **eLabel API** (see backend README)
- (Optional) **Git** for version control

---

## 🔧 Local Setup

1. **Clone the repo**
   ```bash
   git clone git@github.com:YourOrg/eLabel-frontEnd.git
   cd eLabel-frontEnd
   ```
2. **Clone the repo**
   npm ci

# or yarn install

3. Configure environment
   Copy the example and fill in your API URL and support email:
   cp .env.example .env.local

4. Edit .env.lcal
   VITE_API_URL=http://localhost:5000
   VITE_SUPPORT_EMAIL=help@clinicallabel.io

5. run in development
   npm run dev

Available scripts

| Command              | Description                                          |
| -------------------- | ---------------------------------------------------- |
| `npm run dev`        | Start Vite dev server (with HMR & fast refresh)      |
| `npm run build`      | Build production-ready assets into `dist/`           |
| `npm run preview`    | Preview the production build locally                 |
| `npm run lint`       | Run ESLint (with Standard style)                     |
| `npm run lint:fix`   | Auto-fix lintable issues                             |
| `npm run type-check` | Run `tsc --noEmit` to type-check without emitting JS |

eLabel-frontEnd/
├─ public/ # Static assets (index.html, favicon, etc.)
├─ src/
│ ├─ components/ # Reusable UI & display components
│ ├─ pages/ # Route components (LabelLookup, LabelPage, etc.)
│ ├─ types/ # Shared TypeScript interfaces & types
│ ├─ App.tsx # Application entry & routing
│ ├─ main.tsx # ReactDOM bootstrap + ErrorBoundary
│ └─ index.css # Tailwind & global styles
├─ .env.example # Template for required env vars
├─ vite.config.ts # Vite configuration
├─ tsconfig.json # TypeScript config
├─ package.json # NPM scripts & dependencies
└─ README.md # This file
