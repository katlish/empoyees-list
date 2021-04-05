import * as actionTypes from '../actions/constants';

const initialState = {
	isLoading: true,
	error: null,
	data: [],
	isFiltered: false
};

export default function employees(state = initialState, action) {
	switch (action.type) {
		case actionTypes.FETCH_EMPLOYEES_BEGIN:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.FETCH_EMPLOYEES_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload,
			};
		case actionTypes.FETCH_EMPLOYEES_FAILURE: {
			return {
				...state,
				isLoading: false,
			};
		}
		case actionTypes.DELETE_EMPLOYEE_BEGIN: {
			return {
				...state,
				isLoading: true
			};
		}
		case actionTypes.DELETE_EMPLOYEE_SUCCESS: {
			return {
				...state,
				isLoading: false,
				error: action.payload
			};
		}
		case actionTypes.DELETE_EMPLOYEE_FAILURE: {
			return {
				...state,
				isLoading: false,
				error: action.payload
			};
		}
		case actionTypes.RESET_ERROR:
			return {
				...state,
				error: null
			};
		case actionTypes.FILTER_EMPLOYEES:
			return {
				...state,
				isFiltered: true,
				data: action.payload,
			};
		default:
			return state;
	}
}
