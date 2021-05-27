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
      case 'STRIPE_ERROR':
        return {
          ...state,
          error: true,
          message: action.payload.message,
          popupOpen: true,
          statistics: action.payload.statistics
        }
    case 'CLOSE_MESSAGE':
      return {
        ...state,
        popupOpen: false,
        error: false,
      };
    case 'LOG_IN':
      return {
        ...state,
        authenticated: true,
        fullName: action.payload.fullName,
        role: action.payload.role,
      };
    case 'LOG_OUT':
      return {
        ...state,
        authenticated: false,
        message: action.payload,
        popupOpen: true,
      };
    case 'SET_ARTICLES':
      return {
        ...state,
        articles: action.payload,
      };
      case 'SET_STATISTICS':
        return {
          ...state,
          statistics: action.payload,
        };
    case 'SET_SUBMIT':
      return {
        ...state,
        submitted: action.payload.status,
        message: action.payload.message,
      };
    case 'PUBLISH_ARTICLE':
      return {
        ...state,
        published: true,
      };
    default:
      return state;
  }
};

export default rootReducer;
