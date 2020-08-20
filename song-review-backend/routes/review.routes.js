const express = require('express');
const Song = require('../models/song.model');
const User = require('../models/user.model');
const Review = require('../models/review.model')
const { db } = require('../models/review.model');


const router = express.Router();

router.get('/:songID', (req,res) => {
    console.log(req.params.songID)
    Review.find({songID: req.params.songID}, (err, reviews) => {
        console.log(reviews);
        res.json(reviews);
    });

})

router.post('/', async (req, res) => {
    console.log('here');
    console.log(req.body);
    const review = new Review(req.body);
    let newValues = {};
    await Song.findOne({_id: review.songID}, (err, song) => {
        if(song.number_of_ratings >= 1){
            let reviews = song.number_of_ratings;
            let average = song.rating;
            console.log(average, review.rating)
            average = average*(reviews/(reviews + 1));
            console.log(average);
            average = average + (review.rating *(1/(reviews + 1)));
            console.log(average);
            newValues.number_of_ratings = ++reviews;
            newValues.rating = Math.round((average + Number.EPSILON) * 100) / 100;
        }else{
            console.log('here');
            newValues.number_of_ratings = 1;
            newValues.rating = review.rating;
        }

    })
    console.log(newValues)
    Song.updateOne({_id: review.songID}, {$set:newValues} ,(err, song) =>{
        console.log(song);

    })
    review.save().then(data => {
        
        console.log(data);
        res.status(200).json('review saved')
    });
})

router.delete('/', (req, res) => {
    console.log(req.body);
    Review.deleteMany({songID: req.body.songID}, (err, res) => {
        
    });

    Song.updateOne({_id: req.body.songID}, { $set: {
        rating: 0,
        number_of_ratings: 0
    }}, (err, res) => {

    })
    res.json('reviews deleted')
})

module.exports = router;