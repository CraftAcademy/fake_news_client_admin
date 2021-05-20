import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, Item, Grid, Button, Table, Rating } from 'semantic-ui-react';
import Articles from '../modules/Articles';

import EditorialForm from './EditorialForm';

const JournalistDashboard = () => {
  const [active, setActive] = useState(false);
  const { authenticated, articles } = useSelector((state) => state);
  const [article, setArticle] = useState();

  useEffect(() => {
    Articles.index();
    setActive(false);
  }, []);

  const getArticle = async (id) => {
    setActive(false);
    let response = await Articles.show(id);
    if (response) {
      setArticle(response);
      setActive(true);
    }
  };

  const openCreateForm = () => {
    setArticle('');
    setActive(false);
    setTimeout(() => {
      setActive(true);
    }, 200);
  };
  const listOfArticles = articles.map((article) => (
    <Table.Row key={article.id} textAlign="center">
      <Table.Cell textAlign="left" width={5}>
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
          icon="star"
          defaultRating={article.rating}
          maxRating={5}
          disabled
        />
      </Table.Cell>
      <Table.Cell>
        <Button>Action</Button>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <div style={styles.container}>
        <div className="box-shadow" style={styles.articleContainer}>
          <Table celled padded inverted >
            <Table.Header>
              <Table.Row textAlign="center">
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
              <p data-cy="no-articles-message" style={{ color: 'white' }}>
                You don't have any articles yet
              </p>
            )}
          </Table>
        </div>
      </div>
    </>
  );
};

export default JournalistDashboard;

const styles = {
  articleContainer: {
    maxHeight: 625,
    overflowY: 'scroll',
    backgroundColor: '#202325',
    padding: 15,

    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 100,
    marginLeft: 300,
    marginRight: 100,
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
