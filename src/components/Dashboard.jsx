import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Header, Button, Table, Rating, Segment } from 'semantic-ui-react';
import Articles from '../modules/Articles';

const JournalistDashboard = () => {
  const { articles } = useSelector((state) => state);

  useEffect(() => {
    Articles.index();
  }, []);

  const listOfArticles = articles.map((article) => (
    <Table.Row key={article.id} textAlign='center'>
      <Table.Cell textAlign='left' width={5}>
        {article.title}
      </Table.Cell>
      <Table.Cell singleLine>{article.category}</Table.Cell>

      <Table.Cell>{article.date}</Table.Cell>
      <Table.Cell>
        {article.author
          ? `${article.author.first_name} ${article.author.last_name}`
          : 'Bob Kramer'}
      </Table.Cell>
      <Table.Cell>
        <Rating
          icon='star'
          defaultRating={article.rating}
          maxRating={5}
          disabled
        />
      </Table.Cell>
      <Table.Cell>
        <Link to={{ pathname: '/edit', state: { id: article.id } }}>
          <Button>Edit</Button>
        </Link>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <div style={styles.container}>
        <div className='box-shadow' style={styles.articleContainer}>
          <Segment inverted attached='top'>
            <Header>All Articles</Header>
          </Segment>
          <Table celled padded inverted style={{ overflowY: 'scroll' }}>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell singleLine>Title</Table.HeaderCell>
                <Table.HeaderCell>Categories</Table.HeaderCell>
                <Table.HeaderCell>Posted On</Table.HeaderCell>
                <Table.HeaderCell>Author</Table.HeaderCell>
                <Table.HeaderCell>Rating</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {articles[0] ? (
              <Table.Body>{listOfArticles}</Table.Body>
            ) : (
              <Table.Row
                data-cy='no-articles-message'
                style={{ color: 'white' }}>
                You don't have any articles yet
              </Table.Row>
            )}
          </Table>
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
