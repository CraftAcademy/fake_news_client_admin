import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Header, Item, Grid, Button } from 'semantic-ui-react';
import Articles from '../modules/Articles';
import SideMenu from './SideMenu';
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

  const listOfArticles = articles.map((article) => {
    return (
      <Item
        key={article.id}
        data-cy='article'
        style={{ borderBottom: '1px solid white', paddingBottom: 10 }}>
        <Item.Content style={{ width: '100%' }} verticalAlign='middle'>
          <Item.Header
            data-cy='title'
            as={Header}
            size='small'
            style={{
              color: 'white',
              fontFamily: 'Roboto Condensed',
              fontSize: 20,
            }}>
            {article.title}
          </Item.Header>
          <Item.Meta
            as='p'
            data-cy='date'
            style={{ color: 'white', fontSize: 16, paddingTop: 10 }}>
            Created at: {article.date}
          </Item.Meta>
        </Item.Content>
        <Item.Extra style={{ width: 'auto', marginLeft: 50 }}>
          <Button
            data-cy='edit-article-btn'
            onClick={() => getArticle(article.id)}>
            Edit
          </Button>
        </Item.Extra>
      </Item>
    );
  });

  return (
    <>
      {!authenticated && <Redirect to='/' />}
      <SideMenu />
      <Button
        data-cy='create-article-btn'
        style={styles.createButton}
        onClick={() => openCreateForm()}>
        Write new article
      </Button>
      <Grid centered style={{ paddingTop: 50 }}></Grid>

      <div style={styles.wrapper}>
        <div className='box-shadow' style={styles.articleContainer}>
          {articles[0] ? (
            <Item.Group style={{ paddingBottom: 10 }}>
              {listOfArticles}
            </Item.Group>
          ) : (
            <p data-cy='no-articles-message' style={{ color: 'white' }}>
              You don't have any articles yet
            </p>
          )}
        </div>
        {active && (
          <div style={styles.formContainer} className='box-shadow'>
            <EditorialForm articleData={article} setActive={setActive} />
          </div>
        )}
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

    width: '30%',
    marginLeft: 300,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 75,
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
