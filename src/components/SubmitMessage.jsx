import React, { useState, useEffect } from 'react';
import { Header, Icon, Modal } from 'semantic-ui-react';
import store from '../state/store/configureStore';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SubmitMessage = ({ time }) => {
  const [redirect, setRedirect] = useState(false);
  const { message } = useSelector((state) => state);

  useEffect(() => {
    setTimeout(() => {
      setRedirect(true);
      store.dispatch({ type: 'SET_SUBMIT', payload: false });
    }, time);
  });

  return (
    <>
      {redirect && <Redirect to='/' />}
        <Modal basic open={true} size='small'>
          <div data-cy='authentication-popup' style={{ textAlign: 'center' }}>
            <Header icon data-cy='submit-message' style={{ color: 'white' }}>
              <Icon name='circle notched' loading />
              {message}
            </Header>
            <Modal.Content data-cy='redirect-message'>
              <p>Taking you back to dashboard..</p>
            </Modal.Content>
          </div>
        </Modal>
    </>
  );
};

export default SubmitMessage;
