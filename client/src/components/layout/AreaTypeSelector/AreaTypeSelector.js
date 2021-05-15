import React, { useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { connect } from 'react-redux';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './AreaTypeSelector.scss';
import { FormGroup } from '@material-ui/core';
import { getRoads } from '../../../actions/roads';
import { getHelpPoints } from '../../../actions/helpPoints';

const AreaTypeSelector = (props) => {
  const [value, setValue] = React.useState('circle');
  const [additionalPointsCheckboxes, setAdditionalPointsCheckboxes] =
    React.useState({ roads: false, hospitals: false, others: false });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleCheckBox = (event) => {
    setAdditionalPointsCheckboxes({
      ...additionalPointsCheckboxes,
      [event.target.name]: event.target.checked,
    });
  };

  // use effect, to fetch the data , when checkbox state is updated
  useEffect(() => {
    if (additionalPointsCheckboxes.hospitals) {
      console.log('hospitals callled');
      props.getHelpPoints();
    }
  }, [additionalPointsCheckboxes.hospitals, props]);
  useEffect(() => {
    if (additionalPointsCheckboxes.roads) {
      console.log('roads callled');
      props.getRoads();
    }
  }, [additionalPointsCheckboxes.roads, props]);
  useEffect(() => {
    if (additionalPointsCheckboxes.others) {
      console.log('others called');
    }
  }, [additionalPointsCheckboxes.others]);

  return (
    <div className='areatypeselector'>
      <FormControl component='div' className='radiogroup'>
        <FormLabel component='legend'>Select Search Area Type</FormLabel>
        <RadioGroup name='areatype' value={value} onChange={handleChange} row>
          <FormControlLabel
            value='circle'
            control={<Radio />}
            label='Circluar'
          />
          <FormControlLabel
            value='rectangle'
            control={<Radio />}
            label='Rectangular'
          />
          <FormControlLabel
            value='accurate'
            control={<Radio />}
            label='Accurate'
          />
        </RadioGroup>
      </FormControl>

      <FormControl component='div' className='checkboxgroup'>
        <FormLabel component='legend'>Load Additional Infromation</FormLabel>

        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                name='roads'
                color='secondary'
                onChange={handleCheckBox}
              />
            }
            label='Roads'
          />
          <FormControlLabel
            control={
              <Checkbox
                name='hospitals'
                color='secondary'
                onChange={handleCheckBox}
              />
            }
            label='Hospitals'
          />
          <FormControlLabel
            control={
              <Checkbox
                name='others'
                color='secondary'
                onChange={handleCheckBox}
              />
            }
            label='Others'
          />
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default connect(null, { getRoads, getHelpPoints })(AreaTypeSelector);
