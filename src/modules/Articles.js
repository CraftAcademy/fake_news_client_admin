import axios from 'axios';
import Popup from './Popup';
import store from '../state/store/configureStore';

let headers = getFromLocalStorage();

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
      let response = await axios.post(
        '/articles',
        { params: params },
        { headers: headers }
      );
      Popup.open('SUCCESS_MESSAGE', response.data.message);
      setModalOpen(false);
    } catch (error) {
      errorHandler(error);
    }
  },

  async index() {
    try {
      let response = await axios.get('/articles', { headers: headers });
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
  JSON.parse(localStorage.getItem('userData'));
};

const errorHandler = (error) => {
  if (error.response.status === 500) {
    Popup.open(
      'ERROR_MESSAGE',
      'Something went wrong on our server, try again later'
    );
  } else {
    Popup.open('ERROR_MESSAGE', error.message);
  }
};

export default Articles;
