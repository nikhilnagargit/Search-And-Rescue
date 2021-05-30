const express = require('express');
const router = express.Router();

//@route GET api/searchPattern/
//@desc show the search pattern
//@access Public
router.get('/', async (req, res) => {
    res.status(201).json(req.body);
});

module.exports = router;