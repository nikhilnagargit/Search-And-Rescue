import './RescueTeams.scss';
import rightArrow from '../../../images/right-arrow.png';
import fighter from '../../../images/fighter.png';
import drone_icon from '../../../images/drone.png';
import helicopter from '../../../images/helicopter.png';
import one from '../../../images/1.png';
import two from '../../../images/2.png';
import three from '../../../images/3.png';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '92%',
    },
  },
}));

const ResuceTeams = () => {
  const classes = useStyles();

  const [helicopterA, setHelicopterA] = useState({
    fieldofview: 0,
    speed: 0,
    type: '',
  });
  const [helicopterB, setHelicopterB] = useState({
    fieldofview: 0,
    speed: 0,
    type: '',
  });
  const [drone, setDrone] = useState({
    fieldofview: 0,
    speed: 0,
    type: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`api/rescueTeam`);
        const data = response.data;
        setHelicopterA(data[0]);
        setHelicopterB(data[1]);
        setDrone(data[2]);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const handle1 = (event) => {
    setHelicopterA({ ...helicopterA, [event.target.name]: event.target.value });
  };
  const handle2 = (event) => {
    setHelicopterB({ ...helicopterB, [event.target.name]: event.target.value });
  };
  const handle3 = (event) => {
    setDrone({ ...drone, [event.target.name]: event.target.value });
  };

  const handleSubmission1 = (event) => {
    const sendData = async () => {
      try {
        const response = await axios.put('api/rescueTeam', helicopterA);
        console.log(response);
      } catch (err) {
        console.log(err.message);
      }
    };
    sendData();
  };
  const handleSubmission2 = (event) => {
    const sendData = async () => {
      try {
        const response = await axios.put('api/rescueTeam', helicopterB);
        console.log(response);
      } catch (err) {
        console.log(err.message);
      }
    };
    sendData();
  };
  const handleSubmission3 = (event) => {
    const sendData = async () => {
      try {
        const response = await axios.put('api/rescueTeam', drone);
        console.log(response);
      } catch (err) {
        console.log(err.message);
      }
    };
    sendData();
  };
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
              <TextField
                id='outlined-basic'
                label='Speed (in Kms)'
                onChange={handle1}
                value={helicopterA.speed}
                size='small'
                name='speed'
              />
              <TextField
                id='outlined-basic'
                label='Field Of View (in Kms)'
                name='fieldofview'
                onChange={handle1}
                value={helicopterA.fieldofview}
                size='small'
              />
              <Button
                onClick={handleSubmission1}
                color='primary'
                variant='contained'
                size='small'
              >
                Update
              </Button>
            </form>
          </div>
          <img className='arrow' src={rightArrow} alt='' />
          <div className='card'>
            <img src={two} className='badge' alt='' />
            <h4>Helicopter B</h4>

            <img className='main-image' src={helicopter} alt='' />
            <form className={classes.root} noValidate autoComplete='off'>
              <TextField
                id='outlined-basic'
                label='Speed (in Kms)'
                onChange={handle2}
                value={helicopterB.speed}
                size='small'
                name='speed'
              />
              <TextField
                id='outlined-basic'
                label='Field Of View (in Kms)'
                name='fieldofview'
                onChange={handle2}
                value={helicopterB.fieldofview}
                size='small'
              />
              <Button
                type='submit'
                color='primary'
                variant='contained'
                size='small'
                onClick={handleSubmission2}
              >
                Update
              </Button>
            </form>
          </div>
          <img className='arrow' src={rightArrow} alt='' />
          <div className='card'>
            <img src={three} className='badge' alt='' />
            <h4>Drone</h4>

            <img className='main-image' src={drone_icon} alt='' />
            <form className={classes.root} noValidate autoComplete='off'>
              <TextField
                id='outlined-basic'
                label='Speed (in Kms)'
                onChange={handle3}
                value={drone.speed}
                size='small'
                name='speed'
              />
              <TextField
                id='outlined-basic'
                label='Field Of View (in Kms)'
                name='fieldofview'
                onChange={handle3}
                value={drone.fieldofview}
                size='small'
              />
              <Button
                type='submit'
                color='primary'
                size='small'
                variant='contained'
                onClick={handleSubmission3}
              >
                Update
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResuceTeams;
