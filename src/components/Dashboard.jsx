import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Header, Item, Segment, Grid } from 'semantic-ui-react';
import Articles from '../modules/Articles';
import EditorialModal from './EditorialModal';

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
          <EditorialModal id={article.id} />
        </Item.Extra>
      </Item>
    );
  });

  return (
    <>
      {!authenticated && <Redirect to='/' />}
      <Grid centered>
        <Grid.Row centered>
          <h1 style={{ color: 'white', fontSize: 50, marginTop: 25 }}>
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
          <EditorialModal isCreateMode={true} />
        </Grid.Row>
      </Grid>
      <Container
        text
        as={Segment}
        style={{
          maxHeight: 550,
          marginTop: 25,
          overflowY: 'scroll',
          backgroundColor: '#202325',
          padding: 15,
          boxShadow:
            '-1px -1px 2px rgba(255, 255, 255, 0.25), inset -1px -1px 5px rgba(255, 255, 255, 0.25), 8px 30px 30px rgba(0, 0, 0, 0.4), inset -2px -2px 5px rgba(0, 0, 0, 0.3)',
        }}>
        {articles[0] ? (
          <Item.Group>{listOfArticles}</Item.Group>
        ) : (
          <p data-cy='no-articles-message' style={{ color: 'white' }}>
            You don't have any articles yet
          </p>
        )}
      </Container>
    </>
  );
};

export default JournalistDashboard;
