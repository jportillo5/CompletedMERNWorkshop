const songModel = require('../models/songModel');
const mongoose = require('mongoose');

// get all songs
const getSongs = async (req, res) => {
    const songs = await songModel.find({}).sort({createdAt: -1}); //if we wanted a specific song or subset of songs, we could add parameters
    //-1 lists the songs in descending order

    res.status(200).json(songs);
}

// get a single song
const getSong = async (req, res) => {
    const {id} = req.params; //gets the id property from the request parameters (the url)

    //ensure the id is theoretically valid in the first place
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such song, bad ID'});
    }

    const song = await songModel.findById(id);

    if(!song) {
        return res.status(404).json({error: 'No such song'});
    } else { //a song has been found
        res.status(200).json(song);
    }
}

// create new song
const createSong = async (req, res) => {
    const {title, artist, album} = req.body
    
    //add document to database
    try {
        //try to create a document
        const song = await songModel.create({title, artist, album}); //we must wait for the asynchronous function to complete, otherwise we'd run into problems
        res.status(200).json(song); //status 200 means everything is fine basically
    } catch (error) {
        res.status(400).json({error: error.message}); //status 400 means something bad happened
    }
    //res.json({msg: 'POST a new song'})
}

// delete a song
const deleteSong = async (req, res) => {
    const {id} = req.params; //gets the id property from the request parameters (the url)

    //ensure the id is theoretically valid in the first place
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such song, bad ID'});
    }

    const song = await songModel.findOneAndDelete({_id: id});

    if(!song) {
        return res.status(404).json({error: 'No such song'});
    } else { //a song has been found
        res.status(200).json(song);
    }
}

// update a song
const updateSong = async (req, res) => {
    const {id} = req.params; //gets the id property from the request parameters (the url)

    //ensure the id is theoretically valid in the first place
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such song, bad ID'});
    }

    const song = await songModel.findOneAndUpdate({_id: id}, { //document ID is stored internally as "_id"
        ...req.body
    });

    if(!song) {
        return res.status(404).json({error: 'No such song'});
    } else { //a song has been found
        res.status(200).json(song);
    }
}

module.exports = {
    createSong,
    getSongs,
    getSong,
    deleteSong,
    updateSong
}