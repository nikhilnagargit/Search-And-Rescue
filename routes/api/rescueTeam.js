const express = require('express');
const Rescue = require('../../models/Rescue');
const router = express.Router();

//@route GET api/rescueTeam/
//@desc get the rescue team data
//@access Public
router.get('/', async (req, res) => {
    const allTeam = await Rescue.find({});
    res.status(201).json(allTeam);
});

//@route PUT api/rescueTeam/
//@desc edit the rescue team data
//@access Private
router.put('/', async (req, res) => {
    try {
        const rescue = await Rescue.findOneAndUpdate({ type: req.body.type }, { ...req.body });
        res.status(201).json({ msg: 'Successfully updated.' });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;