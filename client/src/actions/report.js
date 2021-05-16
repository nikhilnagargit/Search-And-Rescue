import { GET_REPORTS } from './types';
import {
  SET_CURRENT_AIRCRAFT,
  RESET_HELP_POINTS,
  RESET_ROADS,
  RESET_AREA,
} from './types';
import axios from 'axios';
import { showDialog } from './dialog';
import store from '../store';

// get all the reports of missing aircrafts from database
export const getReports = () => async (dispatch) => {
  // fetch all reports

  try {
    const response = await axios.get('api/reportAircraft');
    const reports_array = response.data;
    console.log(reports_array);

    //   dispatch the action for update the state of reducer
    dispatch({
      type: GET_REPORTS,
      payload: reports_array,
    });
  } catch (err) {
    console.log(err.message);

    dispatch(
      showDialog({
        title: 'Oops! Error from server',
        description: err.message,
        buttontext: 'Ok! Let me check',
        visible: true,
      })
    );
  }
};

// get all the reports of missing aircrafts from database
export const deleteReport = (id) => async (dispatch) => {
  try {
    // delete the report
    const response = await axios.delete('api/reportAircraft/' + id);

    const reponse_message = response.data;
    console.log(reponse_message);

    // also set the current aircraft to blank, if the current aircraft got deleted.
    if (store.getState().aircraftReducer._id === id) {
      // dispatch the action to make the current aircraft blank
      dispatch(setCurrentAircraft({}));
      dispatch(
        showDialog({
          title: 'Current Aircraft Deleted.',
          description:
            'the aircraft you deleted, is removed from the current Aircraft for Search And Rescue Operations. You can choose new one.',
          buttontext: 'Ok! Let me choose',
          visible: true,
        })
      );
    }

    //   dispatch the action for update the state of reducer
    dispatch(getReports());
  } catch (err) {
    console.log(err.message);
    dispatch(
      showDialog({
        title: 'OOPs! Error from server',
        description: err.message,
        buttontext: 'Ok! Let me check',
      })
    );
  }
};

// set the current aircraft
export const setCurrentAircraft = (aircraft) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_AIRCRAFT,
    payload: aircraft,
  });

  dispatch({
    type: RESET_AREA,
    payload: '',
  });

  dispatch({
    type: RESET_HELP_POINTS,
    payload: {
      type: 'FeatureCollection',
      features: [],
    },
  });

  dispatch({
    type: RESET_ROADS,
    payload: {
      type: 'FeatureCollection',
      features: [],
    },
  });

  dispatch(
    showDialog({
      title: 'Missing Aircraft Set for Search and Rescue calculations.',
      description:
        'Now, this aircraft ' +
        aircraft.title +
        ' is the target to search and rescue.',
      buttontext: 'Ok!',
      visible: true,
    })
  );
};
