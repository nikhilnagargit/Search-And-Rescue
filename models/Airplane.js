const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const airplaneSchema = new Schema({
  latitude: Number,
  longitude: Number,
  direction: Number,
  weather: String,
  velocity: Number,
  description: String,
  altitude: Number,
  category: Number,
  title: String,
});

module.exports = mongoose.model('Airplane', airplaneSchema);
