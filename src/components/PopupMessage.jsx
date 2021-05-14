import React from 'react';
import { Portal, Segment, Header } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import Popup from '../modules/Popup';

const SuccessMessage = () => {
  const message = useSelector((state) => state.message);
  const error = useSelector((state) => state.error);
  const popupOpen = useSelector((state) => state.popupOpen);

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
        }}
      >
        <Header>{error ? 'Error' : 'Success'}</Header>
        <p data-cy='popup-message'>{message}</p>
      </Segment>
    </Portal>
  );
};

export default SuccessMessage;
