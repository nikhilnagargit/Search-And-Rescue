import React, { useState } from 'react';
import './Sidebar.scss';
import { Fragment } from 'react';
import saricon from '../../../images/sar.png';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [sidebarVisible, setsidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  console.log('side bar loaded');
  const handleClick = (event) => {
    // event.target.element.className = 'active-tab';
    setActiveTab(event.target.getAttribute('name'));
  };
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
                <li
                  name='home'
                  onClick={handleClick}
                  className={activeTab === 'home' ? 'active-tab' : ''}
                >
                  <i name='home' className='fas fa-home fa-lg'></i>
                  <p name='home'>Home</p>
                </li>
              </Link>
              <Link to='/report'>
                <li
                  name='report'
                  onClick={(e) => {
                    handleClick(e);
                  }}
                  className={activeTab === 'report' ? 'active-tab' : ''}
                >
                  <i name='report' className='fas fa-fighter-jet fa-lg'></i>
                  <p name='report'>Report</p>
                </li>
              </Link>
            </ul>
          </div>
          <div className='section'>
            <p className='section-header'>Search And Rescue</p>
            <ul>
              <Link to='/search-area'>
                <li
                  name='search-area'
                  onClick={handleClick}
                  className={activeTab === 'search-area' ? 'active-tab' : ''}
                >
                  <i
                    name='search-area'
                    className='fas fa-search-location fa-lg'
                  ></i>
                  <p name='search-area'> Search Area</p>
                </li>
              </Link>
              <Link to='/search-pattern'>
                <li
                  name='search-pattern'
                  onClick={handleClick}
                  className={activeTab === 'search-pattern' ? 'active-tab' : ''}
                >
                  <i
                    name='search-pattern'
                    className='fas fa-quidditch fa-lg'
                  ></i>
                  <p name='search-pattern'>Sweep Pattern</p>
                </li>
              </Link>
              <Link to='/results'>
                <li
                  name='results'
                  onClick={handleClick}
                  className={activeTab === 'results' ? 'active-tab' : ''}
                >
                  <i name='results' className='fas fa-poll fa-lg'></i>
                  <p name='results'>Results</p>
                </li>
              </Link>
            </ul>
          </div>
          <div className='section'>
            <p className='section-header'>Extras</p>
            <ul>
              <Link to='/alert'>
                <li
                  name='alert'
                  onClick={handleClick}
                  className={activeTab === 'alert' ? 'active-tab' : ''}
                >
                  <i
                    name='alert'
                    className='fas fa-exclamation-triangle fa-lg'
                  ></i>
                  <p name='alert'>Alert</p>
                </li>
              </Link>
              <Link to='/aboutUs'>
                <li
                  name='aboutUs'
                  onClick={handleClick}
                  className={activeTab === 'aboutUs' ? 'active-tab' : ''}
                >
                  <i name='aboutUs' className='fas fa-users fa-lg'></i>
                  <p name='aboutUs'>About us</p>
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
