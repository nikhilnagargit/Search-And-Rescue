const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const airplaneSchema = new Schema({
    last_position: String,
    velocity: String,
    direction: String,
    weather: String
});

module.exports = mongoose.model('Airplane', airplaneSchema);