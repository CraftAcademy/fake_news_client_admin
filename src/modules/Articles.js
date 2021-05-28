import axios from 'axios';
import store from '../state/store/configureStore';
import errorHandler from './ErrorHandler';

const Articles = {
  async index() {
    try {
      let response = await axios.get('/articles', {
        headers: getFromLocalStorage(),
      });
      if (response.status.articles === []) {
        store.dispatch({
          type: 'SET_ARTICLES',
          payload: [],
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

  async show(id) {
    try {
      let response = await axios.get(`/articles/${id}`, {
        headers: { ...getFromLocalStorage(), source: 'admin-system' },
      });
      return response.data.article;
    } catch (error) {
      errorHandler(error);
    }
  },

  async create(article) {
    let params = { article: article };
    try {
      let response = await axios.post('/articles', params, {
        headers: getFromLocalStorage(),
      });
      Articles.index();
      store.dispatch({
        type: 'SET_SUBMIT',
        payload: { status: true, message: response.data.message },
      });
    } catch (error) {
      errorHandler(error);
    }
  },

  async update(article) {
    let params = { article: article };
    try {
      let response = await axios.put(`/articles/${article.id}`, params, {
        headers: getFromLocalStorage(),
      });
      Articles.index();
      store.dispatch({
        type: 'SET_SUBMIT',
        payload: { status: true, message: response.data.message },
      });
    } catch (error) {
      errorHandler(error);
    }
  },

  async publish(id) {
    let params = { published: true };
    try {
      let response = await axios.put(`/articles/${id}`, params, {
        headers: getFromLocalStorage(),
      });
      Articles.index();
      store.dispatch({
        type: 'SUCCESS_MESSAGE',
        payload: response.data.message,
      });
    } catch (error) {
      errorHandler(error);
    }
  },
};

//-----HELPER FUNCTIONS-----

const getFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('userData'));
};

export const imageEncoder = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default Articles;
