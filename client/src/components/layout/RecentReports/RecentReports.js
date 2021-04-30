import Card from '@material-ui/core/Card';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { getReports } from '../../../actions/report';
import './RecentReports.scss';
import { useDispatch } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    reportsArray: state.reportReducer,
  };
};

const RecentReports = ({ reportsArray }) => {
  const customDispatch = useDispatch();

  useEffect(() => {
    customDispatch(getReports());
  }, [customDispatch]);

  return (
    <div className='recent-container'>
      <div className='heading'>
        <h4>Recent Missing Flights</h4>
        {/* this link is from material , not from router */}
        <div className='show_all'>
          {' '}
          <Link to='#!'>Show All</Link>
        </div>
      </div>
      <div className='cards-section'>
        {reportsArray.length > 3
          ? reportsArray
              .slice(reportsArray.length - 3, reportsArray.length)
              .reverse()
              .map((item, i) => (
                <Card className='card' key={item._id}>
                  <p>{item.title}</p>
                  <div className='bottom'>
                    <Link to='/search-area'>
                      <IconButton aria-label='rescue'>
                        <i className='fas fa-paper-plane fa-sm'></i>
                      </IconButton>
                    </Link>
                    <IconButton aria-label='delete'>
                      <i className='fas fa-trash fa-sm'></i>
                    </IconButton>
                  </div>
                </Card>
              ))
          : reportsArray.reverse().map((item, i) => (
              <Card className='card' key={item._id}>
                <p>{item.title}</p>
                <div className='bottom'>
                  <Link to='/search-area'>
                    <IconButton aria-label='rescue'>
                      <i className='fas fa-paper-plane fa-sm'></i>
                    </IconButton>
                  </Link>
                  <IconButton aria-label='delete'>
                    <i className='fas fa-trash fa-sm'></i>
                  </IconButton>
                </div>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, null)(RecentReports);
