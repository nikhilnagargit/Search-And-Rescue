const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rescueSchema = new Schema({
    type: String,
    speed: Number,
    fieldofview: Number
});

module.exports = mongoose.model('Rescue', rescueSchema);