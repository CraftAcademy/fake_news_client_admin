import store from '../state/store/configureStore';

export const popupOpen = (type, payload) => {
  store.dispatch({
    type: type,
    payload: payload,
  });
};

export const popupClose = () => {
  store.dispatch({ type: 'CLOSE_MESSAGE' });
};
