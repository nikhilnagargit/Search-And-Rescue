import React from 'react';
import './ReportForm.scss';
import { TextField, Button } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';

const initialFormData = {
  latitude: '',
  longitude: '',
  velocity: '',
  direction: '',
  weather: '',
  description: '',
  altitude: '',
};

const ReportForm = () => {
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

export default ReportForm;
