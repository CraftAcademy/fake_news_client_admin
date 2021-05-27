import React from 'react';
import { Icon } from 'semantic-ui-react';

const StatCard = ({ data, title, icon, color }) => {
  return (
    <div
      data-cy='company-stats'
      style={styles.container}
      className='box-shadow card-hover'>
      {data && (
        <>
          <div>
            <Icon
              circular
              fitted
              size='huge'
              style={{ color: color }}
              name={icon}
            />
          </div>
          <div style={styles.contentContainer}>
            <h1 style={{ fontSize: 30, margin: 0, padding: 0 }}>
              {data.total}
            </h1>
            <h2
              style={{
                fontSize: 20,
                margin: 0,
                padding: 0,
                fontWeight: '300',
              }}>
              {title}
            </h2>
          </div>
        </>
      )}
    </div>
  );
};

export default StatCard;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 150,
    width: 300,
    padding: 25,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
