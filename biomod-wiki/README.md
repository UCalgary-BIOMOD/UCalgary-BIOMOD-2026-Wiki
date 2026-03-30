# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

HEY, ORGANIZE THIS READ ME LATER!

Conventions
- Please use the following commit message conventions @ https://www.freecodecamp.org/news/writing-good-commit-messages-a-practical-guide/
- Please always write imports as derived from root. The root alias is currently set as "@" in vite.config.js
- Please only write all strings and paths with double quotes (") and not single quotes (')
- Write all pages as features. All feature folders will contain usually three types of file.
    - The file for the page - always give as PageName.jsx
    - The file for the content on the page - always give as pagename.json
    - Any specialized components of the page - name as FeatureName.jsx
- Try to utilize as many universal, in-common components as possible as found in /src/Components
- Please practice good merge and branch skills. Please see: https://www.gitkraken.com/learn/git/git-flow 