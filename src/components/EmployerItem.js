import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { useAppContext } from '../context';
import { useRef } from 'react';

const useStyle = makeStyles((theme) => ({
  rowSelected: {
    backgroundColor: theme.palette.background.default,
  },
  rowHover: {
    cursor: 'pointer',
  },
}));
const EmployerItem = ({ department, early, fullName, id, night, idx, whf }) => {
  const { activeEmp, dispatch } = useAppContext();
  const actionRef = useRef();
  const classes = useStyle();
  
  const handleEdit = (id) => {
    dispatch({ type: 'TOGGLE_FORM_POPUP' });
    dispatch({ type: 'SET_EMPLOYER_TO_EDIT', payload: id });
  };

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_EMPLOYER', payload: id });
  };

  const handleSetActiveEmp = (e) => {
    dispatch({ type: 'SET_ACTIVE_EMP', payload: idx });
  };

  return (
    <TableRow
      key={id}
      selected={activeEmp === idx}
      onClick={handleSetActiveEmp}
      classes={{ selected: classes.rowSelected, hover: classes.rowHover }}
      hover
    >
      <TableCell>
        {fullName} <br /> {department}
      </TableCell>
      <TableCell align='center'>
        {early.map((day, index) => (
          <div className='day' key={index}>
            <span className={day.startsWith('Sat') ? 'sat' : ''}>
              {day.split(' ')[2]}
            </span>
            <span>{day.split(' ')[0].slice(0, 2)}</span>
          </div>
        ))}
      </TableCell>
      <TableCell align='center'>
        {night.map((day, index) => (
          <div className='day' key={index}>
            <span className={day.startsWith('Sat') ? 'sat' : ''}>
              {day.split(' ')[2]}
            </span>
            <span>{day.split(' ')[0].slice(0, 2)}</span>
          </div>
        ))}
      </TableCell>
      <TableCell align='center'>
        {whf.map((day, index) => (
          <div className='day' key={index}>
            <span className={day.startsWith('Sat') ? 'sat' : ''}>
              {day.split(' ')[2]}
            </span>
            <span>{day.split(' ')[0].slice(0, 2)}</span>
          </div>
        ))}
      </TableCell>
      <TableCell align='right' ref={actionRef}>
        <IconButton onClick={() => handleEdit(id)}>
          <EditIcon fontSize='small' color='primary' />
        </IconButton>
        <IconButton onClick={() => handleRemove(id)}>
          <CloseIcon fontSize='small' color='secondary' />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default EmployerItem;
