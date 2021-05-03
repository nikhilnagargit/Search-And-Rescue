import './About.scss';
import React from 'react';
import amico from '../../../images/amico.png';
import jecrc from '../../../images/jecrc.png';
import user from '../../../images/user.png';

const About = () => {
  return (
    <div className='about'>
      <h2>Search And Rescue operations for missing Aircraft</h2>
      <div className='aboutinside'>
        <div className='team'>
          <ul>
            <li>
              <img src={user} alt='' />
              <span>Nikhil Nagar</span>
            </li>
            <li>
              <img src={user} alt='' />
              <span>Laxit Yadav</span>
            </li>
            <li>
              <img src={user} alt='' />
              <span>Lakhan Kachhawa</span>
            </li>
            <li>
              <img src={user} alt='' />
              <span>Karamveer Singh Rathore</span>
            </li>
          </ul>
          <img className='jecrc' src={jecrc} alt=''></img>
        </div>
        <img className='amico' src={amico} alt=''></img>
      </div>
    </div>
  );
};

export default About;
