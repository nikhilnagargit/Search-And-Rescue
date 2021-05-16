import React, { useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import chart from '../../../images/chart.png';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { connect } from 'react-redux';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './AreaTypeSelector.scss';
import { FormGroup } from '@material-ui/core';
import { getRoads, resetRoads } from '../../../actions/roads';
import { getHelpPoints, resetHelpPoints } from '../../../actions/helpPoints';

const AreaTypeSelector = (props) => {
  const [value, setValue] = React.useState('circle');
  const [additionalPointsCheckboxes, setAdditionalPointsCheckboxes] =
    React.useState({ roads: false, hospitals: false, others: false });
  const [bufferRadius, setBufferRadius] = React.useState(10);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleCheckBox = (event) => {
    setAdditionalPointsCheckboxes({
      ...additionalPointsCheckboxes,
      [event.target.name]: event.target.checked,
    });
  };

  const handleBufferRadius = (event) => {
    setBufferRadius(event.target.value);
  };
  // use effect, to fetch the data , when checkbox state is updated
  useEffect(() => {
    if (additionalPointsCheckboxes.hospitals) {
      props.getHelpPoints(bufferRadius);
    } else {
      props.resetHelpPoints();
    }
  }, [additionalPointsCheckboxes.hospitals, props, bufferRadius]);
  useEffect(() => {
    if (additionalPointsCheckboxes.roads) {
      props.getRoads(bufferRadius);
    } else {
      props.resetRoads();
    }
  }, [additionalPointsCheckboxes.roads, props, bufferRadius]);
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
        <FormLabel component='legend'>Load Additional Information</FormLabel>

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

      <FormControl className='buffer'>
        <Grid container spacing={1} alignItems='flex-end'>
          <Grid item>
            <img
              src={chart}
              alt='x'
              style={{ width: '2rem', height: '2rem' }}
            />
          </Grid>
          <Grid item>
            <TextField
              color='secondary'
              id='outlined-basic'
              label='Additional Info Radius(Km)'
              defaultValue='10'
              onChange={handleBufferRadius}
              type='number'
            />
          </Grid>
        </Grid>
      </FormControl>
    </div>
  );
};

export default connect(null, {
  getRoads,
  getHelpPoints,
  resetHelpPoints,
  resetRoads,
})(AreaTypeSelector);
