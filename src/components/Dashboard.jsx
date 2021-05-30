import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Segment, Tab } from 'semantic-ui-react';
import BackyardArticles from '../modules/BackyardArticles';
import Articles from '../modules/Articles';
import ArticleTable from './ArticleTable';
import BackyardArticleTable from './editor/BackyardArticleTable';

const JournalistDashboard = () => {
  const { articles, role, backyardArticles } = useSelector((state) => state);

  useEffect(() => {
    Articles.index();
  }, []);

  const handleTab = (data) => {
    if (data.activeIndex === 1) {
      BackyardArticles.index();
    }
  };

  const panes = [
    {
      menuItem: 'Articles',
      render: () => (
        <Tab.Pane style={{ padding: 0 }} inverted attached={true}>
          <>
            <ArticleTable />
            {!articles[0] && (
              <Segment
                attached='bottom'
                data-cy='no-articles-message'
                style={{ color: '#2b2b2b' }}>
                You don't have any articles yet
              </Segment>
            )}
          </>
        </Tab.Pane>
      ),
    },
  ];
  role === 'editor' &&
    panes.push({
      menuItem: 'Backyard Articles',
      render: () => (
        <Tab.Pane style={{ padding: 0 }} inverted attached={true}>
          <>
            <BackyardArticleTable />
            {!backyardArticles[0] && (
              <Segment
                attached='bottom'
                data-cy='no-articles-message'
                style={{ color: '#2b2b2b' }}>
                There are no backyard articles yet
              </Segment>
            )}
          </>
        </Tab.Pane>
      ),
    });

  return (
    <>
      <div style={styles.container}>
        <div className='box-shadow' style={styles.articleContainer}>
          <Tab
            onTabChange={(event, data) => handleTab(data, event)}
            menu={{ secondary: true, pointing: true, inverted: true }}
            panes={panes}
          />
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
};
