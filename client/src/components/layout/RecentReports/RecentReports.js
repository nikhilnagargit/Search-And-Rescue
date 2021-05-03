import Card from '@material-ui/core/Card';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import {
  getReports,
  deleteReport,
  setCurrentAircraft,
} from '../../../actions/report';
import './RecentReports.scss';
import { useDispatch } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    reportsArray: state.reportReducer,
  };
};

// main component of this file

const RecentReports = ({ reportsArray, deleteReport, setCurrentAircraft }) => {
  const customDispatch = useDispatch();
  let data = [];
  if (reportsArray.length > 3) {
    data = reportsArray
      .slice(reportsArray.length - 3, reportsArray.length)
      .reverse();
  } else {
    data = reportsArray.reverse();
  }
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
        {data.map((item, i) => (
          <Card className='card' key={item._id}>
            <p>{item.title}</p>
            <div className='bottom'>
              <Link to='/search-area'>
                <IconButton
                  onClick={() => {
                    setCurrentAircraft(item);
                  }}
                  aria-label='rescue'
                >
                  <i className='fas fa-paper-plane fa-sm'></i>
                </IconButton>
              </Link>
              <IconButton
                aria-label='delete'
                onClick={(e) => {
                  deleteReport(item._id);
                }}
              >
                <i className='fas fa-trash fa-sm'></i>
              </IconButton>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, { deleteReport, setCurrentAircraft })(
  RecentReports
);
