import React, { Fragment } from 'react';
import './Navbar.scss';
import clock from '../../../images/clock.png';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <Fragment>
      <nav>
        <div className='left-nav-section'>
          <img className='clockicon' src={clock} alt='' />
        </div>

        <ul className='right-nav-section'>
          <li className='searchbar'>
            <i className='fa fa-search'></i>
            <span>Search</span>
          </li>
          <li>
            <i className='fa fa-bell fa-lg'></i>
          </li>
          <li>
            <Link to='/'>
              <i className='fas fa-user-astronaut fa-lg'></i>
            </Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navbar;
