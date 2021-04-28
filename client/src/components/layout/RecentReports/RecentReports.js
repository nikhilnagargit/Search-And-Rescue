import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import aircraft from '../../../images/airplane1.png';
import IconButton from '@material-ui/core/IconButton';

import './RecentReports.scss';

const RecentReports = () => {
  return (
    <div className='recent-container'>
      <h4 className='heading'>Recent Missing Flights</h4>
      <div className='cards-section'>
        <Card className='card'>
          <CardActionArea>
            <CardContent>
              <Typography variant='body4'>Flight Mark-D 12</Typography>
            </CardContent>
            <div className='bottom'>
              <IconButton aria-label='rescue'>
                <i className='fas fa-paper-plane fa-sm'></i>
              </IconButton>
              <IconButton aria-label='delete'>
                <i className='fas fa-trash fa-sm'></i>
              </IconButton>
            </div>
          </CardActionArea>
        </Card>
        <Card className='card'>
          <CardActionArea>
            <CardContent>
              <Typography variant='body4'>Flight Mark-D 12</Typography>
            </CardContent>
            <div className='bottom'>
              <IconButton aria-label='rescue'>
                <i className='fas fa-paper-plane fa-sm'></i>
              </IconButton>
              <IconButton aria-label='delete'>
                <i className='fas fa-trash fa-sm'></i>
              </IconButton>
            </div>
          </CardActionArea>
        </Card>
        <Card className='card'>
          <CardActionArea>
            <CardContent>
              <Typography variant='body4'>Flight Mark-D 12</Typography>
            </CardContent>
            <div className='bottom'>
              <IconButton aria-label='rescue'>
                <i className='fas fa-paper-plane fa-sm'></i>
              </IconButton>
              <IconButton aria-label='delete'>
                <i className='fas fa-trash fa-sm'></i>
              </IconButton>
            </div>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};

export default RecentReports;
