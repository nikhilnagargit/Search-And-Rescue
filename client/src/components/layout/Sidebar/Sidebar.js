import React, { useState } from 'react';
import './Sidebar.scss';
import { Fragment } from 'react';
import saricon from '../../../images/sar.png';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [sidebarVisible, setsidebarVisible] = useState(true);
  return (
    <Fragment>
      <div className={sidebarVisible ? 'sidebar' : 'sidebar expand'}>
        <div class='sidebar-brand'>
          <img src={saricon} alt='' />
          <i
            onClick={() => {
              setsidebarVisible(!sidebarVisible);
            }}
            class='fas fa-hamburger fa-lg burger'
          ></i>
          <p> Search And Rescue</p>
        </div>
        <div class='sidebar-menu'>
          <div class='section'>
            <p className='section-header'>Main</p>
            <ul>
              <Link to='/home'>
                <li>
                  <i class='fas fa-home fa-lg'></i>
                  <p>Home</p>
                </li>
              </Link>
              <Link to='/report'>
                <li>
                  <i class='fas fa-fighter-jet fa-lg'></i>
                  <p>Report</p>
                </li>
              </Link>
            </ul>
          </div>
          <div class='section'>
            <p className='section-header'>Search And Rescue</p>
            <ul>
              <Link to='/search-area'>
                <li>
                  <i class='fas fa-search-location fa-lg'></i>
                  <p>Search Area</p>
                </li>
              </Link>
              <Link to='/search-pattern'>
                <li>
                  <i class='fas fa-quidditch fa-lg'></i>
                  <p>Sweep Pattern</p>
                </li>
              </Link>
              <Link to='/results'>
                <li>
                  <i class='fas fa-poll fa-lg'></i>
                  <p>Results</p>
                </li>
              </Link>
            </ul>
          </div>
          <div class='section'>
            <p className='section-header'>Extras</p>
            <ul>
              <Link to='/alert'>
                <li>
                  <i class='fas fa-exclamation-triangle fa-lg'></i>
                  <p>Alert</p>
                </li>
              </Link>
              <Link to='/aboutUs'>
                <li>
                  <i class='fas fa-users fa-lg'></i>
                  <p>About us</p>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
