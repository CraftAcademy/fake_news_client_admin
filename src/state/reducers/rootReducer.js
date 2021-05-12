const rootReducer = (state, action) => {
	switch (action.type) {
		case 'SUCCESS_MESSAGE':
			return {
				...state,
				message: action.payload,
				popupOpen: true,
			};

    case 'CLOSE_MESSAGE': 
    return {
      ...state,
      popupOpen: false
    }

		default:
			return state;
	}
};

export default rootReducer;
