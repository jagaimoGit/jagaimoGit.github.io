export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
        <div class="note__sidebar">
            <p class="logo">DoNotes</p>
            <button type="button" class="note__add">Add note</button>
            <div class="note__list">
                <div class="note__list-item--selected">
                </div>
            </div>
        </div>
        <div class="note__preview edit__mode">
            <input class="note__preview-title" type="text" placeholder="Add title..."></input>
            <textarea
            id="edit" 
            class="note__edit-body"
            placeholder="Add anything here..."></textarea>
            <div class="note__preview-body" id="preview"></div>
        </div>
        `;

        const btnAddNote = this.root.querySelector(".note__add");
        const inpTitle = this.root.querySelector(".note__preview-title");
        const inpBody = this.root.querySelector(".note__edit-body");
        

        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();
        });

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        this.updateNotePreviewVisibility(false);
        
    }

    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;

        return `
            <div class="note__list-item" data-note-id="${id}">
                <div class="note__title">${title}</div>
                <div class="note__body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="note__updated">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </div>
            </div>
        `;
    }

    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".note__list");

        // Empty list
        notesListContainer.innerHTML = "";

        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));

            notesListContainer.insertAdjacentHTML("beforeend", html);
        }

        // Add select/delete events for each list item
        notesListContainer.querySelectorAll(".note__list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            });

            noteListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure you want to delete this note?");

                if (doDelete) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });
        });
    }

    updateActiveNote(note) {
        this.root.querySelector(".note__preview-title").value = note.title;
        this.root.querySelector(".note__edit-body").value = note.body;

        this.root.querySelectorAll(".note__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("note__list-item--selected") ;
        });

        this.root.querySelector(`.note__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".note__preview").style.visibility = visible ? "visible" : "hidden";
    }

    showResult(noteBody) {
        const textEditor = this.root.querySelector('.note__edit-body');
        const preview = this.root.querySelector('.note__preview-body');
        const converter = new showdown.Converter();
        // if just opened

        preview.innerHTML = converter.makeHtml(textEditor.value);

        // if Loaded already
        textEditor.addEventListener('keyup', evt => {
            const {value} = evt.target;
            const html = converter.makeHtml(value);
            preview.innerHTML = html;
            console.log(value);
        });

        console.log('preview', preview);
        console.log('editor', textEditor);
    }

}
