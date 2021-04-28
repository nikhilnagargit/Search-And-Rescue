const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const airplaneSchema = new Schema({
  latitude: String,
  longitude: String,
  direction: String,
  weather: String,
  velocity: String,
  description: String,
  altitude: String,
  category: Number,
  title: String,
});

module.exports = mongoose.model('Airplane', airplaneSchema);
