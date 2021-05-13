const rootReducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS_MESSAGE':
      return {
        ...state,
				error: false,
        message: action.payload,
        popupOpen: true,
      };
    case 'ERROR_MESSAGE':
      return {
        ...state,
				error: true,
        message: action.payload,        
        popupOpen: true,
      };
    case 'CLOSE_MESSAGE':
      return {
        ...state,
        popupOpen: false,
      };
    default:
      return state;
  }
};

export default rootReducer;
