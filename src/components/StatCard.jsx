import React from 'react';
import { Icon } from 'semantic-ui-react';

const StatCard = ({ data, title, icon, color }) => {
  return (
    <div style={styles.container} className='box-shadow'>
      <div>
        <Icon bordered inverted color={color} name={icon} />
      </div>
      <div>
        <h1>{data.total}</h1>
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default StatCard;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: 300
  },
};
