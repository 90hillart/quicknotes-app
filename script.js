
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllButton = document.querySelector("#clear-all-button");

const STORAGE_KEY = "quicknotes-notes";

let notes = loadNotes();

function loadNotes() {
  try {
    const savedNotes = JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    );

    if (!Array.isArray(savedNotes)) {
      return [];
    }

    return savedNotes.filter((note) =>
      note &&
      typeof note.id === "string" &&
      typeof note.text === "string" &&
      typeof note.category === "string" &&
      typeof note.createdAt === "string"
    );
  } catch {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(notes)
  );
}

function updateCount() {
  const total = notes.length;

  if (total === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (total === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${total} notes.`;
  }
}

function categoryClass(category) {
  return `category-${category.toLowerCase()}`;
}

function render() {
  notesList.replaceChildren();

  const searchTerm = searchInput.value.trim().toLowerCase();

  const visibleNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm)
  );

  if (visibleNotes.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty-state";

    emptyItem.textContent = searchTerm
      ? "No notes match your search."
      : "No notes yet. Add your first note above.";

    notesList.appendChild(emptyItem);
  } else {
    visibleNotes.forEach((note) => {
      const item = document.createElement("li");
      item.className =
        `note-card ${categoryClass(note.category)}`;

      const text = document.createElement("p");
      text.className = "note-content";
      text.textContent = note.text;

      const meta = document.createElement("div");
      meta.className = "note-meta";

      const category = document.createElement("span");
      category.className =
        `category-label ${categoryClass(note.category)}`;
      category.textContent = note.category;

      const date = document.createElement("time");
      date.textContent = note.createdAt;

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "delete-button";
      deleteButton.textContent = "Delete";
      deleteButton.setAttribute(
        "aria-label",
        `Delete note: ${note.text}`
      );

      deleteButton.addEventListener("click", () => {
        deleteNote(note.id);
      });

      meta.append(category, date);
      item.append(text, meta, deleteButton);
      notesList.appendChild(item);
    });
  }

  updateCount();
}

function addNote(text, category) {
  const note = {
    id: (
      typeof crypto !== "undefined" &&
      crypto.randomUUID
    )
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`,

    text,
    category,
    createdAt: new Date().toLocaleString()
  };

  notes.unshift(note);

  saveNotes();
  render();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);

  saveNotes();
  render();
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const rawText = noteInput.value;
  const text = rawText.trim();

  if (!text) {
    errorMessage.textContent =
      "Please type a note first.";

    noteInput.focus();
    return;
  }

  if (rawText.length > 200) {
    errorMessage.textContent =
      "Notes must be 200 characters or fewer.";

    noteInput.focus();
    return;
  }

  errorMessage.textContent = "";

  addNote(text, noteCategory.value);

  noteInput.value = "";
  noteInput.focus();
});

searchInput.addEventListener("input", render);

clearAllButton.addEventListener("click", () => {
  if (notes.length === 0) {
    return;
  }

  if (confirm("Delete all notes?")) {
    notes = [];

    saveNotes();
    render();
  }
});

document.querySelector("#current-year").textContent =
  new Date().getFullYear();

render();

