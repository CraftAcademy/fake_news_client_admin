import axios from 'axios';
import Popup from './Popup';
import store from '../state/store/configureStore';
import errorHandler from './ErrorHandler'

const Articles = {
  async create(event, category, setModalOpen) {
    let params = {
      article: {
        title: event.target.title.value,
        teaser: event.target.teaser.value,
        body: event.target.body.value,
        category: category,
      },
    };
    try {
      let response = await axios.post('/articles', params, {
        headers: getFromLocalStorage(),
      });
      setModalOpen(false);
      Popup.open('SUCCESS_MESSAGE', response.data.message);
    } catch (error) {
      errorHandler(error);
    }
  },

  async index() {
    try {
      let response = await axios.get('/articles', {
        headers: getFromLocalStorage(),
      });
      if (response.status === 204) {
        store.dispatch({
          type: 'SET_ARTICLES',
          payload: "You don't have any articles yet",
        });
      } else {
        store.dispatch({
          type: 'SET_ARTICLES',
          payload: response.data.articles,
        });
      }
    } catch (error) {
      errorHandler(error);
    }
  },
};

const getFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('userData'));
};

export default Articles;
