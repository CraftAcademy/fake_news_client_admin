import React from 'react';
import { Form, Button, Input } from 'semantic-ui-react';
const AdminDashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>
        Fill the given form to register new journalist
      </h1>
      <Form style={styles.form}>
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
            name='username'
            type='string'
            placeholder='username'
            data-cy='username'></Input>
        </Form.Field>
        <Form.Field>
          <Input
            required
            name='password'
            type='password'
            placeholder='password'
            data-cy='password'></Input>
        </Form.Field>
        <Form.Field>
          <Input
            required
            name='confirmPassword'
            type='password'
            placeholder='password'
            data-cy='password-confirmation'></Input>
        </Form.Field>
        <Button
          type='submit'
          // loading={loading ? true : false}
          data-cy='login-btn'
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
