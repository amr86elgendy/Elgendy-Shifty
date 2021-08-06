import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Sidebar from './Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  userIcon: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton className={classes.userIcon} color='inherit'>
            <GroupAddIcon fontSize='large' />
          </IconButton>
          <Typography variant='h4' className={classes.title}>
            SHIFTY
          </Typography>
          <IconButton className={classes.menuButton} color='inherit'>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
