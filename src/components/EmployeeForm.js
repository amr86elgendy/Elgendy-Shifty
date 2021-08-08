import React, { useEffect, useState } from 'react';
import Controls from '../services/Controls';
import { Grid, makeStyles } from '@material-ui/core';
import * as employeeService from '../data';
import { useAppContext } from '../context';
import { v4 as uuidv4 } from 'uuid';

const initialFValues = {
  id: uuidv4(),
  fullName: '',
  email: '',
  mobile: '',
  gender: 'male',
  department: '',
  // hireDate: new Date(),
  isPermanent: false,
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
}));

const EmployeeForm = () => {
  const classes = useStyles();
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});
  const { dispatch, employerEdited } = useAppContext();

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === 'isPermanent') {
      value = e.target.checked;
    }

    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  const validate = (obj) => {
    let temp = {};

    temp.fullName = obj.fullName ? '' : 'This field is required.';
    temp.email = obj.email
      ? /$^|.+@.+..+/.test(obj.email)
        ? ''
        : 'Email is not valid.'
      : 'This field is required.';
    temp.mobile = obj.mobile.length > 9 ? '' : 'Minimum 10 numbers required.';
    temp.department =
      obj.department.length !== 0 ? '' : 'This field is required.';
      
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employerEdited) {
      if (validate(values)) {
        console.log('edit');
        dispatch({ type: 'SET_EMPLOYERS_AFTER_EDIT', payload: values });
        resetForm();
        dispatch({ type: 'TOGGLE_POPUP' });
      }
    } else {
      if (validate(values)) {
        dispatch({ type: 'ADD_NEW_EMPLOYER', payload: values });
        resetForm();
        dispatch({ type: 'TOGGLE_POPUP' });
      }
    }
  };

  useEffect(() => {
    if (employerEdited) {
      setValues(employerEdited);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className={classes.root} autoComplete='off' onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name='fullName'
            label='Full Name'
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Controls.Input
            label='Email'
            name='email'
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            label='Mobile'
            name='mobile'
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name='gender'
            label='Gender'
            value={values.gender}
            onChange={handleInputChange}
            items={employeeService.genderItems}
          />
          <Controls.Select
            name='department'
            label='Department'
            value={values.department}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection()}
            error={errors.department}
          />
          {/* <Controls.DatePicker
            name='hireDate'
            label='Hire Date'
            value={values.hireDate}
            onChange={handleInputChange}
          /> */}
          <Controls.Checkbox
            name='isPermanent'
            label='Permanent Employee'
            value={values.isPermanent}
            onChange={handleInputChange}
          />
          <div>
            <Controls.Button type='submit' text={employerEdited ? 'Edit' : 'Submit'} />
            <Controls.Button text='Reset' color='default' onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default EmployeeForm;
