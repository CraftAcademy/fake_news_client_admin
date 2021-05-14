import React, { useState } from 'react';
import { Button, Modal, Form, Segment } from 'semantic-ui-react';
import Articles from '../modules/Articles';

const ArticleCreationModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();

  const categories = [
    { key: 'FE', text: 'Flat Earth', value: 'Flat Earth' },
    { key: 'UFO', text: 'Aliens', value: 'Aliens' },
  ];

  const createArticle = async (event) => {
    event.preventDefault();
    Articles.create(event, category, setModalOpen)
  };

  return (
    <Modal
      data-cy='article-creation-modal'
   
      onOpen={() => setModalOpen(true)}
      onClose={() => setModalOpen(false)}
      open={modalOpen}
      trigger={<Button data-cy='create-article-btn' style={{backgroundColor: '#FCE42D'}}>Create Article</Button>}
    >
      <Modal.Header inverted  >Create New Article</Modal.Header>
      <Segment padded basic >
        <Form
          data-cy='article-creation-form'
          onSubmit={(event) => createArticle(event)}
        >
          <Form.Group widths='equal'>
            <Form.Input
              required
              fluid
              label='Title'
              name='title'
              placeholder='Title'
              data-cy='title'
            />
            <Form.Select
              required
              data-cy='categories'
              fluid
              name='category'
              label='Category'
              options={categories}
              onChange={(event) => setCategory(event.target.textContent)}
              placeholder='Category'
            />
          </Form.Group>
          <Form.TextArea
            required
            label='Teaser'
            name='teaser'
            placeholder='Teaser'
            data-cy='teaser'
          />
          <Form.TextArea
            required
            label='Main Text'
            name='body'
            placeholder='Article Body'
            data-cy='body'
          />
          <Form.Button style={{backgroundColor: '#FCE42D'}} type='submit' data-cy='submit-btn'>
            Submit
          </Form.Button>
        </Form>
      </Segment>
    </Modal>
  );
};

export default ArticleCreationModal;
