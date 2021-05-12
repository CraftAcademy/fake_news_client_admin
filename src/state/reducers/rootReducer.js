
const rootReducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS_MESSAGE':
      return {
        ...state, 
        message: action.payload
      }
      
  
    default:
      break;
  }
  return state;
};

export default rootReducer;
