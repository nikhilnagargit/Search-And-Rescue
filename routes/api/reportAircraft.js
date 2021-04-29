const express = require('express');
const { check, validationResult } = require('express-validator');
const Airplane = require('../../models/Airplane');
const router = express.Router();

//@route GET api/reportAircraft
//@desc   report the missing aircraft
//@access Public
router.get('/', async (req, res) => {
  const plane = await Airplane.find({});
  res.status(201).json(plane);
});

//@route POST api/reportAircraft
//@desc report the missing aircraft
//@access Private
router.post(
  '/',
  // [
  //   check('latitude', 'Please enter latitude').not().isEmpty(),
  //   check('longitude', 'Please enter longitude').not().isEmpty(),
  //   check('velocity', 'Please enter velocity').isNumeric().not().isEmpty(),
  //   check('direction', 'Please enter direction').not().isEmpty(),
  //   check('weather', 'Please enter weather').not().isEmpty(),
  //   check('description', 'Please enter description').not().isEmpty(),
  //   check('altitude', 'Please enter altitude').not().isEmpty(),
  //   check('title', 'Please enter title').not().isEmpty(),
  //   check('category', 'Please enter category').not().isEmpty(),
  // ],
  async (req, res) => {
    //const errors = validationResult(req);
    console.log(req.body);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
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
