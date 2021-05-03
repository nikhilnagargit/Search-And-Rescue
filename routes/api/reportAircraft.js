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
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    try {
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
    } catch {
      res.status(400).json({ err: 'at least input latitude field.' });
    }
  }
);

//@route   DELETE api/reportAircraft/:id
//@desc    Delete an aircraft
//@access  Private
router.delete('/:id', async (req, res) => {
  try {
    let plane = await Airplane.findById(req.params.id);

    if (!plane) return res.status(404).json({ msg: 'Airplane not found' });

    await Airplane.findByIdAndDelete(req.params.id);
    res.status(201).json({ msg: 'Airplane successfully removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
