import { SHOW_DIALOG } from './types';

export const showDialog = (payload) => (dispatch) => {
  dispatch({
    type: SHOW_DIALOG,
    payload: {
      description: payload.description,
      buttontext: payload.buttontext,
      title: payload.title,
      visible: true,
    },
  });
};

export const hideDialog = () => (dispatch) => {
  dispatch({
    type: SHOW_DIALOG,
    payload: { buttontext: '', text: '', description: '', visible: false },
  });
};
