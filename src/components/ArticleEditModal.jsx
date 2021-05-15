import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Segment } from 'semantic-ui-react';
import Articles from '../modules/Articles';

const ArticleEditModal = ({ id }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();
  const [article, setArticle] = useState({});

  useEffect(() => {
    Articles.show(id);
  }, [id]);

  const categories = [
    { key: 'FE', text: 'Flat Earth', value: 'Flat Earth' },
    { key: 'UFO', text: 'Aliens', value: 'Aliens' },
  ];

  const editArticle = async (event) => {
    event.preventDefault();
    Articles.update(event, category, setModalOpen, id);
  };

  return (
    <Modal
      data-cy='article-edit-modal'
      onOpen={() => setModalOpen(true)}
      onClose={() => setModalOpen(false)}
      open={modalOpen}
      trigger={
        <Button
          data-cy='edit-article-btn'
          style={{ backgroundColor: '#FCE42D' }}>
          Edit Article
        </Button>
      }>
      <Modal.Header>Create New Article</Modal.Header>
      <Segment padded basic>
        <Form
          data-cy='article-edit-form'
          onSubmit={(event) => editArticle(event)}>
          <Form.Group widths='equal'>
            <Form.Input
              required
              fluid
              value={article.title}
              label='Title'
              name='title'
              placeholder='Title'
              data-cy='title'
            />
            <Form.Select
              required
              data-cy='categories'
              fluid
              value={article.title}
              name='category'
              label='Category'
              options={categories}
              onChange={(event) => setCategory(event.target.textContent)}
              placeholder='Category'
            />
          </Form.Group>
          <Form.TextArea
            required
            value={article.teaser}
            label='Teaser'
            name='teaser'
            placeholder='Teaser'
            data-cy='teaser'
          />
          <Form.TextArea
            required
            label='Main Text'
            value={article.body}
            name='body'
            placeholder='Article Body'
            data-cy='body'
          />
          <Form.Button
            style={{ backgroundColor: '#FCE42D' }}
            type='submit'
            data-cy='submit-btn'>
            Submit
          </Form.Button>
        </Form>
      </Segment>
    </Modal>
  );
};

export default ArticleEditModal;
