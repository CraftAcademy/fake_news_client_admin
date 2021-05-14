import React from 'react';
import { Grid, Image, Segment, Form, Button, Input } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Users from '../modules/Users';

const LogInLandingpage = () => {
  const authenticated = useSelector((state) => state.authenticated);

  const handleLogin = async (event) => {
    event.preventDefault();
    Users.signIn(event);
  };

  return (
    <Segment basic style={styles.segment}>
      {authenticated && <Redirect to='/dashboard' />}
      <Grid columns='2' divided>
        <Grid.Column verticalAlign='middle'>
          <Image src='./images/OREG1950.jpg' size='medium' />
        </Grid.Column>
        <Grid.Column verticalAlign='middle'>
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
            <Button type='submit' data-cy='login-btn' style={{backgroundColor: '#FCE42D'}}>
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
