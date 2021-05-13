import React from 'react';
import { Grid, Image, Segment, Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { popupOpen } from '../modules/Messages';

const LogInLandingpage = () => {
  const handleLogin = async (event) => {
    event.preventDefault();

    let credentials = {
      email: event.target.username.value,
      password: event.target.password.value,
    };
    try {
      let response = await axios.post('auth/sign_in', credentials);
      const userCredentials = {
        uid: response.headers['uid'],
        client: response.headers['client'],
        access_token: response.headers['access-token'],
        expiry: response.headers['expiry'],
        token_type: 'Bearer',
      };
      localStorage.setItem('userData', JSON.stringify(userCredentials));
      return <Redirect to='/dashboard' />;
    } catch (error) {
      if (error.response.status === 401) {
        popupOpen(
          'ERROR_MESSAGE',
          'You are not authorised to do this, contact your system adminstrator'
        );
      } else {
        popupOpen('ERROR_MESSAGE', error.message);
      }
    }
  };

  return (
    <Segment basic style={styles.segment}>
      <Grid columns='2' divided>
        <Grid.Column verticalAlign='middle'>
          <Image src='./images/OREG1950.jpg' size='medium' />
        </Grid.Column>
        <Grid.Column verticalAlign='middle'>
          <Form onSubmit={(event) => handleLogin(event)} data-cy='login-form'>
            <Form.Field>
              <input
                name='username'
                type='string'
                placeholder='username'
                data-cy='login-username'
              ></input>
            </Form.Field>
            <Form.Field>
              <input
                name='password'
                type='string'
                placeholder='password'
                data-cy='login-password'
              ></input>
            </Form.Field>

            <Button
              type='submit'
              data-cy='login-btn'
              // as={NavLink}
              // to={{ pathname: '/dashboard' }}
            >
              Login
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default LogInLandingpage;

const styles = {
  segment: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
