import React from 'react';
import { Fragment } from 'react';
import './Landing.scss';
import saricon from '../../../images/sar.png';
import intro from '../../../images/intro.png';
import clock from '../../../images/clock.png';
import airplane1 from '../../../images/airplane1.png';
import airplane2 from '../../../images/airplane2.png';
import startquote from '../../../images/startquote.png';
import endquote from '../../../images/endquote.png';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Fragment>
      <header>
        <nav>
          <img className='header-logo' src={saricon} alt='logo' />
          <h2> Search And Rescue Operations For Missing Aircraft</h2>
        </nav>

        <img className='header-image' src={airplane1} alt='airplane_image' />
      </header>

      <main>
        <img className='main-left' src={intro} alt='' />

        <div className='main-right'>
          <div className='quote'>
            <img src={startquote} alt='' />
            <h3>
              The life expectancy of an injured survivor decreases as much as 80
              percent during the first 24 hours, while the chances of survival
              of uninjured survivors rapidly diminishes after the first 3 days
            </h3>
            <img src={endquote} alt='' />
          </div>

          <Link to='/home' className='link'>
            <div className='button'>
              <p> Start Rescue Mission </p>
              <img className='clock' src={clock} alt='' />
            </div>
          </Link>
        </div>
      </main>

      <footer>
        <img className='footer-image' src={airplane2} alt='airplane_image' />
      </footer>
    </Fragment>
  );
};

export default Landing;
