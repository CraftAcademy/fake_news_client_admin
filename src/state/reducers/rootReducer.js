const rootReducer = (state, action) => {
	switch (action.type) {
		case 'SUCCESS_MESSAGE':
			return {
				...state,
				message: action.payload,
				successOpen: true,
			};
		case 'CLOSE_MESSAGE':
			return {
				...state,
				successOpen: false,
				errorOpen: false,
			};
		case 'ERROR_MESSAGE':
			return {
				...state,
				message: action.payload,
				errorOpen: true,
			};

		default:
			return state;
	}
};

export default rootReducer;
