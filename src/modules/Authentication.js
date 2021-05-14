import store from '../state/store/configureStore';
import axios from 'axios';
import Popup from './Popup';

const Authentication = {
  async signIn(event) {
    let credentials = getFormInput(event);
    try {
      let response = await axios.post('auth/sign_in', credentials );
      saveToLocalStorage(response);
      authenticate();
    } catch (error) {
      errorHandler(error)
    }
  },
  async validateToken() {
    let headers = getFromLocalStorage()
    try {
      let response = await axios.get('auth/validate_token', { headers: headers })
      saveToLocalStorage(response);
      authenticate();
    } catch (error) {
      
    }
  }
};

export default Authentication;

//-----HELPER FUNCTIONS-------

const getFormInput = (event) => {
  return {
    email: event.target.username.value,
    password: event.target.password.value,
    source: 'admin-system',
  };
};

const saveToLocalStorage = (response) => {
  const userCredentials = {
    uid: response.headers['uid'],
    client: response.headers['client'],
    access_token: response.headers['access-token'],
    expiry: response.headers['expiry'],
    token_type: 'Bearer',
  };
  localStorage.setItem('userData', JSON.stringify(userCredentials));
};

const getFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('userData'));
};

const authenticate = () => {
  store.dispatch({ type: 'LOG_IN' });
};

const errorHandler = (error) => {
  if (error.response.status === 401) {
    Popup.open(
      'ERROR_MESSAGE',
      'You are not authorised to do this, contact your system adminstrator'
    );
  } else {
    Popup.open('ERROR_MESSAGE', error.message);
  }
}


