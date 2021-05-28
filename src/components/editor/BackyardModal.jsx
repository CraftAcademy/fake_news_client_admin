import React, { useEffect, useState } from 'react';
import {
  Button,
  Image,
  Modal,
  Icon,
  Segment,
  Divider,
} from 'semantic-ui-react';

import BackyardArticles from '../../modules/BackyardArticles';

const BackyardModal = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [backyardArticle, setBackyardArticle] = useState({});

  useEffect(() => {
    getBackyardArticle();
  }, []);

  const getBackyardArticle = async () => {
    let response = await BackyardArticles.show(id);
    setBackyardArticle(response);
  };

  return (
    <Modal
      as={Segment}
      inverted
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button data-cy='view-btn'>View More</Button>}>
      <Segment style={styles.container} inverted data-cy='backyard-preview'>
        <Modal.Header data-cy='title' style={styles.title}>
          {backyardArticle.title}
        </Modal.Header>
        <div style={styles.info}>
          <p data-cy='written_by'>
            <b>Written by: </b>
            {backyardArticle.written_by}
          </p>
          <p data-cy='theme'>
            <b>Theme: </b>
            {backyardArticle.theme}
          </p>
          <p data-cy='country'>
            <b>From:</b> {backyardArticle.location}
          </p>
          <p data-cy='date'>
            <b>Date:</b> {backyardArticle.date}
          </p>
        </div>
        <Divider style={{ width: '70%', margin: '15px auto' }} />
        <Modal.Content scrolling>
          <Modal.Description data-cy='body'>
            <p style={styles.body}>{backyardArticle.body}</p>
          </Modal.Description>
        </Modal.Content>
      </Segment>
    </Modal>
  );
};

export default BackyardModal;

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
