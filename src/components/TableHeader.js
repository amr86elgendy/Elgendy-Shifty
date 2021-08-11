import { Button, TableCell, TableRow } from '@material-ui/core';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useAppContext } from '../context';
import { checkDayOutOfBird, checkDayOutOfNumber } from '../functions';

const TableHeader = () => {
  const {
    activeEmp,
    displayedDate,
    dispatch,
    employers,
    filteredEmployers,
    thisMonth,
  } = useAppContext();

  // Function Add Day
  function addDay(bird, otherBird) {
    if (filteredEmployers.length === 0) {
      dispatch({
        type: 'OPEN_ALERT',
        payload: {
          isOpen: true,
          message: 'There is no employers, Please add an employer!',
        },
      });
      return;
    }
    if (!thisMonth) {
      dispatch({
        type: 'OPEN_ALERT',
        payload: {
          isOpen: true,
          message: 'This is another Month',
        },
      });
      return;
    }
    if (displayedDate.startsWith('Fri')) {
      dispatch({
        type: 'OPEN_ALERT',
        payload: {
          isOpen: true,
          message: 'Sorry This Day is Friday',
        },
      });
      return;
    }
    if (
      checkDayOutOfBird(filteredEmployers, activeEmp, displayedDate, otherBird)
    ) {
      dispatch({
        type: 'OPEN_ALERT',
        payload: {
          isOpen: true,
          message: 'This Employer has this day in another Bird',
        },
      });
      return;
    }
    if (checkDayOutOfNumber(filteredEmployers, displayedDate, bird) >= 4) {
      dispatch({
        type: 'OPEN_ALERT',
        payload: {
          isOpen: true,
          message: 'This Day is full of employers in this bird',
        },
      });
      return;
    }
    const existed = filteredEmployers[activeEmp][bird].find(
      (day) => day === displayedDate
    );
    if (existed) {
      dispatch({
        type: 'OPEN_ALERT',
        payload: {
          isOpen: true,
          message: 'This Day is already existed',
        },
      });
      return;
    }
    if (bird === 'whf') {
      if (filteredEmployers[activeEmp][bird].length === 3) {
        dispatch({
          type: 'OPEN_ALERT',
          payload: {
            isOpen: true,
            message: 'This Employer has 3 days(max) Working From Home',
          },
        });
        return;
      }
    }
    if (filteredEmployers[activeEmp][bird].length === 6) {
      dispatch({
        type: 'OPEN_ALERT',
        payload: {
          isOpen: true,
          message: 'This Employer has 6 days(Max) in this bird',
        },
      });
      return;
    }

    let updatedEmp = filteredEmployers[activeEmp];
    updatedEmp[bird] = [...updatedEmp[bird], displayedDate].sort(
      (a, b) => a.split(' ')[2] - b.split(' ')[2]
    );

    const newEmployers = employers.map((emp) =>
      emp.id === updatedEmp.id ? updatedEmp : emp
    );

    dispatch({ type: 'SET_EMPLOYERS', payload: newEmployers });
  }

  // Function Remove Day
  function removeDay(bird) {
    if (filteredEmployers.length === 0) {
      alert('There is no employers, Please add an employer!');
      return;
    }
    const updateEmployers = filteredEmployers.map((emp, index) =>
      index === activeEmp
        ? { ...emp, [bird]: emp[bird].slice(0, emp[bird].length - 1) }
        : emp
    );

    dispatch({ type: 'SET_EMPLOYERS', payload: updateEmployers });
  }

  return (
    <TableRow>
      <TableCell>
        <Button endIcon={<SwapVertIcon color='action' />}>name</Button>
      </TableCell>
      <TableCell align='center'>
        <Button
          startIcon={
            <RemoveIcon
              className='icon'
              color='error'
              onClick={() => removeDay('early')}
            />
          }
          endIcon={
            <AddIcon
              className='icon'
              color='primary'
              onClick={() => addDay('early', ['night', 'whf'])}
            />
          }
        >
          Early Bird
        </Button>
      </TableCell>
      <TableCell align='center'>
        <Button
          startIcon={
            <RemoveIcon
              className='icon'
              color='error'
              onClick={() => removeDay('night')}
            />
          }
          endIcon={
            <AddIcon
              className='icon'
              color='primary'
              onClick={() => addDay('night', ['early', 'whf'])}
            />
          }
        >
          Night Bird
        </Button>
      </TableCell>
      <TableCell align='center'>
        <Button
          startIcon={
            <RemoveIcon
              className='icon'
              color='error'
              onClick={() => removeDay('whf')}
            />
          }
          endIcon={
            <AddIcon
              className='icon'
              color='primary'
              onClick={() => addDay('whf', ['early', 'night'])}
            />
          }
        >
          W F H
        </Button>
      </TableCell>
      <TableCell align='right'>
        <Button>action</Button>
      </TableCell>
    </TableRow>
  );
};

export default TableHeader;
