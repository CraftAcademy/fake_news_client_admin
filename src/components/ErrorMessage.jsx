import React from 'react';
import { Portal, Segment, Header } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

const ErrorMessage = () => {
  const message = useSelector((state) => state.message);
  const popupOpen = useSelector((state) => state.errorOpen);
  const dispatch = useDispatch();

  return (
    <Portal
      closeOnDocumentClick
      onClose={() => dispatch({ type: 'CLOSE_MESSAGE' })}
      open={popupOpen}
    >
      <Segment
        inverted
        color='red'
        style={{
          left: '50%',
          position: 'fixed',
          top: '50%',
          transform: 'translate(-50%, -100%)',
          zIndex: 1000,
        }}
      >
        <Header>Error:</Header>
        <p data-cy='error-message'>{message}</p>
      </Segment>
    </Portal>
  );
};

export default ErrorMessage;
