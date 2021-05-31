import store from '../state/store/configureStore';
import axios from 'axios';
import errorHandler from './ErrorHandler';

const Authentication = {
  async signIn(event, setLoading) {
    let credentials = getFormInput(event);
    try {
      let response = await axios.post('/auth/sign_in', credentials);
      saveToLocalStorage(response);
      authenticate(response.data.data);
    } catch (error) {
      errorHandler(error);
    }
    setLoading(false);
  },
  async validateToken() {
    try {
      let response = await axios.get('/auth/validate_token', {
        headers: getFromLocalStorage(),
      });
      saveToLocalStorage(response);
      authenticate(response.data.data);
    } catch (error) {}
  },
  async signOut() {
    try {
      await axios.delete('/auth/sign_out', {
        headers: getFromLocalStorage(),
      });
      localStorage.removeItem('userData');
      store.dispatch({ type: 'LOG_OUT', payload: 'You have been logged out' });
    } catch (error) {}
  },

  async registerJournalist(event, setLoading) {
    let credentials = getRegistrationInput(event);
    try {
      let response = await axios.post('/auth', credentials, {
        headers: getFromLocalStorage(),
      });
      store.dispatch({
        type: 'SUCCESS_MESSAGE',
        payload: `${response.data.data.first_name} ${response.data.data.last_name} has successfully been registered as a new journalist`,
      });
      event.target.reset();
    } catch (error) {
      errorHandler(error);
    }
    setLoading(false);
  },
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

const getRegistrationInput = (event) => {
  return {
    first_name: event.target.firstName.value,
    last_name: event.target.lastName.value,
    email: event.target.email.value,
    password: event.target.password.value,
    password_confirmation: event.target.passwordConfirmation.value,
    role: 'journalist',
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

const authenticate = (data) => {
  let fullName = `${data.first_name} ${data.last_name}`;
  let role = data.role;
  store.dispatch({ type: 'LOG_IN', payload: { fullName, role } });
};
