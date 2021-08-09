import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableHead,
  Paper,
  TableContainer,
  TablePagination,
} from "@material-ui/core";
import { useAppContext } from "../context";
import Popup from "./Popup";
import EmployeeForm from "./EmployeeForm";
import TableHeader from "./TableHeader";
import SearchAndAdd from "./SearchAndAdd";
import EmployerItem from "./EmployerItem";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 750,
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.background.default,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      cursor: "pointer",
    },
    "& tbody tr$selected": {
      backgroundColor: theme.palette.background.default,
      cursor: "pointer",
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
  const { filteredEmployers, openPopup } = useAppContext();
  const classes = useStyles();

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
              <EmployerItem
                key={emp.id}
                {...emp}
                idx={idx}
                
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* -----------------------START PAGINATION--------------------- */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredEmployers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/*  ------------------------START POPUP------------------------ */}
      <Popup title="Employee Form" openPopup={openPopup}>
        <EmployeeForm />
      </Popup>
    </Paper>
  );
}
