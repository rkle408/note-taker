const fs = require('fs');
const util = require('util');

// Use uuid package to give each note a unique ID
const uuidv1 = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Need to save and read notes
class Store {
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }
    
    // Need to beable to write a note to be stored in the json file
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note))
    }

    // Get past notes
    getNotes() {
        return this.read().then((notes) =>{
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(notes))
            } catch(err) {
                parsedNotes = []
            }

            return parsedNotes;
        })
    }

    // Let user add notes, cannot be left blank
    addNote(note) {
        
        const { title, text } = note;
        if(!title || !text) {
            throw new Error('Please enter a title and text!')
        }
        // Note will have 3 properties:
        const newNote = { title, text, id: uuidv1()};
        return this.getNotes().then((notes) => [... notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote)
    }

    // Get the note ready for deletion
    removeNote(id) {
        return this.getNotes().then((notes) => notes.filter((note) => note.id !== id))
        .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new Store();