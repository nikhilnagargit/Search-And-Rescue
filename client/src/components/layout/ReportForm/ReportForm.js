import React from 'react';
import './ReportForm.scss';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import { showDialog } from '../../../actions/dialog';
import { connect } from 'react-redux';
const initialFormData = {
  latitude: '',
  longitude: '',
  velocity: '',
  direction: '',
  weather: '',
  description: '',
  altitude: '',
  title: '',
  category: '',
};

const dialogcontent = {
  title: 'Missing Aircraft Successfully Reported',
  description:
    'New missing aircraft has been added. Now you can checkout in recent aircrafts to proceed further for search area operations.',
  buttontext: 'Ok, I will',
};

const mapDispatchToProps = (dispatch) => {
  return {
    showDialog: (payload) => dispatch(showDialog(payload)),
  };
};

const ReportForm = (props) => {
  const [formData, setformData] = useState(initialFormData);

  const onInputFieldChange = (e) => {
    const newdata = { ...formData };
    newdata[e.target.name] = e.target.value;
    setformData(newdata);
  };

  const submitDataToAPI = (e) => {
    e.preventDefault();

    axios
      .post('./api/reportAircraft', formData)
      .then((res) => {
        console.log(res);
        setformData(initialFormData);
        // dispatch a action to show the dialog
        props.showDialog(dialogcontent);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='form-container'>
      <h3>
        Last Known Information{'  '}
        <i className='fas fa-plane-arrival'></i>
      </h3>
      <form
        className='reportForm'
        onSubmit={(e) => {
          submitDataToAPI(e);
        }}
      >
        <div>
          <TextField
            value={formData.title}
            name='title'
            label='Title'
            onChange={(e) => onInputFieldChange(e)}
          />
        </div>
        <div>
          <FormControl>
            <InputLabel id='category'>Category</InputLabel>

            <Select
              name='category'
              labelId='category'
              value={formData.category}
              onChange={(e) => {
                onInputFieldChange(e);
              }}
            >
              <MenuItem value={1}>Category A</MenuItem>
              <MenuItem value={2}>Category B</MenuItem>
              <MenuItem value={3}>Category C</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='position'>
          <TextField
            className='lat'
            name='latitude'
            value={formData.latitude}
            label='Latitude'
            onChange={(e) => onInputFieldChange(e)}
          />
          <TextField
            className='lon'
            value={formData.longitude}
            name='longitude'
            label='Longitude'
            onChange={(e) => onInputFieldChange(e)}
          />
        </div>
        <div>
          <TextField
            type='number'
            value={formData.velocity}
            name='velocity'
            label='Velocity(km/hr)'
            onChange={(e) => onInputFieldChange(e)}
          />
        </div>
        <div>
          <TextField
            name='direction'
            value={formData.direction}
            onChange={(e) => onInputFieldChange(e)}
            label='Direction'
          />
        </div>
        <div>
          <TextField
            name='weather'
            value={formData.weather}
            label='Weather'
            onChange={(e) => onInputFieldChange(e)}
          />
        </div>
        <div>
          <TextField
            name='altitude'
            value={formData.altitude}
            onChange={(e) => onInputFieldChange(e)}
            type='number'
            label='Altitude'
          />
        </div>
        <div>
          <TextField
            name='description'
            multiline
            rowsMax={4}
            label='Description'
            value={formData.description}
            onChange={(e) => onInputFieldChange(e)}
          />
        </div>
        <div>
          <Button variant='contained' color='primary' type='submit'>
            Submit Report
          </Button>
        </div>
      </form>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(ReportForm);
