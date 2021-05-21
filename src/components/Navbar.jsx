import React from 'react';
import Authentication from '../modules/Authentication'
import { Button } from 'semantic-ui-react';

const Navbar = () => {
  return (
    <div style={styles.container} className='box-shadow'>
      <div>
        <h1 style={styles.title}>
          FAKE
          <span style={{ color: '#FCE42D' }}> ? </span>
          NEWS
        </h1>
      </div>
      <Button onClick={() => Authentication.signOut()} data-cy='logout-button' size='tiny' style={styles.button}>
        Log Out
      </Button>
    </div>
  );
};

export default Navbar;

const styles = {
  container: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    top: 0,
    padding: '0 25px',
    height: 50,
    backgroundColor: '#202325',
    zIndex: 200,
    paddingRight: 25,
  },
  button: {
    backgroundColor: '#FCE42D',
    alignSelf: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'KoHo',
  },
};
