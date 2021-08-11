import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import Controls from '../services/Controls';
import WarningIcon from '@material-ui/icons/Warning';
import { useAppContext } from '../context';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
  },
  dialogTitle: {
    textAlign: 'center',
  },
  dialogContent: {
    textAlign: 'center',
  },
  dialogAction: {
    justifyContent: 'center',
  },
  titleIcon: {
    color: theme.palette.error.light,
    '&:hover': {
      cursor: 'default',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '8rem',
    },
  },
}));

const AlertPopup = ({ confirmDialog, setConfirmDialog }) => {
  const { alert, dispatch } = useAppContext();
  const classes = useStyles();

  return (
    <Dialog open={alert.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <WarningIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant='h6'>{alert.message}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Controls.Button
          text='OK'
          color='default'
          onClick={() => dispatch({ type: 'CLOSE_ALERT' })}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AlertPopup;
