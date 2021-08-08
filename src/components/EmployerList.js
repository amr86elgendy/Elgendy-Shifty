import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Toolbar,
  InputAdornment,
  TableContainer,
  TablePagination,
  IconButton,
} from '@material-ui/core';
import Controls from '../services/Controls';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useAppContext } from '../context';
import { Search } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Popup from './Popup';
import EmployeeForm from './EmployeeForm';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 750,
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.background.default,
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: theme.palette.background.default,
      cursor: 'pointer',
    },
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: '75%',
  },
  newButton: {
    position: 'absolute',
    right: '10px',
  },
}));

export default function BasicTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { dispatch, employers, openPopup } = useAppContext();
  const classes = useStyles();

  const handleEdit = (id) => {
    dispatch({ type: 'TOGGLE_POPUP' });
    dispatch({ type: 'SET_EMPLOYER_TO_EDIT', payload: id });
  };

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_EMPLOYER', payload: id });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dividEmp = (arr) => {
    return arr.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return (
    <Paper className={classes.pageContent}>
      <Toolbar>
        <Controls.Input
          label='Search Employees'
          className={classes.searchInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
          }}
          // onChange={handleSearch}
        />
        <Controls.Button
          text='Add New'
          // text='new employer'
          variant='outlined'
          startIcon={<AddIcon />}
          // endIcon={<PersonAddIcon />}
          className={classes.newButton}
          onClick={() => dispatch({ type: 'TOGGLE_POPUP' })}
        />
      </Toolbar>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Button endIcon={<SwapVertIcon color='action' />}>name</Button>
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
            {dividEmp(employers).map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>
                  {emp.fullName} <br /> {emp.department}
                </TableCell>
                <TableCell align='center'>{emp.email}</TableCell>
                <TableCell align='center'>{emp.mobile}</TableCell>
                <TableCell align='center'>{emp.department}</TableCell>
                <TableCell align='right'>
                  {/* <Controls.ActionButton
                    color='primary'
                    onClick={() => handleEdit(emp.id)}
                  >
                    <EditIcon fontSize='small' />
                  </Controls.ActionButton> */}
                  {/* <Controls.ActionButton
                    color='secondary'
                    onClick={() => handleRemove(emp.id)}
                  >
                    <CloseIcon fontSize='small' />
                  </Controls.ActionButton> */}
                  <IconButton onClick={() => handleEdit(emp.id)}>
                    <EditIcon fontSize='small' color='primary' />
                  </IconButton>
                  <IconButton onClick={() => handleRemove(emp.id)}>
                    <CloseIcon fontSize='small' color='secondary' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* -----------------------START PAGINATION--------------------- */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={employers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/*  ------------------------START POPUP------------------------ */}
      <Popup title='Employee Form' openPopup={openPopup}>
        <EmployeeForm />
      </Popup>
    </Paper>
  );
}
