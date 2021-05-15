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
    case 'LOG_IN':
      return {
        ...state,
        authenticated: true,
        fullName: action.payload
      };
    case 'SET_ARTICLES':
      return {
        ...state,
        articles: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
