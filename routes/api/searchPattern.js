const express = require('express');
const router = express.Router();
const Rescue = require('../../models/Rescue');
const { spiralMotion } = require('../../calcArea');

//@route POST api/searchPattern/
//@desc show the search pattern
//@access Private
router.post('/', async (req, res) => {
    let motion = req.body, view;

    const teams = await Rescue.find({});
    for (let feature of motion.filteredGrid.features) {

        if (feature.rescue_team == 'helicopterA')
            view = teams[0].fieldofview;
        else if (feature.rescue_team == 'helicopterB')
            view = teams[1].fieldofview;
        else
            view = teams[2].fieldofview;
        feature.spiral = spiralMotion(feature.geometry.coordinates, view);
    }
    res.status(201).json(motion);
});

module.exports = router;
