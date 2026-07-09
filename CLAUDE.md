# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a collection of small, independent static web page exercises for practicing HTML/CSS/JS. There is no build system, package manager, bundler, linter, or test suite — each project is plain HTML/CSS/JS opened directly in a browser.

## Structure

Each top-level folder is a self-contained page/exercise with no dependencies between folders:

- `Hello World/` — basic HTML + linked `style.css` (gradient background exercise)
- `Profile/` — self-intro card with `index.html`, `style.css`, and `main.js` (holds an empty `initApp` function, not yet wired up)
- `Portfolio/` — single-file portfolio page (`portfolio.html`) with CSS and JS inlined in `<style>`/`<script>` tags rather than split into separate files

When adding a new exercise, follow the existing convention of putting it in its own top-level folder.

## Working with these pages

- No install or build step — open the `.html` file directly in a browser to preview.
- Some pages (e.g. `Hello World`, `Profile`) split CSS into a linked `style.css`; others (e.g. `Portfolio`) inline everything in one `.html` file. Match the convention already used in the folder you're editing rather than converting between styles unless asked.
- `Profile/main.js` is linked from `index.html` but `initApp()` is currently empty and never called — check before assuming it runs any logic.

## 주의 
- 주석은 항상 한국어로 해주세요.