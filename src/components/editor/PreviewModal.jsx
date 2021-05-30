import React, { useState } from 'react';
import { Button, Modal, Segment, Divider } from 'semantic-ui-react';

import BackyardArticles from '../../modules/BackyardArticles';
import Articles from '../../modules/Articles';

const PreviewModal = ({ id, isBackyard }) => {
  const [open, setOpen] = useState(false);
  const [article, setArticle] = useState({});

  const getArticle = async () => {
    let response;
    if (isBackyard) {
      response = await BackyardArticles.show(id);
    } else {
      response = await Articles.show(id);
    }
    setArticle(response);
  };

  const articleInfo = isBackyard ? (
    <>
      <p data-cy='written_by'>
        <b>Written by: </b>
        {article.written_by}
      </p>
      <p data-cy='theme'>
        <b>Theme: </b>
        {article.theme}
      </p>
      <p data-cy='country'>
        <b>From:</b> {article.location}
      </p>
    </>
  ) : (
    <>
      <p data-cy='author'>
        <b>Written by: </b>
        {article.author &&
          `${article.author.first_name} ${article.author.last_name}`}
      </p>
      <p data-cy='category'>
        <b>Category </b>
        {article.category}
      </p>
    </>
  );

  return (
    <Modal
      as={Segment}
      inverted
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        <Button onClick={() => getArticle()} data-cy='view-btn'>
          Preview
        </Button>
      }>
      <Segment style={styles.container} inverted data-cy='article-preview'>
        <Modal.Header data-cy='title' style={styles.title}>
          {article.title}
        </Modal.Header>
        <div style={styles.info}>
          {articleInfo}
          <p data-cy='date'>
            <b>Date:</b> {article.date}
          </p>
        </div>
        <Divider style={{ width: '70%', margin: '15px auto' }} />
        <Modal.Content scrolling>
          <Modal.Description>
          {!isBackyard && (
            <>
            <img alt="title" src={article.image} style={{ width: '100%', margin: '15px auto' }}/>
            <p style={{ fontSize: 20, margin: '18px auto',fontFamily:'garamond,serif' }}>{article.teaser}</p>
            <Divider style={{ fontSize: 20, margin: '15px auto'}} />
            </>
          ) }
            <p data-cy='content-body' style={styles.body}>
              {article.body}
            </p>
          </Modal.Description>
        </Modal.Content>
      </Segment>
    </Modal>
  );
};

export default PreviewModal;

const styles = {
  container: {
    padding: 50,
    height: '30%',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    fontSize: 18,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 50,
    color: '#cec269',
  },
  body: { fontSize: 22, whiteSpace: 'pre-wrap', marginTop: 25 },
};
