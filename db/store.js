const util = require('util'); // This is a built-in Node module that allows us to work with file paths
const fs = require('fs'); // This is a built-in Node module that allows us to work with the file system

//UUID is a library that allows us to generate unique IDs
const { v4: uuidv4 } = require('uuid'); 

// This is a utility function that allows us to use the async/await syntax
const readFileAsync = util.promisify(fs.readFile); 
const writeFileAsync = util.promisify(fs.writeFile);

// This is the class that will be used to create a new note
class Store { 
    read() {
        return readFileAsync('db/db.json', 'utf8'); 
    }
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }
    addNotes(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('Note title and text cannot be blank');
        }
        const newNote = { title, text, id: uuidv4() };
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);
    }
    removeNotes(id) { 
        return this.getNotes() 
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes)); 
    } //
}
// This is the code that allows us to export the Store class
module.exports = new Store();