import React from 'react';
import { Grid, Image, Segment, Form, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const LogInLandingpage = () => {
  return (
    <Segment basic style={styles.segment}>
      <Grid columns='2' divided>
        <Grid.Column verticalAlign='middle'>
          <Image src='./images/OREG1950.jpg' size='medium' />
        </Grid.Column>
        <Grid.Column verticalAlign='middle'>
          <Form
            data-cy='login-form'
            as={NavLink}
            to={{ pathname: '/dashboard' }}
          >
            <Form.Input placeholder='username' data-cy='login-username' />
            <Form.Input placeholder='password' data-cy='login-password' />
            <Button type='submit' data-cy='login-btn'>
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
