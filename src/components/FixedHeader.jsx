import React from 'react';
import { Button } from 'semantic-ui-react';

const FixedHeader = () => {
  return (
    <div style={styles.container} className='box-shadow'>
      <Button size='tiny' style={styles.button}>
        Log Out
      </Button>
    </div>
  );
};

export default FixedHeader;

const styles = {
  container: {
    position: 'fixed',
    width: '100%',
    marginTop: 15,
    padding: 0,
    height: 50,
    backgroundColor: '#202325',
    zIndex: 200,
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: 25,
  },
  button: {
    backgroundColor: '#FCE42D',
    alignSelf: 'center',
  },
};
