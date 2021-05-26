import React, { useEffect } from 'react';
import { Portal, Segment, Header } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import Popup from '../modules/Popup';
import store from '../state/store/configureStore';

const SuccessMessage = () => {
  const { popupOpen, message, error } = useSelector((state) => state);

  useEffect(() => {
    setTimeout(() => {
      store.dispatch({ type: 'CLOSE_MESSAGE' });
    }, 3000);
  }, []);

  return (
    <Portal closeOnDocumentClick onClose={() => Popup.close()} open={popupOpen}>
      <Segment
        inverted
        color={error ? 'red' : 'green'}
        style={{
          left: '50%',
          position: 'fixed',
          bottom: 25,
          transform: 'translate(-50%)',
          zIndex: 1000,
        }}>
        <Header>{error ? 'Error' : 'Success'}</Header>
        <p data-cy='popup-message'>{message}</p>
      </Segment>
    </Portal>
  );
};

export default SuccessMessage;
