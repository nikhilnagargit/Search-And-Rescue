const express = require('express');
const Airplane = require('../../models/Airplane');
const router = express.Router();

//@route GET api/reportAircraft
//@desc report the missing aircraft
//@access Public
router.get('/', (req, res) => {
  res.send('Testing the report aircraft route');
});

//@route POST api/reportAircraft
//@desc report the missing aircraft
//@access Private
router.post('/', async (req, res) => {
  const { last_position, velocity, direction, weather } = req.body;
  if (last_position && velocity && direction && weather) {
    const plane = new Airplane({ last_position, velocity, direction, weather });
    await plane.save();
    res.send(plane);
  } else {
    res.send("Make sure each field has a valid value");
  }
});

module.exports = router;
