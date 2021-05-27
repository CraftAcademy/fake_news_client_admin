import React, { useEffect } from 'react';
import Statistics from '../../modules/Statistics';
import { useSelector } from 'react-redux';
import StatCard from '../StatCard';

const EditorOverview = () => {
  const { statistics } = useSelector((state) => state);

  useEffect(() => {
    Statistics.index();
  }, []);

  return (
    <div style={styles.container}>
      IM HERE CONTAINER
      <div style={styles.cardContainer}>
        {statistics[0] && (
          <StatCard
            data={statistics.articles}
            title='Articles'
            icon='newspaper outline'
            color='olive'
          />
        )}
      </div>
    </div>
  );
};

export default EditorOverview;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 100,
    marginLeft: 350,
    marginRight: 100,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
};
