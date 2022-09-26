import App from "./App.js";

// Note function (saving, loading, other stuff)
const root = document.getElementById("app");
const app = new App(root);


// Editor

// const textEditor = this.app.querySelector('.note__edit-body');
// const preview = this.app.querySelector('.note__preview-body');
// const converter = new showdown.Converter();

// textEditor.addEventListener('keyup', evt => {
//     const {value} = evt.target;
//     const html = converter.makeHtml(value);
//     preview.innerHTML = html;
//     console.log(value);
// });

// console.log('preview', preview);
// console.log('editor', textEditor);