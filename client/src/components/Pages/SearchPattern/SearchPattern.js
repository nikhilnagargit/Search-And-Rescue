import './SearchPattern.scss';
import React from 'react';
import SearchMap from '../../layout/SearchMap/SearchMap';
import { connect } from 'react-redux';
import { getSearchArea, assignRescueTeam } from '../../../actions/area';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import drone from '../../../images/drone.png';
import helicopter from '../../../images/helicopter.png';
import fighter from '../../../images/fighter.png';
const mapStateToProps = (state) => {
  return {
    areaData: state.searchAreaReducer,
  };
};

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 530,
  },

  formControl: {
    margin: '0rem',
    minWidth: 110,
  },
  selectEmpty: {
    marginTop: '0.4rem',
  },
});
const SearchPattern = (props) => {
  const classes = useStyles();

  const handleChange = (event, index) => {
    console.log('I am from handle change', index);
    props.assignRescueTeam(index, event.target.value);
  };

  return (
    <div className='search-pattern-main'>
      <Grid container className='top'>
        <Grid
          container
          item
          xs={6}
          justify='space-around'
          alignItems='center'
          className='icons-container'
        >
          <Grid item xs={2}>
            <Badge
              badgeContent={
                props.areaData.filteredGrid.features.filter(
                  (item) => item.rescue_team === 'helicopterA'
                ).length
              }
              color='secondary'
            >
              <img src={fighter} width='60' height='60' alt='' />
            </Badge>
          </Grid>

          <Grid item xs={2}>
            <Badge
              badgeContent={
                props.areaData.filteredGrid.features.filter(
                  (item) => item.rescue_team === 'helicopterB'
                ).length
              }
              color='primary'
            >
              <img src={helicopter} width='60' height='60' alt='' />
            </Badge>
          </Grid>

          <Grid item xs={2}>
            <Badge
              badgeContent={
                props.areaData.filteredGrid.features.filter(
                  (item) => item.rescue_team === 'drone'
                ).length
              }
              color='error'
            >
              <img src={drone} width='60' height='60' alt='' />
            </Badge>
          </Grid>
        </Grid>
        <Grid item container xs={6} alignItems='center'>
          abcd
        </Grid>
      </Grid>
      <div className='middle'>
        <SearchMap areaData={props.areaData} />
      </div>

      <div className='side'>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table
              stickyHeader
              size='small'
              aria-label='sticky table'
              className='table'
            >
              <TableHead>
                <TableRow>
                  <TableCell align='center'>SubArea Index</TableCell>

                  <TableCell align='center'>Team</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.areaData.filteredGrid.features.map((row, num) => {
                  return (
                    <TableRow hover key={num + '0'}>
                      <TableCell align='center' key={num + '1'}>
                        {num}
                      </TableCell>
                      <TableCell align='center' key={num + '2'}>
                        <FormControl
                          align='center'
                          className={classes.formControl}
                          key={num + '3'}
                        >
                          <Select
                            value={row.rescue_team ? row.rescue_team : ''}
                            onChange={(event) => {
                              handleChange(event, num);
                            }}
                            className={classes.selectEmpty}
                            inputProps={{ 'aria-label': 'select team' }}
                          >
                            <MenuItem value=''>
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={'helicopterA'}>
                              Helecopter A
                            </MenuItem>
                            <MenuItem value={'helicopterB'}>
                              Helecopter B
                            </MenuItem>
                            <MenuItem value={'drone'}>Drone</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <div className='button-container'>
          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={() => {
              alert('start searcing');
            }}
          >
            Fetch Pattern
          </Button>
          <Button variant='contained' color='secondary' size='small'>
            Start Patterns
          </Button>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, { getSearchArea, assignRescueTeam })(
  SearchPattern
);
