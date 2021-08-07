import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import SwapVertIcon from '@material-ui/icons/SwapVert';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useAppContext } from '../context';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable() {
  const { dispatch, employers } = useAppContext()
  const classes = useStyles();
console.log(employers);
  return (
    <main className='main-content'>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Button
                  endIcon={<SwapVertIcon fontSize='large' color='action' />}
                >
                  Name
                </Button>
              </TableCell>
              <TableCell align='center'>
                <Button
                  startIcon={<RemoveIcon className='icon' color='error' />}
                  endIcon={<AddIcon className='icon' color='primary' />}
                >
                  Early Bird
                </Button>
              </TableCell>
              <TableCell align='center'>
                <Button
                  startIcon={<RemoveIcon className='icon' color='error' />}
                  endIcon={<AddIcon className='icon' color='primary' />}
                >
                  Night Bird
                </Button>
              </TableCell>
              <TableCell align='center'>
                <Button
                  startIcon={<RemoveIcon className='icon' color='error' />}
                  endIcon={<AddIcon className='icon' color='primary' />}
                >
                  W F H
                </Button>
              </TableCell>
              <TableCell align='right'>
                <Button>action</Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employers.map((emp) => (
              <TableRow key={emp.email}>
                <TableCell component='th' scope='row'>
                  {emp.fullName}
                </TableCell>
                <TableCell align='center'></TableCell>
                <TableCell align='center'></TableCell>
                <TableCell align='center'></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant='contained'
        color='primary'
        endIcon={<PersonAddIcon />}
        onClick={() => dispatch({ type: 'TOGGLE_MODAL_FORM' })}
      >
        new employer
      </Button>
    </main>
  );
}
