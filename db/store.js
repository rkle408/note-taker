const fs = require('fs');
const util = require('util');

// Use uuid package to give each note a unique ID
const uuidv1 = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Need to save and read notes
class Store {
    read() {
        return readFileAsync('db/db.json', 'utf-8');
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
    addNotes() {
        
        const { title, text } = notes;
        if(!title || !text) {
            throw new Error('Please enter a title and text!')
        }
        
        const newNote = { title, text, id: uuidv1()};
        return this.getNotes().then((notes) => [... notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote)
    }
}

module.exports = new Store();