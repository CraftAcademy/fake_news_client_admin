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
              style={{ color: color, fontSize: 35 }}
              name={icon}
            />
          </div>
          <div style={styles.contentContainer}>
            <h1
              data-cy='amount'
              style={{ fontSize: 30, margin: 0, padding: 0 }}>
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
    width: 250,
    padding: 15,
    marginBottom: 50,
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
