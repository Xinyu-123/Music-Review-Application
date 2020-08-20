const express = require('express');
const Song = require('../models/song.model');
const User = require('../models/user.model');
const { db } = require('../models/song.model');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'audio/mpeg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 20
    },
    fileFilter: fileFilter
})

router.post('/search', async (req,res) => {

    let search_fields = [];
    let songList = [];

    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        for(let i = 0; i < req.body.fields.length; i++){
            let search = {[req.body.fields[i]]: regex}
            search_fields.push(search);
        }

        Song.find({$or:search_fields}, (err, songs) => {
            if(err){
                console.log(err);
            }
            if(songs){
                songs.forEach(song => {
                    if(song.rating >= req.body.rating){
                        songList.push(song);
                    }
                })
            }
            
            // songs.sort({rating: -1});
            res.json(songList);
            
        }).sort({rating: -1})
    }else{
        Song.find({}, (err, songs) => {
            if(err){
                console.log(err)
            }
            songs.forEach(song => {
                console.log(`ratings: ${song.rating} and ${req.body.rating}`)
                if(song.rating >= req.body.rating){
                    songList.push(song);
                }
            })
            // songs.sort({rating: -1});
            res.json(songList);
        }).sort({rating: -1})
    }
    
})

router.get('/song', (req,res) => {
    Song.findOne({_id: req.query.id}, (err, song) => {
        res.json(song);
    })
})

router.post('/', upload.fields([
    {name: 'audio_file', maxCount: 1},
    {name: 'song_image', maxCount: 1}
]),(req,res) => {
    console.log(req.files.song_image[0]);
    req.body.song_image = req.files.song_image[0].path;
    req.body.audio_file = req.files.audio_file[0].path;

    let song_created;
    User.findOne({_id: req.body.created_by}, (err, user) => {
        req.body.created_by_username = user.username;
        const song = new Song(req.body)
        song.save()
        .then(data => {
            console.log('saved');
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            res.json({err})
        })
    })
    
})

// router.get('/:songId', async (req, res) => {
//     console.log('songid');
//     // console.log(req.params.songId);
//     let song = await Song.findById(req.params.songId)
//     res.json(song);
// })


router.get('/', async (req, res) => {
    // console.log(req.params);
    let songs = await Song.find().sort({rating: -1});
    // console.log(songs);
    res.json(songs);
})



router.delete('/', (req, res) => {
    db.collection('songs').remove();
    res.json('songs are removed');
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
