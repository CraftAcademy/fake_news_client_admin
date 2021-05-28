import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Segment, Tab } from 'semantic-ui-react';
import Articles from '../modules/Articles';
import ArticleTable from './ArticleTable';
import BackyardArticleTable from './editor/BackyardArticleTable';

const JournalistDashboard = () => {
  const { articles } = useSelector((state) => state);

  useEffect(() => {
    Articles.index();
  }, []);

  const panes = [
    {
      menuItem: 'Articles',
      render: () => (
        <Tab.Pane style={{ padding: 0}} inverted attached={true}>
          <ArticleTable />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Backyard Articles',
      render: () => <Tab.Pane style={{ padding: 0}} inverted attached={true}><BackyardArticleTable /></Tab.Pane>,
    },
  ];

  return (
    <>
      <div style={styles.container}>
        <div className='box-shadow' style={styles.articleContainer}>
          <Tab menu={{ secondary: true, pointing: true, inverted: true }} panes={panes} />

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
