import { createSelector } from 'reselect';

const getEmployees = (state) => state.employees.data;

export const selectVisibleEmployees = createSelector(getEmployees, (employees) => {
	return employees.filter((emp) => {
		const salary = emp.employee_salary;
		const age = emp.employee_age;
		return ((salary>200000 && age>30) ? true : false);
	})
});
