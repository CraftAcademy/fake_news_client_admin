import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import Articles from '../modules/Articles';
import ArticleTable from './ArticleTable';

const JournalistDashboard = () => {
  const { articles } = useSelector((state) => state);

  useEffect(() => {
    Articles.index();
  }, []);

  return (
    <>
      <div style={styles.container}>
        <div className='box-shadow' style={styles.articleContainer}>
          <Segment inverted attached='top'>
            <h2>All Articles</h2>
          </Segment>
          <ArticleTable articles={articles} />
          {!articles[0] && (
            <Segment
              attached='bottom'
              data-cy='no-articles-message'
              style={{ color: '#2b2b2b' }}>
              You don't have any articles yet
            </Segment>
          )}
        </div>
      </div>
    </>
  );
};

export default JournalistDashboard;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 100,
    marginLeft: 350,
    marginRight: 100,
  },
  articleContainer: {
    backgroundColor: '#202325',
    width: '100%',
  },
  formContainer: {
    width: '45%',
    marginLeft: '5%',
    padding: 10,
  },
  createButton: {
    position: 'absolute',
    top: 105,
    left: 300,
  },
};
