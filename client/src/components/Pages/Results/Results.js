import * as React from 'react';
import './Results.scss';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  main: {
    margin: '1rem',
  },
  table: {
    minWidth: 650,
  },
  head: {
    backgroundColor: 'black',
    color: 'white',
  },
  container: {
    maxWidth: '100%',
    height: '50%',
  },
});

const mapStateToProps = (state) => {
  return {
    searchAreaProperties:
      state.searchAreaReducer.geojson.features[0].properties,
    subAreas: state.searchAreaReducer.filteredGrid.features,
  };
};

function Results(props) {
  const classes = useStyles();

  return props.subAreas.length === 0 ||
    props.subAreas === undefined ||
    props.subAreas[0].rescue_team === undefined ? (
    <h2>Oops, nothing here, first select a missing aircraft</h2>
  ) : (
    <div className={classes.main}>
      <TableContainer component={Paper} className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label='simple table'
          size='small'
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.head}>Index</TableCell>
              <TableCell className={classes.head} align='left'>
                Search Pattern
              </TableCell>
              <TableCell className={classes.head} align='left'>
                Rescue Team
              </TableCell>
              <TableCell className={classes.head} align='left'>
                Path Length
              </TableCell>
              <TableCell className={classes.head} align='left'>
                Search Time&nbsp;(hours)
              </TableCell>
              <TableCell className={classes.head} align='left'>
                Field of View&nbsp;(km)
              </TableCell>
              <TableCell className={classes.head} align='left'>
                Speed &nbsp;(km/hr)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.subAreas.map((row, index) => (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  {index}
                </TableCell>
                <TableCell align='left'>{row.pattern_type}</TableCell>
                <TableCell align='left'>{row.rescue_team}</TableCell>
                <TableCell align='left'>
                  {row.properties.distance.toFixed(4)}
                </TableCell>
                <TableCell align='left'>
                  {row.properties.time.toFixed(4)}
                </TableCell>
                <TableCell align='left'>
                  {row.properties.fieldofview.toFixed(4)}
                </TableCell>
                <TableCell align='left'>
                  {row.properties.speed.toFixed(4)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default connect(mapStateToProps, null)(Results);
