import React, { useEffect } from 'react';
import Statistics from '../../modules/Statistics';
import { useSelector } from 'react-redux';
import StatCard from '../StatCard';
import StatsGraphs from '../StatsGraphs';

const EditorOverview = () => {
  const { statistics, error } = useSelector((state) => state);

  useEffect(() => {
    Statistics.index();
  }, []);

  return (
    <>
      <div style={styles.container}>
        <div style={styles.cardContainer}>
          <StatCard
            data={statistics.articles}
            title='Articles'
            icon='newspaper outline'
            color='#42b0e0'
          />
          <StatCard
            data={statistics.backyard_articles}
            title='Backyard Articles'
            icon='newspaper'
            color='#fdfd96'
          />
          <StatCard
            data={statistics.journalists}
            title='Journalists'
            icon='user'
            color='violet'
          />

          {!error && (
            <>
              <StatCard
                data={statistics.subscribers}
                title='Subscribers'
                icon='users'
                color='#21d3a4'
              />

              <StatCard
                data={statistics.total_income}
                title='Total Monthly Income'
                icon='money bill alternate'
                color='#21d3a4'
              />
            </>
          )}
        </div>

        <div style={styles.graphContainer}>
          <StatsGraphs data={statistics} />
        </div>
      </div>
    </>
  );
};

export default EditorOverview;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 100,
    marginLeft: 350,
    marginRight: 100,
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  graphContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 100,
    justifyContent: 'center',
  },
};
