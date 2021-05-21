const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema(
    {
        id: {
            type: Number
        },
        title: {
            type: String
        },
        tags: {
            type: [{ type: String }] // Array of Strings for note tags
        },
        content: {
            type: String
        },
        date: {
            type: Number
        },
        author: {
            type: String
        }
    }
    , {
        timestamps: true
    }
);

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;

