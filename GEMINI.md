# Gemini Context: Cotiza Tu Plan Hoy

This document provides a comprehensive overview for the Gemini AI agent to understand the project's structure, purpose, and development conventions.

## 1. Project Overview

**Cotiza Tu Plan Hoy** is a modern web platform for quoting and comparing health insurance plans in Chile. It is a Single Page Application (SPA) built with a modern frontend stack.

-   **Purpose**: Help individuals and small-to-medium businesses (PYMEs) find, compare, and get quotes for health insurance plans.
-   **Key Features**: Interactive calculators, side-by-side plan comparisons, dark/light mode, and WhatsApp integration.
-   **Architecture**: A standard Vite-based React SPA.
    -   Components are organized by feature (`home`, `pyme`) and type (`layout`, `ui`, `shared`).
    -   Routing is handled by `react-router-dom`.
    -   Styling is primarily done using Tailwind CSS, with UI components from `shadcn/ui` built on Radix UI primitives.
    -   State management uses a combination of React hooks for local state and TanStack Query for server state.

### Core Technologies:

-   **Framework**: React 18 with TypeScript
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS with `shadcn/ui` (Radix UI)
-   **Routing**: React Router
-   **Server State**: TanStack Query
-   **Forms**: React Hook Form with Zod for validation
-   **Animation**: Framer Motion
-   **Testing**: Playwright for end-to-end tests

## 2. Building and Running

All commands should be run from the project root. The project uses `npm` as the package manager.

### Key Scripts (`package.json`):

-   **Run the development server**:
    ```bash
    npm run dev
    ```
    This starts the Vite dev server, typically at `http://localhost:5173`.

-   **Create a production build**:
    ```bash
    npm run build
    ```
    This bundles the application into the `dist/` directory for deployment.

-   **Lint the codebase**:
    ```bash
    npm run lint
    ```
    This checks the code for style and syntax errors using ESLint.

-   **Run tests**:
    ```bash
    # Runs Playwright tests for structured data
    npm run test:structured-data
    ```

## 3. Development Conventions

-   **Styling**: Use Tailwind CSS utility classes for styling. New UI components should be built using `shadcn/ui` principles, leveraging Radix UI for accessibility.
-   **Components**: Follow the existing structure in `src/components`. Reusable, cross-cutting components go in `shared/`. Page-specific components go in their respective feature folders (e.g., `home/`).
-   **State Management**: Use React hooks (`useState`, `useContext`) for UI and client-side state. Use TanStack Query (`useQuery`, `useMutation`) for fetching or mutating data from APIs.
-   **Branching Strategy**:
    -   `main`: Production-ready code.
    -   `develop`: Main development branch for new features and testing.
    -   Feature branches should be created from `develop`.
-   **Testing**: The project uses Playwright for end-to-end tests. New features, especially those affecting SEO or structured data, should have corresponding tests added in the `tests/` directory. See `TESTING.md` for more details.
-   **Commits & PRs**: Follow the guidelines in `CONTRIBUTING.md` for commit messages and pull requests.
