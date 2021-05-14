const express = require('express');
const { calcDistance, calcLatLon, calcSquareJson, calcFacilities } = require('../../calcArea');
const Airplane = require('../../models/Airplane');
const router = express.Router();

//@route GET api/searchArea/id
//@desc get the search area
//@access Public
router.get('/:id', async (req, res) => {
  let plane = await Airplane.findById(req.params.id);
  let { latitude, longitude, direction, velocity, altitude } = plane;
  let distance = calcDistance(altitude, velocity);
  let newLatLon = calcLatLon(latitude, longitude, direction, distance);

  //make a geojson for new latitude and longitude
  let sqJson = calcSquareJson(newLatLon, 15, direction);
  res.status(201).json(sqJson);
});

module.exports = router;