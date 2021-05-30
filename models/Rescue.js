const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rescueSchema = new Schema({
    type: String,
    speed: Number,        //in km/hr
    fieldofview: Number,  //in km
    vertheight: Number,   //in km
    flighttime: Number    //in hr
});

module.exports = mongoose.model('Rescue', rescueSchema);