import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal, Form, Segment } from 'semantic-ui-react';

const ArticleCreationModal = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState();
  const [error, setError] = useState();
  const [message, setMessage] = useState();

	const categories = [
		{ key: 'FE', text: 'Flat Earth', value: 'flatEarth' },
		{ key: 'UFO', text: 'Aliens', value: 'aliens' },
	];

  const createArticle = async (event) => {
    event.preventDefault();
    debugger;
    try {
      let response = await axios.post('/articles', {
        params: {
          title: event.target.title.value,
          category: category,
          teaser: event.target.teaser.value,
          body: event.target.body.value,
        },
      });
      setMessage(response.data.message);
      setOpen(false);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Modal
      data-cy='article-creation-modal'
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      open={open}
      trigger={<Button data-cy='create-article-btn'>Create Article</Button>}
    >
      <Modal.Header inverted>Create New Article</Modal.Header>
      <Segment padded basic>
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
          <Form.Button
            color='green'
            type='submit'
            data-cy='submit-btn'
          >
            Submit
          </Form.Button>
        </Form>
      </Segment>
    </Modal>
  );
};

export default ArticleCreationModal;
