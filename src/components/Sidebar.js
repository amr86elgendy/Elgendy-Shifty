import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useAppContext } from '../context';
import { Paper, Typography } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const drawerWidth = 370;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  paper: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1rem auto',
  },
  picker: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
}));

const Sidebar = () => {
  const classes = useStyles();

  const { dispatch, displayedDate, sidebarOpen } = useAppContext();
  const day = displayedDate.split(' ')[2];
  const month = new Date(displayedDate).toLocaleDateString().split('/')[0];

  return (
    <Drawer
      className={classes.drawer}
      variant='temporary'
      anchor='right'
      open={sidebarOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}>
          <CloseIcon />
        </IconButton>
      </div>
      <Paper className={classes.paper}>
        <Typography variant='h2' color='primary'>
          {`${day} / ${month}`}
        </Typography>
        <Typography variant='h5' color='primary'>
          {displayedDate.split(' ')[0]}
        </Typography>
      </Paper>
      <div className={classes.picker}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant='static'
            inputVariant='outlined'
            label='Displayed Date'
            format='MMM/dd/yyyy'
            value={displayedDate}
            onChange={(date) =>
              dispatch({
                type: 'SET_DISPLAYED_DATE',
                payload: date.toDateString(),
              })
            }
          />
        </MuiPickersUtilsProvider>
      </div>
    </Drawer>
  );
};

export default Sidebar;
