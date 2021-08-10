import { Button, TableCell, TableRow } from '@material-ui/core';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useAppContext } from '../context';
import { checkDayOutOfBird, checkDayOutOfNumber } from '../functions';

const TableHeader = () => {
  const { activeEmp, displayedDate, dispatch, employers, thisMonth } =
    useAppContext();

  function addDay(bird, otherBird) {
    if (employers.length === 0) {
      alert('There is no employers, Please add an employer!');
      return;
    }
    if (!thisMonth) {
      alert('this is another Month');
      return;
    }
    if (displayedDate.startsWith('Fri')) {
      alert('Sorry This Day is Friday');
      return;
    }
    if (checkDayOutOfBird(employers, activeEmp, displayedDate, otherBird)) {
      alert('This Employer has this day in another Bird');
      return;
    }
    if (checkDayOutOfNumber(employers, displayedDate, bird) >= 4) {
      alert('This Day is full of employers in this bird');
      return;
    }
    const existed = employers[activeEmp][bird].find(
      (day) => day === displayedDate
    );
    if (existed) {
      alert('This Day is already existed');
      return;
    }
    if (bird === 'whf') {
      if (employers[activeEmp][bird].length === 3) {
        alert('This Employer has 3 days Working From Home');
        return;
      }
    }
    if (employers[activeEmp][bird].length === 6) {
      alert('This Employer has 6 days(Max) in this bird');
      return;
    }
    const updateEmployers = employers.map((emp, index) =>
      index === activeEmp
        ? {
            ...emp,
            [bird]: [...emp[bird], displayedDate].sort(
              (a, b) => a.split(' ')[2] - b.split(' ')[2]
            ),
          }
        : emp
    );
    dispatch({ type: 'SET_EMPLOYERS', payload: updateEmployers });
  }

  // Function Remove Day
  function removeDay(bird) {
    if (employers.length === 0) {
      alert('There is no employers, Please add an employer!');
      return;
    }
    const updateEmployers = employers.map((emp, index) =>
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
