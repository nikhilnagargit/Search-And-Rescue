import './RescueTeams.scss';
import { Link } from 'react-router-dom';
import airsupport from '../../../images/airsupport.png';
import rightArrow from '../../../images/right-arrow.png';
import fillicon from '../../../images/fill-up.png';
import fighter from '../../../images/fighter.png';
import drone_icon from '../../../images/drone.png';
import helicopter from '../../../images/helicopter.png';
import one from '../../../images/1.png';
import two from '../../../images/2.png';
import three from '../../../images/3.png';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const ResuceTeams = () => {
  const classes = useStyles();

  const [helicopterA, setHelicopterA] = useState({});
  const [helicopterB, setHelicopterB] = useState({});
  const [drone, setDrone] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`api/rescueTeam`);

      const data = response.data;
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div className='topcontent'>
      <div className='middle'>
        <div className='header'>
          <h2>Update Rescue Teams</h2>
        </div>
        <h3 className='middle-heading'>
          These updates will reflect in the realtime rescue operation.
        </h3>
        <div className='cards'>
          <div className='card'>
            <img src={one} className='badge' alt='' />
            <h4>Helicopter A</h4>

            <img className='main-image' src={fighter} alt='' />
            <form className={classes.root} noValidate autoComplete='off'>
              <TextField id='outlined-basic' label='Speed' size='small' />
              <TextField id='outlined-basic' label='Speed' size='small' />
              <TextField id='outlined-basic' label='Speed' size='small' />
              <TextField id='outlined-basic' label='Speed' size='small' />
            </form>
          </div>
          <img className='arrow' src={rightArrow} alt='' />
          <div className='card'>
            <img src={two} className='badge' alt='' />
            <h4>Helicopter B</h4>
            <p>
              Fill the last known information about aircraft like coordinates,
              altitude, velocity etc.
            </p>
            <img className='main-image' src={helicopter} alt='' />
          </div>
          <img className='arrow' src={rightArrow} alt='' />
          <div className='card'>
            <img src={three} className='badge' alt='' />
            <h4>Drone</h4>
            <p>
              Fill the last known information about aircraft like coordinates,
              altitude, velocity etc.
            </p>
            <img className='main-image' src={drone_icon} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResuceTeams;
