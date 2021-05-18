import axios from 'axios';
import Popup from './Popup';
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
        headers: getFromLocalStorage(),
      });
      return response.data.article;
    } catch (error) {
      errorHandler(error);
    }
  },
  
  async create(article, setModalOpen) {
    let params = { article: article };
    try {
      let response = await axios.post('/articles', params, {
        headers: getFromLocalStorage(),
      });
      Articles.index();
      setModalOpen(false);
      Popup.open('SUCCESS_MESSAGE', response.data.message);
    } catch (error) {
      errorHandler(error);
    }
  },
  
  async update(article, setModalOpen) {
    let params = { article: article };
    try {
      let response = await axios.put(`/articles/${article.id}`, params, {
        headers: getFromLocalStorage(),
      });
      Articles.index();
      Popup.open('SUCCESS_MESSAGE', response.data.message);
      setModalOpen(false);
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
