//access the app from this file
const express = require('express');
const router = express.Router(); //
const {
    createSong,
    getSongs,
    getSong,
    deleteSong,
    updateSong
} = require('../controllers/songController');

router.get('/', getSongs); //GET all songs

//GET a single song
router.get('/:id', getSong);

//POST a new song
router.post('/', createSong);

//DELETE a song
router.delete('/:id', deleteSong);

//PATCH a song
router.patch('/:id', updateSong);

module.exports = router;

//router.get('/', (req, res) => {
    //res.json({msg: 'GET all songs'})
//});
