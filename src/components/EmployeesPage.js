import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Typography,
    AppBar,
    CssBaseline,
    Grid,
    Toolbar,
    Container,
    Button
  } from "@material-ui/core";
import useStyles from '../styles/styles';
import EmployeeCard from './EmployeeCard';
import { fetchEmployees, deleteEmployee } from '../store/actions/employees';
import { selectVisibleEmployees } from '../store/selectors/employees';
import loader from "../assets/loader.gif";
import * as actionTypes from '../store/actions/constants';

const EmployeesPage = () => {
	const filteredEmployees = useSelector(selectVisibleEmployees);
    const isLoading = useSelector(state => state.employees.isLoading);
    const employees = useSelector(state => state.employees.data);
	const dispatch = useDispatch();
    
    const classes = useStyles();
    
    useEffect(() => {
        dispatch(fetchEmployees());
    }, []);
    
    console.log({filteredEmployees, employees});
    return (
        <>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6">Employees</Typography>
          </Toolbar>
        </AppBar>
        <main>
            {
                isLoading && (<img src={loader}/>)
            }
            {
                employees && 
                (<Container className={classes.cardGrid} maxWidth="md">
                    <div className={classes.buttons}>
                        <Button 
                            variant="contained"
                            color="primary"
                            onClick={() => dispatch({type: actionTypes.FILTER_EMPLOYEES, payload: filteredEmployees})}
                        >
                            Filter
                        </Button>
                        <h3>Total employees: {employees.length}</h3>
                    </div>
                    <Grid container spacing={4}>
                    {
                        employees.map((emp) => (<EmployeeCard 
                            key={emp.id} 
                            id={emp.id}
                            name={emp.employee_name} 
                            salary={emp.employee_salary} 
                            age={emp.employee_age} 
                            img={emp.profile_image}
                            onDelete={id => dispatch(deleteEmployee(id))}
                        />))
                    }
                    </Grid>
                </Container>)
            }
        </main>
      </>
    )
}

export default EmployeesPage;