import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableHead,
  Paper,
  TableContainer,
} from '@material-ui/core';
import { useAppContext } from '../context';
import Popup from './FormPopup';
import EmployeeForm from './EmployeeForm';
import TableHeader from './TableHeader';
import SearchAndAdd from './SearchAndAdd';
import EmployerItem from './EmployerItem';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 900,
    marginTop: theme.spacing(3),
    '& thead th button span': {
      fontWeight: '600',
      color: theme.palette.primary.main,
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& .Mui-selected, .Mui-selected:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

export default function BasicTable() {
  const { filteredEmployers, openForm } =
    useAppContext();
  const classes = useStyles();

  return (
    <Paper className={classes.pageContent}>
      <SearchAndAdd />
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableHeader />
          </TableHead>
          <TableBody>
            {filteredEmployers.map((emp, idx) => (
              <EmployerItem key={emp.id} {...emp} idx={idx} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/*  ------------------------START POPUP------------------------ */}
      <Popup title='Employee Form' openForm={openForm}>
        <EmployeeForm />
      </Popup>
    </Paper>
  );
}
