import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  TablePagination,
  IconButton,
} from '@material-ui/core';
import { useAppContext } from '../context';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Popup from './Popup';
import EmployeeForm from './EmployeeForm';
import TableHeader from './TableHeader';
import SearchAndAdd from './SearchAndAdd';

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
}));

export default function BasicTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [activeEmp, setActiveEmp] = useState(0);
  const { dispatch, filteredEmployers, openPopup } =
    useAppContext();
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
      <SearchAndAdd />
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableHeader />
          </TableHead>
          <TableBody>
            {dividEmp(filteredEmployers).map((emp, idx) => (
              <TableRow
                key={emp.id}
                selected={activeEmp === idx ? true : false}
                onClick={() => setActiveEmp(idx)}
                hover
              >
                <TableCell>
                  {emp.fullName} <br /> {emp.department}
                </TableCell>
                <TableCell align='center'>{emp.email}</TableCell>
                <TableCell align='center'>{emp.mobile}</TableCell>
                <TableCell align='center'>{emp.department}</TableCell>
                <TableCell align='right'>
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
        count={filteredEmployers.length}
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
