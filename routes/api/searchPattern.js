const express = require('express');
const router = express.Router();
const Rescue = require('../../models/Rescue');
const { spiralMotion, creepyLineMotion, addProperties } = require('../../calcArea');

//@route POST api/searchPattern/
//@desc show the search pattern
//@access Private
router.post('/', async (req, res) => {
    let motion = req.body, rescueTeam;

    const teams = await Rescue.find({});
    for (let feature of motion.filteredGrid.features) {

        if (feature.rescue_team == 'helicopterA')
            rescueTeam = teams[0];
        else if (feature.rescue_team == 'helicopterB')
            rescueTeam = teams[1];
        else
            rescueTeam = teams[2];

        if (feature.pattern_type == 'expanded_square')
            feature.pattern = spiralMotion(feature.geometry.coordinates, rescueTeam.fieldofview);
        else
            feature.pattern = creepyLineMotion(feature.geometry.coordinates, rescueTeam.fieldofview);

        feature.properties = addProperties(rescueTeam, feature.pattern);
    }

    res.status(201).json(motion);
});

module.exports = router;
