import './SearchPattern.scss';
import React from 'react';
import SearchMap from '../../layout/SearchMap/SearchMap';
import { connect } from 'react-redux';
import {
  getSearchArea,
  assignRescueTeam,
  addSearchPattern,
  assignPatternType,
} from '../../../actions/area';
import { setLoader, removeLoader } from '../../../actions/general';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import drone from '../../../images/drone.png';
import helicopter from '../../../images/helicopter.png';
import fighter from '../../../images/fighter.png';
import axios from 'axios';
import Loader from '../../layout/Loader/Loader';
import { Link } from 'react-router-dom';
const mapStateToProps = (state) => {
  return {
    areaData: state.searchAreaReducer,
    loader: state.generalReducer.loader,
  };
};

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 530,
    maxWidth: '100%',
  },

  formControl: {
    minWidth: 70,
  },

  nativeInput: {
    fontSize: '0.7rem',
  },
  headInput: {
    fontSize: '0.8rem',
    backgroundColor: 'black',
    color: 'white',
  },
});

const SearchPattern = (props) => {
  const classes = useStyles();

  const handleChange = (event, index) => {
    props.assignRescueTeam(index, event.target.value);
  };
  const handleChangePatternType = (event, index) => {
    props.assignPatternType(index, event.target.value);
  };

  const fetchPatterns = () => {
    async function fetchIt() {
      try {
        props.setLoader();
        const data = await axios.post('api/searchPattern', props.areaData);
        props.addSearchPattern(data.data);
        props.removeLoader();
      } catch (err) {
        props.removeLoader();
        console.log(err.message);
      }
    }
    fetchIt();
  };

  if (props.loader === false) {
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
          <Grid item container xs={6} alignItems='center'></Grid>
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
                    <TableCell align='left' className={classes.headInput}>
                      Index
                    </TableCell>
                    <TableCell className={classes.headInput} align='left'>
                      Search Team
                    </TableCell>
                    <TableCell className={classes.headInput} align='left'>
                      Search Pattern
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.areaData.filteredGrid.features.map((row, num) => {
                    return (
                      <TableRow hover key={num + '0'}>
                        <TableCell
                          align='left'
                          key={num + '1'}
                          className={classes.nativeInput}
                        >
                          {num}
                        </TableCell>
                        <TableCell align='left' key={num + '2'}>
                          <FormControl
                            align='left'
                            className={classes.formControl}
                            key={num + '3'}
                          >
                            <Select
                              value={row.rescue_team ? row.rescue_team : ''}
                              onChange={(event) => {
                                handleChange(event, num);
                              }}
                              className={classes.nativeInput}
                              inputProps={{
                                'aria-label': 'select team',
                              }}
                            >
                              <MenuItem
                                value=''
                                className={classes.nativeInput}
                              >
                                <em>None</em>
                              </MenuItem>
                              <MenuItem
                                value={'helicopterA'}
                                className={classes.nativeInput}
                              >
                                Helecopter A
                              </MenuItem>
                              <MenuItem
                                value={'helicopterB'}
                                className={classes.nativeInput}
                              >
                                Helecopter B
                              </MenuItem>
                              <MenuItem
                                value={'drone'}
                                className={classes.nativeInput}
                              >
                                Drone
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align='center' key={num + '3'}>
                          <FormControl
                            align='center'
                            className={classes.formControl}
                            key={num + '3'}
                          >
                            <Select
                              value={row.pattern_type ? row.pattern_type : ''}
                              onChange={(event) => {
                                handleChangePatternType(event, num);
                              }}
                              className={classes.nativeInput}
                              inputProps={{ 'aria-label': 'Pattern Type' }}
                            >
                              <MenuItem
                                value=''
                                className={classes.nativeInput}
                              >
                                <em>None</em>
                              </MenuItem>
                              <MenuItem
                                value={'expanded_square'}
                                className={classes.nativeInput}
                              >
                                Expanded Square
                              </MenuItem>
                              <MenuItem
                                value={'creepy_line'}
                                className={classes.nativeInput}
                              >
                                Creepy Line
                              </MenuItem>
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
                fetchPatterns();
              }}
            >
              Fetch Pattern
            </Button>
            <Link to='./results'>
              <Button variant='contained' color='secondary' size='small'>
                Proceed To Results
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default connect(mapStateToProps, {
  getSearchArea,
  assignRescueTeam,
  addSearchPattern,
  setLoader,
  removeLoader,
  assignPatternType,
})(SearchPattern);
