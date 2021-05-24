import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Table, Rating, Segment } from 'semantic-ui-react';
import Articles from '../modules/Articles';

const JournalistDashboard = () => {
  const { role, articles } = useSelector((state) => state);

  useEffect(() => {
    Articles.index();
  }, []);

  const listOfArticles = articles.map((article) => (
    <Table.Row key={article.id} textAlign="center" data-cy="article">
      <Table.Cell
        data-cy="title"
        textAlign="left"
        width={5}
        style={{ fontWeight: 'bold' }}
      >
        {article.title}
      </Table.Cell>
      <Table.Cell data-cy="category" singleLine>
        {article.category}
      </Table.Cell>

      <Table.Cell data-cy="date">{article.date}</Table.Cell>
      <Table.Cell data-cy="author">
        {article.author
          ? `${article.author.first_name} ${article.author.last_name}`
          : 'Bob Kramer'}
      </Table.Cell>
      <Table.Cell data-cy="premium">
        {article.premium ? 'Premium' : 'Free'}
      </Table.Cell>
      <Table.Cell>
        <Rating
          data-cy="rating"
          icon="star"
          size="tiny"
          defaultRating={
            article.rating ? article.rating : Math.floor(Math.random() * 6)
          }
          maxRating={5}
          disabled
        />
      </Table.Cell>
      <Table.Cell>
        {role === 'editor' ? (
          <Button data-cy='publish-btn' >Publish</Button>
        ) : (
          <Link
            data-cy="edit-article-btn"
            to={{ pathname: '/edit', state: { id: article.id } }}
          >
            <Button>Edit</Button>
          </Link>
        )}
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <div style={styles.container}>
        <div className="box-shadow" style={styles.articleContainer}>
          <Segment inverted attached="top">
            <h2>All Articles</h2>
          </Segment>
          <Table celled padded inverted style={{ overflowY: 'scroll' }}>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell singleLine>Title</Table.HeaderCell>
                <Table.HeaderCell>Categories</Table.HeaderCell>
                <Table.HeaderCell>Updated On</Table.HeaderCell>
                <Table.HeaderCell>Author</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Rating</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {articles[0] && <Table.Body>{listOfArticles}</Table.Body>}
          </Table>
          {!articles[0] && (
            <Segment
              attached="bottom"
              data-cy="no-articles-message"
              style={{ color: '#2b2b2b' }}
            >
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
