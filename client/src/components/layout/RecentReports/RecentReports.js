import Card from '@material-ui/core/Card';
// import Link from '@material-ui/core/Link';
import React, { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { getReports } from '../../../actions/report';
import { Link } from 'react-router-dom';
import './RecentReports.scss';

const mapStateToProps = (state) => {
  return {
    reportsArray: state.reportReducer,
  };
};

const RecentReports = (props) => {
  useEffect(() => {
    props.getReports();
  }, []);

  return (
    <div className='recent-container'>
      <div className='heading'>
        <h4>Recent Missing Flights</h4>
        {/* this link is from material , not from router */}
        <div className='show_all'>
          {' '}
          <Link href='#'>Show All</Link>
        </div>
      </div>
      <div className='cards-section'>
        {props.reportsArray.length > 3
          ? props.reportsArray
              .slice(props.reportsArray.length - 3, props.reportsArray.length)
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
          : props.reportsArray.reverse().map((item, i) => (
              <Card className='card' key={item._id}>
                <p>{item.title}</p>
                <div className='bottom'>
                  <IconButton aria-label='rescue'>
                    <i className='fas fa-paper-plane fa-sm'></i>
                  </IconButton>
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

export default connect(mapStateToProps, { getReports })(RecentReports);
