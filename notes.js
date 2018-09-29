const fs = require('fs');

/** REUSABLE FUNCTIONS */

// Fetch existing notes from file & turn into array
var fetchNotes = () => {
     try {
        var notesString = fs.readFileSync("notes-data.json");
        return JSON.parse(notesString);
    } catch(e) {
        return [];
    }    
};

// Save notes array into JSON file
var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

// Log note contents
var logNote = (note) => {
    console.log('============');
    console.log(`Note title: ${note.title}`);
    console.log(`Note body: ${note.body}`);
    console.log('============');
};

/** MAIN APP FUNCTIONS */

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    // Avoiding duplicate titles on the notes array
    var duplicateNotes = notes.filter((note) => note.title === title);

    if(duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    var notes = fetchNotes();
    var result = notes.filter((note) => note.title === title);
    return result[0];
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var arrayLessNote = notes.filter((note) => note.title !== title);
    saveNotes(arrayLessNote);

    return notes.length !== arrayLessNote.length;
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};