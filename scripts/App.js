import noteView from "./noteView.js";
import noteAPI from "./noteAPI.js";

export default class App {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new noteView(root, this._handlers());

        this._refreshNotes();
    }

    _refreshNotes() {
        const notes = noteAPI.getAllNotes();

        this._setNotes(notes);

        if (notes.length > 0) {
            this._setActiveNote(notes[0]);
        }
    }

    _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
        this.view.showResult(note.body);
    }

    _handlers() {
        return {
            onNoteSelect: noteId => {
                const selectedNote = this.notes.find(note => note.id == noteId);
                this._setActiveNote(selectedNote);
            },
            onNoteAdd: () => {
                const newNote = {
                    title: "New Note",
                    body: "Take note..."
                };

                noteAPI.saveNote(newNote);
                this._refreshNotes();
            },
            onNoteEdit: (title, body) => {
                noteAPI.saveNote({
                    id: this.activeNote.id,
                    title,
                    body
                });

                this._refreshNotes();
            },
            onNoteDelete: noteId => {
                noteAPI.deleteNote(noteId);
                this._refreshNotes();
            },
        };
    }
}
