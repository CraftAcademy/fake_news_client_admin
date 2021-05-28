import axios from 'axios';
import store from '../state/store/configureStore';
import errorHandler from './ErrorHandler';

const BackyardArticles = {
  async index() {
    try {
      let response = await axios.get('/backyards', {
        headers: getFromLocalStorage(),
      });
      store.dispatch({
        type: 'SET_BACKYARD_ARTICLES',
        payload: response.data.backyard_articles,
      });
    } catch (error) {
      errorHandler(error);
    }
  },
};

export default BackyardArticles;

//-----HELPER FUNCTIONS-----

const getFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('userData'));
};
