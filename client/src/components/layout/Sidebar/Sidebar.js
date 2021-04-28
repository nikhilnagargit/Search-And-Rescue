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
        <div className='sidebar-brand'>
          <img src={saricon} alt='' />

          <p> Search And Rescue</p>
          <i
            onClick={() => {
              setsidebarVisible(!sidebarVisible);
            }}
            className={
              sidebarVisible ? 'fas fa-bars fa-lg' : 'fas fa-times fa-lg'
            }
          ></i>
        </div>
        <div className='sidebar-menu'>
          <div className='section'>
            <p className='section-header'>Main</p>
            <ul>
              <Link to='/home'>
                <li>
                  <i className='fas fa-home fa-lg'></i>
                  <p>Home</p>
                </li>
              </Link>
              <Link to='/report'>
                <li>
                  <i className='fas fa-fighter-jet fa-lg'></i>
                  <p>Report</p>
                </li>
              </Link>
            </ul>
          </div>
          <div className='section'>
            <p className='section-header'>Search And Rescue</p>
            <ul>
              <Link to='/search-area'>
                <li>
                  <i className='fas fa-search-location fa-lg'></i>
                  <p>Search Area</p>
                </li>
              </Link>
              <Link to='/search-pattern'>
                <li>
                  <i className='fas fa-quidditch fa-lg'></i>
                  <p>Sweep Pattern</p>
                </li>
              </Link>
              <Link to='/results'>
                <li>
                  <i className='fas fa-poll fa-lg'></i>
                  <p>Results</p>
                </li>
              </Link>
            </ul>
          </div>
          <div className='section'>
            <p className='section-header'>Extras</p>
            <ul>
              <Link to='/alert'>
                <li>
                  <i className='fas fa-exclamation-triangle fa-lg'></i>
                  <p>Alert</p>
                </li>
              </Link>
              <Link to='/aboutUs'>
                <li>
                  <i className='fas fa-users fa-lg'></i>
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
