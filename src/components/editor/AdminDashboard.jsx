import React, { useState } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import Authentication from '../../modules/Authentication';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const { role } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    setLoading(true);
    event.preventDefault();
    Authentication.registerJournalist(event, setLoading);
  };

  return (
    <div style={styles.container}>
      {!role === 'editor' && <Redirect to='/dashboard' />}
      <h1 style={styles.header}>
        Fill the given form to register new journalist
      </h1>
      <Form
        style={styles.form}
        onSubmit={(event) => handleLogin(event)}
        data-cy='registration-form'>
        <Form.Field>
          <Input
            required
            name='firstName'
            type='string'
            placeholder='First Name'
            data-cy='first-name'></Input>
        </Form.Field>
        <Form.Field>
          <Input
            required
            name='lastName'
            type='string'
            placeholder='Last Name'
            data-cy='last-name'></Input>
        </Form.Field>
        <Form.Field>
          <Input
            required
            name='email'
            type='string'
            placeholder='Email'
            data-cy='email'></Input>
        </Form.Field>
        <Form.Field>
          <Input
            required
            name='password'
            type='password'
            placeholder='Password'
            data-cy='password'></Input>
        </Form.Field>
        <Form.Field>
          <Input
            required
            name='passwordConfirmation'
            type='password'
            placeholder='Password one more time..'
            data-cy='password-confirmation'></Input>
        </Form.Field>
        <Button
          type='submit'
          loading={loading ? true : false}
          data-cy='submit-btn'
          style={styles.button}>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default AdminDashboard;

const styles = {
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 100,
    marginLeft: 350,
    marginRight: 100,
  },
  form: {
    width: '40%',
  },
  button: {
    marginTop: 30,
    marginLeft: '35%',
  },
  header: {
    color: 'white',
    marginBottom: 30,
  },
};
