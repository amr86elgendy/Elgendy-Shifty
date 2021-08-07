import React, { useState } from 'react';
import Controls from '../services/Controls';
import { Grid, makeStyles } from '@material-ui/core';
import * as employeeService from '../data';

const initialFValues = {
  id: 0,
  fullName: '',
  email: '',
  mobile: '',
  gender: 'male',
  departmentId: '',
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

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === 'isPermanent') {
      value = e.target.checked;
    }
console.log(name, value);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  // console.log(values);
  return (
    <form className={classes.root} autoComplete='off'>
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
            name='departmentId'
            label='Department'
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection()}
            error={errors.departmentId}
          />
          <Controls.DatePicker
            name='hireDate'
            label='Hire Date'
            value={values.hireDate}
            onChange={handleInputChange}
          />
          <Controls.Checkbox
            name='isPermanent'
            label='Permanent Employee'
            value={values.isPermanent}
            onChange={handleInputChange}
          />
          <div>
            <Controls.Button type='submit' text='Submit' />
            <Controls.Button text='Reset' color='default' onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default EmployeeForm;
