const express = require('express');
const router = express.Router();

//@route GET api/searchArea
//@desc get the search area
//@access Public
router.get('/', (req, res) => {
  res.send('Testing the search are route');
});

module.exports = router;
