import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { hideDialog } from './../../../actions/dialog';

const mapDispatchToProps = (dispatch) => {
  return {
    hideDialog: () => dispatch(hideDialog()),
  };
};

const mapStateToProps = (state) => {
  return {
    title: state.dialogReducer.title,
    description: state.dialogReducer.description,
    buttontext: state.dialogReducer.buttontext,
    visible: state.dialogReducer.visible,
  };
};

const DialogAlert = (props) => {
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  return (
    <div>
      {/* <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={props.visible}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => props.hideDialog()}
          >
            {props.buttontext}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogAlert);
