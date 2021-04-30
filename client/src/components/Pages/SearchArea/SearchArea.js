import React from 'react';
import './SearchArea.scss';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

import SearchMap from '../../layout/SearchMap/SearchMap';
import AreaTypeSelector from '../../layout/AreaTypeSelector/AreaTypeSelector';
import { Container } from '@material-ui/core';

const data = {
  altitude: '5',
  category: 2,
  description: 'Aircraft lost while turning way to New Delhi.',
  direction: '56',
  latitude: '550.7',
  longitude: '180.8',
  title: 'Flight 222',
  velocity: '345',
  weather: 'Raining',
};

// main component

const SearchArea = () => {
  return (
    <div className='search-area-main'>
      <div className='top'>
        <AreaTypeSelector></AreaTypeSelector>
      </div>
      <div className='middle'>
        <SearchMap />
      </div>
      <div className='side'>
        <TableContainer component={Paper} className='table'>
          <Table aria-label='simple table' size='small'>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2} align='center'>
                  <h4>Current Missing Flight Information</h4>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(data).map((row, index) => (
                <TableRow key={index} hover='true' className='tablerow'>
                  <TableCell component='th' scope='row'>
                    {row[0]}
                  </TableCell>
                  <TableCell>{row[1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className='button-container'>
          <Button variant='contained' color='primary' size='small'>
            Find Area
          </Button>
          <Button variant='contained' color='secondary' size='small'>
            Proceed to Pattern
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchArea;
