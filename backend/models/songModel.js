const mongoose = require('mongoose'); //mongoDB alone is schema-less

const Schema = mongoose.Schema;

const songSchema = new Schema({ //ensures a degree of consistency in your documents
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    }
}, { timestamps: true }); //automatically create a timestamp showing when the document was created

//schema defines the structure of a type of document
//a model applies the schema to a collection

module.exports = mongoose.model('Song', songSchema); //collection is automatically pluralized

