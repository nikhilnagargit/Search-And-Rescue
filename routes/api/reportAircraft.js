const express = require('express');
const router = express.Router();

//@route GET api/reportAircraft
//@desc   report the missing aircraft
//@access Public
router.get('/', (req, res) => {
  res.send('Testing the report aircraft route');
});

module.exports = router;
