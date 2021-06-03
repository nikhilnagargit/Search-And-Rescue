import React, { useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import chart from '../../../images/chart.png';
import radius from '../../../images/radius.png';
import foreground from '../../../images/foreground.png';
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
import {
  setBufferDistance,
  setBufferRadius,
  setAdditionalPointsCheckboxes,
  setSubareaSide,
} from '../../../actions/general';

const mapStateToProps = (state) => {
  return {
    bufferRadius: state.generalReducer.buffer_radius,
    bufferDistance: state.generalReducer.buffer_distance,
    subareaSide: state.generalReducer.subarea_side,
    additionalPointsCheckboxes:
      state.generalReducer.additional_points_checkboxes,
  };
};

const AreaTypeSelector = (props) => {
  const [value, setValue] = React.useState('circle');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleCheckBox = (event) => {
    props.setAdditionalPointsCheckboxes({
      ...props.additionalPointsCheckboxes,
      [event.target.name]: event.target.checked,
    });
  };

  const handleBufferRadius = (event) => {
    props.setBufferRadius(event.target.value);
  };

  const handleBufferDistance = (event) => {
    props.setBufferDistance(event.target.value);
  };

  const handleSubareaSide = (event) => {
    props.setSubareaSide(event.target.value);
  };

  // use effect, to fetch the data , when checkbox state is updated

  useEffect(() => {
    if (props.additionalPointsCheckboxes.hospitals) {
      props.getHelpPoints();
    } else {
      props.resetHelpPoints();
    }
  }, [props.additionalPointsCheckboxes.hospitals, props]);
  useEffect(() => {
    if (props.additionalPointsCheckboxes.roads) {
      props.getRoads();
    } else {
      props.resetRoads();
    }
  }, [props.additionalPointsCheckboxes.roads, props]);
  useEffect(() => {
    if (props.additionalPointsCheckboxes.others) {
      console.log('others called');
    }
  }, [props.additionalPointsCheckboxes.others]);

  return (
    <Grid container className='areatypeselector'>
      {/* <Grid item xs={4} className='main-item'>
        <FormControl component='div'>
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
      </Grid> */}

      <Grid item xs={4} className='main-item'>
        <FormControl component='div' className='checkboxgroup'>
          <FormLabel component='legend'>Load Additional Information</FormLabel>

          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  name='roads'
                  color='secondary'
                  onChange={handleCheckBox}
                  checked={props.additionalPointsCheckboxes.roads}
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
                  checked={props.additionalPointsCheckboxes.hospitals}
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
                  checked={props.additionalPointsCheckboxes.others}
                />
              }
              label='Others'
            />
          </FormGroup>
        </FormControl>
      </Grid>

      <Grid
        container
        item
        spacing={1}
        xs={4}
        className='main-item'
        alignItems='center'
      >
        <Grid item>
          <img src={radius} alt='x' style={{ width: '2rem', height: '2rem' }} />
        </Grid>
        <Grid item>
          <TextField
            color='secondary'
            id='outlined-basic'
            label='Helper Data Radius(Km)'
            defaultValue={props.bufferRadius}
            onChange={handleBufferRadius}
            type='number'
          />
        </Grid>
      </Grid>

      <Grid
        container
        item
        spacing={1}
        xs={4}
        className='main-item'
        alignItems='center'
      >
        <Grid item>
          <img
            src={foreground}
            alt='x'
            style={{ width: '2rem', height: '2rem' }}
          />
        </Grid>
        <Grid item>
          <TextField
            color='secondary'
            id='outlined-basic'
            label='Sub Area Side(Km)'
            defaultValue={props.subareaSide}
            onChange={handleSubareaSide}
            type='number'
          />
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={4}
        spacing={1}
        className='main-item'
        alignItems='center'
      >
        <Grid item>
          <img src={chart} alt='x' style={{ width: '2rem', height: '2rem' }} />
        </Grid>
        <Grid item>
          <TextField
            color='secondary'
            id='outlined-basic'
            label='SearchArea Buffer(Km)'
            defaultValue={props.bufferDistance}
            onChange={handleBufferDistance}
            type='number'
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default connect(mapStateToProps, {
  getRoads,
  getHelpPoints,
  resetRoads,
  resetHelpPoints,
  setBufferRadius,
  setBufferDistance,
  setAdditionalPointsCheckboxes,
  setSubareaSide,
})(AreaTypeSelector);
