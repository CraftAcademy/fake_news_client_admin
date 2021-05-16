import React, { useState } from 'react';
import { Button, Modal, Form, Segment } from 'semantic-ui-react';
import Articles from '../modules/Articles';

const emptyArticle = {
  title: '',
  teaser: '',
  body: '',
  category: '',
};

const EditorialModal = ({ id, isCreateMode }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [article, setArticle] = useState(emptyArticle);
  const [originalArticle, setOriginalArticle] = useState({});

  const categories = [
    { key: 'FE', text: 'Hollywood', value: 'Flat Earth' },
    { key: 'UFO', text: 'Aliens', value: 'Aliens' },
    { key: 'ILU', text: 'Illuminati', value: 'Illuminati' },
    { key: 'POL', text: 'Politics', value: 'Politics' },
    { key: 'COV', text: 'Covid', value: 'Covid' },
  ];

  const handleEditorial = async () => {
    if (isCreateMode) {
      Articles.create(article, setModalOpen);
    } else {
      if (article === originalArticle) {
        setModalOpen(false);
      } else {
        Articles.update(article, setModalOpen);
      }
    }
  };

  const getArticle = async (id) => {
    let response = await Articles.show(id);
    if (response) {
      setArticle(response);
      setOriginalArticle(response);
    }
  };

  const handleChange = (event) => {
    setArticle({
      ...article,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeCategory = (event) => {
    setArticle({
      ...article,
      category: event.target.textContent,
    });
  };

  return (
    <Modal
      data-cy='editorial-modal'
      onOpen={() => setModalOpen(true)}
      onClose={() => setModalOpen(false)}
      open={modalOpen}
      trigger={
        isCreateMode ? (
          <Button
            data-cy='create-article-btn'
            style={{ backgroundColor: '#FCE42D' }}>
            Create Article
          </Button>
        ) : (
          <Button
            data-cy='edit-article-btn'
            style={{ backgroundColor: '#FCE42D' }}
            onClick={() => getArticle(id)}>
            Edit
          </Button>
        )
      }>
      <Modal.Header>Edit Article</Modal.Header>
      <Segment padded basic>
        <Form data-cy='article-form' onSubmit={handleEditorial}>
          <Form.Group widths='equal'>
            <Form.Input
              required
              fluid
              onChange={(event) => handleChange(event)}
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
              onChange={(event) => handleChangeCategory(event)}
              value={article.category}
              name='category'
              label='Category'
              options={categories}
              placeholder='Category'
            />
          </Form.Group>
          <Form.TextArea
            required
            onChange={(event) => handleChange(event)}
            value={article.teaser}
            label='Teaser'
            name='teaser'
            placeholder='Teaser'
            data-cy='teaser'
          />
          <Form.TextArea
            required
            onChange={(event) => handleChange(event)}
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

export default EditorialModal;
