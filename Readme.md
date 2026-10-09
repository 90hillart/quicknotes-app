# QuickNotes

QuickNotes is a lightweight, responsive note-taking web app that lets you capture short notes, organise them into Personal, Work, and Study categories, search your notes, and keep them saved in your browser between visits.

## Features

* Add notes with Personal, Work, or Study categories.
* Validate notes so they are not empty and do not exceed 200 characters.
* View notes as category-coloured cards with a creation date and time.
* Delete individual notes or clear all notes after confirmation.
* Search note text without case sensitivity.
* Save notes in browser `localStorage` so they remain after a refresh.
* Show an accurate note count and a helpful message when a search has no matches.
* Responsive layout for desktop and mobile screens.
* Safe rendering of note text with `textContent`.

## Run locally

1. Create a folder named `quicknotes-app`.
2. Save `index.html`, `style.css`, `script.js`, and `README.md` in that folder.
3. Open `index.html` in a modern web browser.

No package installation or build step is required. Notes are stored locally in the browser profile where you use the app.

## What I learned

* How to structure a page with semantic HTML, accessible labels, and form controls.
* How to use CSS Flexbox, category classes, and media queries to build a responsive interface.
* How to manage an array of note objects and safely create DOM elements with JavaScript.
* How to validate user input and implement add, delete, search, and count behaviour.
* How to persist and restore application data with `localStorage`, `JSON.stringify`, and `JSON.parse`.
* How to use Git commits to record progress in small, meaningful steps.
