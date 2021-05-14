import axios from 'axios';
import Popup from './Popup';

const Articles = {
  async create(event, category, setModalOpen) {
    let headers = getFromLocalStorage()
    let params = {
      article: {
        title: event.target.title.value,
        teaser: event.target.teaser.value,
        body: event.target.body.value,
        category: category,
      },
    }
    try {
      let response = await axios.post('/articles', { params: params }, { headers: headers });
      Popup.open('SUCCESS_MESSAGE', response.data.message);
      setModalOpen(false);
    } catch (error) {
      errorHandler(error)
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
    )
  } else {
    Popup.open('ERROR_MESSAGE', error.message);
  }
}

export default Articles;