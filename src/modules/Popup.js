import store from '../state/store/configureStore';

const Popup = {
  open(type, payload) {
    store.dispatch({
      type: type,
      payload: payload,
    });
  },

  close() {
    store.dispatch({ type: 'CLOSE_MESSAGE' });
  },
};

export default Popup;
