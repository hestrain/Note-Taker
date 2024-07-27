const notes = require('express').Router();
const uuid = require('../helpers/uuid');

// Helper functions for reading and writing to the JSON file
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');


// This API route is a GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// This API route is a POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/notes.json');
    console.log("note added successfully");
    res.json(`note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;
