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
        payload: response.data.statistics
      })
      
    } catch (error) {
      errorHandler(error);
    }
  },
};

const getFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('userData'));
};
