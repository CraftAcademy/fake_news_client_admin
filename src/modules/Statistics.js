import axios from 'axios';
import errorHandler from './ErrorHandler';
import store from '../state/store/configureStore';

const Statistics = {
  async index() {
    try {
      let response = await axios.get('/statistics', {
        headers: getFromLocalStorage(),
      });
      store.dispatch({
        type: 'SET_STATISTICS',
        payload: response.data.statistics,
      });
    } catch (error) {
      if (error.response.data.stripe_error) {
        store.dispatch({
          type: 'STRIPE_ERROR',
          payload:{ message: 'Stripe servers are currently not responding, please try again later', statistics: error.response.data.statistics}
            
        });
      } else {
        errorHandler(error);
      }
    }
  },
};

export default Statistics;

const getFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('userData'));
};
