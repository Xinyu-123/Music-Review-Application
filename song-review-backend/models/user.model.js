const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date_created: {
        type: Date, 
        default: Date.now()
    },
    is_admin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', UserSchema, 'users');