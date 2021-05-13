import React from 'react';
import { Portal, Segment, Header } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import Popup from '../modules/Popup';

const SuccessMessage = () => {
  const message = useSelector((state) => state.message);
  const error = useSelector((state) => state.error);
  const popupOpen = useSelector((state) => state.popupOpen);
  let header = 'Success';
  let color = 'green';

  if (error) {
    color = 'red';
    header = 'Error:';
  }

  return (
    <Portal closeOnDocumentClick onClose={() => Popup.close()} open={popupOpen}>
      <Segment
        inverted
        color={color}
        style={{
          left: '50%',
          position: 'fixed',
          top: '50%',
          transform: 'translate(-50%, -100%)',
          zIndex: 1000,
        }}
      >
        <Header>{header}</Header>
        <p data-cy='popup-message'>{message}</p>
      </Segment>
    </Portal>
  );
};

export default SuccessMessage;
