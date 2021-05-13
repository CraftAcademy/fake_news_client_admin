import store from '../state/store/configureStore';

const Credentials = {
  getFormInput(event) {
    return {
      email: event.target.username.value,
      password: event.target.password.value,
      source: 'admin-system' 
    };
  },

  saveToLocalStorage(response) {
    const userCredentials = {
      uid: response.headers['uid'],
      client: response.headers['client'],
      access_token: response.headers['access-token'],
      expiry: response.headers['expiry'],
      token_type: 'Bearer',
    };
    localStorage.setItem('userData', JSON.stringify(userCredentials));
  },

  authenticate() {
    store.dispatch({ type: 'LOG_IN' });
  }
}

export default Credentials
