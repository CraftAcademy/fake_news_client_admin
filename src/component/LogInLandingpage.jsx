import React from 'react';
import { Grid, Image, Segment, Form, Button } from 'semantic-ui-react';

const LogInLandingpage = () => {
  return (
    <Segment basic style={styles.segment}>
      <Grid columns='2' divided>
        <Grid.Column verticalAlign='middle'>
          <Image src='../images/ufo_admin_login.jpg' size='medium'/>
        </Grid.Column>
        <Grid.Column verticalAlign='middle'>
          <Form data-cy='login-form'>
            <Form.Field>
              <input placeholder='username' data-cy='login-username' />
            </Form.Field>
            <Form.Field>
              <input placeholder='password' data-cy='login-password' />
            </Form.Field>
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
