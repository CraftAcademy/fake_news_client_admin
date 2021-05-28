import React, { useState, useEffect } from 'react';
import Statistics from '../../modules/Statistics';
import { useSelector } from 'react-redux';
import StatCard from '../StatCard';
import StatsGraphs from '../StatsGraphs';
import { Redirect } from 'react-router';
import { Dimmer, Loader } from 'semantic-ui-react';

const EditorOverview = () => {
  const { statistics, error, role } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Statistics.index(setLoading);
  }, []);

  return (
    <>
      {!role === 'editor' && <Redirect to='/dashboard' />}
      <div style={styles.container}>
        <Dimmer active={loading}>
          <Loader size='huge'>Loading your statistics</Loader>
        </Dimmer>
        <div style={styles.cardContainer}>
          <StatCard
            data={statistics.articles}
            title='Articles'
            icon='newspaper outline'
            color='#fdfd96'
          />
          <StatCard
            data={statistics.backyard_articles}
            title='Backyard Articles'
            icon='newspaper'
            color='#fdfd96'
          />
          <StatCard
            data={statistics.comments}
            title='Total comments'
            icon='comments'
            color='#fdfd96'
          />
        </div>
        <div style={styles.cardContainer}>
          <StatCard
            data={statistics.journalists}
            title='Journalists'
            icon='user'
            color='#21d3a4'
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
    justifyContent: 'space-evenly',
  },

  graphContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 100,
    justifyContent: 'center',
  },
};
