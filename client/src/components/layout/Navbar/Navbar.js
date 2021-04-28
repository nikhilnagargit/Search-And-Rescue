import React, { Fragment } from 'react';
import './Navbar.scss';
import clock from '../../../images/clock.png';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <Fragment>
      <nav>
        <div class='left-nav-section'>
          <img className='clockicon' src={clock} alt='' />
        </div>

        <ul class='right-nav-section'>
          <li class='searchbar'>
            <i className='fa fa-search'></i>
            <span>Search</span>
          </li>
          <li>
            <i className='fa fa-bell fa-lg'></i>
          </li>
          <li>
            <Link to='/'>
              <i class='fas fa-user-astronaut fa-lg'></i>
            </Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navbar;
