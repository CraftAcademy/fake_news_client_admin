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
      <div style={styles.cardContainer}>
        <StatCard
          data={statistics.articles}
          title='Articles'
          icon='newspaper outline'
          color='olive'
        />
        <StatCard
          data={statistics.backyard_articles}
          title='Backyard Articles'
          icon='newspaper'
          color='teal'
        />
        <StatCard
          data={statistics.journalists}
          title='Journalists'
          icon='user'
          color='violet'
        />
        <StatCard
          data={statistics.subscribers}
          title='Subscribers'
          icon='users'
          color='orange'
        />
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
};
