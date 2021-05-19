import React, { useState } from 'react';
import { Button, Modal, Form, Segment } from 'semantic-ui-react';
import Articles, { imageEncoder } from '../modules/Articles';

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
  const [thumbnail, setThumbnail] = useState();

  const categories = [
    { key: 'HW', text: 'Hollywood', value: 'Hollywood' },
    { key: 'UFO', text: 'Aliens', value: 'Aliens' },
    { key: 'ILU', text: 'Illuminati', value: 'Illuminati' },
    { key: 'POL', text: 'Politics', value: 'Politics' },
    { key: 'COV', text: 'Covid', value: 'Covid' },
    { key: 'SC', text: 'Science', value: 'Science' },
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

  const handleImage = async (event) => {
    let file = event.target.files[0];
    setThumbnail(file);
    let encodedFile = await imageEncoder(file);
    setArticle({
      ...article,
      image: encodedFile,
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
            Write a new article
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
      <Modal.Header>{isCreateMode ? 'Create' : 'Edit'} Article</Modal.Header>
      <Segment padded basic>
        <Form data-cy='article-form' onSubmit={handleEditorial}>
          <Form.Group
            style={{
              border: '1px solid lightgrey',
              borderRadius: 5,
              padding: '10px 0',
              margin: 0,
              marginBottom: 5,
            }}>
            <Form.Field widths={5}>
              <Form.Input
                style={{ width: 400, marginBottom: 10 }}
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
                style={{ marginBottom: 10 }}
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
              <Form.Input
                type='file'
                label='Image'
                name='image'
                data-cy='image'
                required={isCreateMode ? true : false}
                onChange={(event) => handleImage(event)}
              />
            </Form.Field>
            <div>
              {article.image && (
                <img
                  data-cy='thumbnail'
                  src={
                    thumbnail ? URL.createObjectURL(thumbnail) : article.image
                  }
                  alt='thumbnail'
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: 200,
                    alignSelf: 'center',
                    padding: '0 35px',
                  }}
                />
              )}
            </div>
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
