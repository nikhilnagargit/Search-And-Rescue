const express = require('express');
const Airplane = require('../../models/Airplane');
const router = express.Router();

//@route GET api/reportAircraft
//@desc   report the missing aircraft
//@access Public
router.get('/', (req, res) => {
  res.send('Testing the report aircraft route');
});

//@route POST api/reportAircraft
//@desc report the missing aircraft
//@access Private
router.post('/', async (req, res) => {
  const {
    latitude,
    longitude,
    velocity,
    direction,
    weather,
    description,
    altitude,
    title,
    category,
  } = req.body;
  if (latitude) {
    const plane = new Airplane({
      latitude,
      longitude,
      description,
      velocity,
      direction,
      weather,
      altitude,
      title,
      category,
    });
    await plane.save();
    console.log('One airplane reported in db');
    res.status(201).json(plane);
  } else {
    res.status(400).json({ err: 'at least input latitude field.' });
  }
});

module.exports = router;
