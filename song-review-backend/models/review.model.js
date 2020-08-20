const mongoose = require('mongoose');
const { ObjectID, ObjectId } = require('mongodb');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    review: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userID: {
        type: ObjectId,
        required: true
    },
    songID: {
        type: ObjectID,
        required: true
    }
})

module.exports = mongoose.model('Review', ReviewSchema, 'reviews')