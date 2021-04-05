import * as actions from './constants';
import API from '../../API/API';

export const fetchEmployees = () => async (dispatch) => {
	try {
		dispatch({ type: actions.FETCH_EMPLOYEES_BEGIN });
		const { data } = await API.get('/employees');
		dispatch({ type: actions.FETCH_EMPLOYEES_SUCCESS, payload: data.data });
	} catch (e) {
		dispatch({
			type: actions.FETCH_EMPLOYEES_FAILURE,
			payload: e.message,
		});
	}
};

export const deleteEmployee = (id) => async (dispatch) => {
	try {
		dispatch({type: actions.DELETE_EMPLOYEE_BEGIN});
		const { data: deletedData } = await API.delete(`/delete/${id}`);
        dispatch(fetchEmployees());
		dispatch({type: actions.DELETE_EMPLOYEE_SUCCESS, payload: deletedData});
	}catch(e){
		dispatch({
			type: actions.DELETE_EMPLOYEE_FAILURE,
			payload: e.message,
		});
	}
};