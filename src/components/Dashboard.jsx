import React, { useEffect } from 'react';
import ArticleCreationModal from './ArticleCreationModal';
import ArticleEditModal from './ArticleEditModal';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Header,
  Item,
  Segment,
  Button,
  Grid,
} from 'semantic-ui-react';
import Articles from '../modules/Articles';

const JournalistDashboard = () => {
  const { authenticated, fullName, articles } = useSelector((state) => state);

  useEffect(() => {
    Articles.index();
  }, []);

  const listOfArticles = articles.map((article) => {
    return (
      <Item
        key={article.id}
        data-cy='article'
        style={{ borderBottom: '1px solid white' }}>
        <Item.Content style={{ width: '100%' }} verticalAlign='middle'>
          <Item.Header
            data-cy='title'
            as={Header}
            size='small'
            style={{ color: 'white' }}>
            {article.title}
          </Item.Header>
          <Item.Meta data-cy='date' style={{ color: 'white' }}>
            Created at: {article.date}
          </Item.Meta>
        </Item.Content>
        <Item.Extra style={{ width: 'auto', marginLeft: 50 }}>
          <ArticleEditModal id={article.id} />
        </Item.Extra>
      </Item>
    );
  });

  return (
    <>
      {!authenticated && <Redirect to='/' />}
      <Grid centered>
        <Grid.Row centered>
          <h1 style={{ color: 'white', fontSize: 40, marginTop: 25 }}>
            FAKE
            <span style={{ color: '#FCE42D' }}> ? </span>
            NEWS
          </h1>
        </Grid.Row>
        <Grid.Row centered>
          <p
            data-cy='greeting'
            style={{
              color: 'white',
              fontSize: 14,
              fontStyle: 'italic',
            }}>
            {`WELCOME BACK ${fullName.toUpperCase()}`}
          </p>
        </Grid.Row>
        <Grid.Row>
          <ArticleCreationModal />
        </Grid.Row>
      </Grid>
      <Container
        text
        as={Segment}
        inverted
        style={{ maxHeight: 550, overflowY: 'scroll' }}>
        {articles[0] ? (
          <Item.Group>{listOfArticles}</Item.Group>
        ) : (
          <p data-cy='no-articles-message'>You don't have any articles yet</p>
        )}
      </Container>
    </>
  );
};

export default JournalistDashboard;
