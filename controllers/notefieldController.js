const Note = require('../models/Note');

const getNotes = (req, res) => {
  console.log(new Date().toLocaleTimeString(), "GET", req.query.sort, req.query.tag);
  Note.find().sort([['updatedAt', req.query.sort == "DESC" ? 'descending' : 'ascending']])
    .then((result) => {
      if (req.query.tag) {
        result = result.filter(note => note.tags.includes(req.query.tag));
      }
      res.status(200).send(result)
    })
    .catch((error) => {
      res.status(400).send();
    });
}

const addNote = (req, res) => {
  console.log(new Date().toLocaleTimeString() + " POST");
  const note = new Note(req.body);
  note.save()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send();
    });
}

const editNote = (req, res) => {
  console.log(new Date().toLocaleTimeString() + " PUT " + req.body["_id"]);
  Note.findByIdAndUpdate(req.body["_id"], { title: req.body.title, content: req.body.content , tags: req.body.tags}, { "useFindAndModify": false })
    .then((result) => {
      res.status(200).send();
    })  
  .catch((error) => {
      console.log(error);
      res.status(500).send();
    });
    
}

const deleteNote = (req, res) => {
  console.log(new Date().toLocaleTimeString() + " DELETE " + req.body["_id"]);
  Note.findByIdAndDelete(req.body["_id"], { "useFindAndModify": false })
    .then((result) => {
      res.status(200).send();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send();
    });
}

module.exports = {
  getNotes,
  addNote,
  editNote,
  deleteNote,
}