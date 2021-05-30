const express = require('express');
const { calcDistance, calcLatLon, calcSquareJson } = require('../../calcArea');
const Airplane = require('../../models/Airplane');
const router = express.Router();

//@route GET api/searchArea/id
//@desc get the search area
//@access Public
router.get('/:id', async (req, res) => {
  let side = req.query.side;
  let gridSide = req.query.gridSide;
  let plane = await Airplane.findById(req.params.id);
  let { latitude, longitude, direction, velocity, altitude } = plane;
  let distance = calcDistance(altitude, velocity);
  let newLatLon = calcLatLon(latitude, longitude, direction, distance);

  //make a geojson for new latitude and longitude
  let sqJson = calcSquareJson(newLatLon, side, direction, gridSide);
  res.status(201).json(sqJson);
});

module.exports = router;