import React from 'react';
import { Grid, Image, Segment, Form, Button, Input } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Authentication from '../modules/Authentication';

const LogIn = () => {
  const authenticated = useSelector((state) => state.authenticated);

  const handleLogin = async (event) => {
    event.preventDefault();
    Authentication.signIn(event);
  };

  return (
    <Segment basic style={styles.segment}>
      {authenticated && <Redirect to='/dashboard' />}

      <Grid columns='2' divided>
        <Grid.Row centered>
          <h1 style={{ color: 'white', fontSize: 40 }}>
            FAKE
            <span style={{ color: '#FCE42D' }}> ? </span>
            NEWS
          </h1>
        </Grid.Row>
        <Grid.Row centered>
          <p
            style={{
              color: 'white',
              fontSize: 14,
              fontStyle: 'italic',
              marginBottom: 30,
            }}>
            ADMIN LOGIN
          </p>
        </Grid.Row>
        <Grid.Column verticalAlign='middle'>
          <Image
            src='./images/OREG1950.jpg'
            size='medium'
            style={{ float: 'right' }}
          />
        </Grid.Column>
        <Grid.Column verticalAlign='middle' width={6}>
          <Form onSubmit={(event) => handleLogin(event)} data-cy='login-form'>
            <Form.Field>
              <Input
                required
                name='username'
                type='string'
                placeholder='username'
                data-cy='login-username'></Input>
            </Form.Field>
            <Form.Field>
              <Input
                required
                name='password'
                type='password'
                placeholder='password'
                data-cy='login-password'></Input>
            </Form.Field>
            <Button
              type='submit'
              data-cy='login-btn'
              style={{ backgroundColor: '#FCE42D' }}>
              Login
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default LogIn;

const styles = {
  segment: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
