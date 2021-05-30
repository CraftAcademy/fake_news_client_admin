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
        payload: response.data.articles,
      });
    } catch (error) {
      errorHandler(error);
    }
  },

  async show(id) {
    try {
      let response = await axios.get(`/backyards/${id}`, {
        headers: getFromLocalStorage(),
      });
      return response.data.backyard_article;
    } catch (error) {
      errorHandler(error);
    }
  },

  async setStatus(id, status) {
    let params = { status: status === 'Published' ? 'archived' : 'published' };
    try {
      let response = await axios.put(`/backyards/${id}`, params, {
        headers: getFromLocalStorage(),
      });
      BackyardArticles.index();
      store.dispatch({
        type: 'SUCCESS_MESSAGE',
        payload: response.data.message,
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
