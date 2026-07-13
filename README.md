# Portfolio Project

This is a modern web application built with [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/), [TailwindCSS 4](https://tailwindcss.com/), and [TanStack Start/Router](https://tanstack.com/router/latest). It uses [Radix UI](https://www.radix-ui.com/) for accessible components.

## Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your machine, as this project uses `bun.lock` for package management. Alternatively, you can use `npm` or `yarn` with Node.js.

## Getting Started

### 1. Install dependencies

To install the project dependencies, run:

```bash
bun install
```
*(If you are using npm, run `npm install` instead).*

### 2. Run the development server

To start the local development server, run:

```bash
bun run dev
```
*(If you are using npm, run `npm run dev` instead).*

This will start the Vite development server. Open the URL provided in your terminal (usually `http://localhost:5173`) in your browser to view the application.

## Available Scripts

In the project directory, you can run the following commands:

- **`bun run dev`**: Starts the development server using Vite.
- **`bun run build`**: Builds the app for production to the `dist` folder.
- **`bun run build:dev`**: Builds the app in development mode.
- **`bun run preview`**: Boots up a local static web server that serves the files of the production build.
- **`bun run lint`**: Runs ESLint to catch formatting and code quality issues.
- **`bun run format`**: Runs Prettier to format the codebase.

## Tech Stack Overview

- **Framework**: React 19
- **Routing**: TanStack Router & TanStack Start
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4 & Tailwind-merge
- **UI Components**: Radix UI Primitives, Lucide Icons, Framer Motion
- **State/Data Management**: TanStack React Query
- **Forms**: React Hook Form with Zod validation
- **Package Manager**: Bun
