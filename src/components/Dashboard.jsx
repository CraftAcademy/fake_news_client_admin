import React from 'react';
import ArticleCreationModal from './ArticleCreationModal';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Articles from '../modules/Articles';

const JournalistDashboard = () => {
  const {authenticated, articles} = useSelector((state) => state);

  useEffect(() => {
    Articles.index()
  }, [])

  return (
    <>
      {!authenticated && <Redirect to='/' />}
      <ArticleCreationModal />
      <Container text>
        {listOfArticles}
      </Container>
    </>
  );
};

export default JournalistDashboard;
