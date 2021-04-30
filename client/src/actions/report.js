import { GET_REPORTS } from './types';
import axios from 'axios';

// get all the reports of missing aircrafts from database
export const getReports = () => async (dispatch) => {
  // fetch all reports
  const response = await axios.get('api/reportAircraft');

  const reports_array = response.data;
  console.log(reports_array);

  //   dispatch the action for update the state of reducer
  dispatch({
    type: GET_REPORTS,
    payload: reports_array,
  });
};
