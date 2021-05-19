import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import Articles, { imageEncoder } from '../modules/Articles';

const emptyArticle = {
  title: '',
  teaser: '',
  body: '',
  category: '',
};

const EditorialForm = ({ articleData, setActive }) => {
  const [article, setArticle] = useState(
    articleData ? articleData : emptyArticle
  );
  const [originalArticle] = useState(articleData);
  const [thumbnail, setThumbnail] = useState();

  const categories = [
    { key: 'HW', text: 'Hollywood', value: 'Hollywood' },
    { key: 'UFO', text: 'Aliens', value: 'Aliens' },
    { key: 'ILU', text: 'Illuminati', value: 'Illuminati' },
    { key: 'POL', text: 'Politics', value: 'Politics' },
    { key: 'COV', text: 'Covid', value: 'Covid' },
    { key: 'SC', text: 'Science', value: 'Science' },
  ];

  const handleSubmit = async () => {
    if (originalArticle) {
      if (article === originalArticle) {
        setActive(false);
      } else {
        Articles.update(article, setActive);
      }
    } else {
      Articles.create(article, setActive);
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
    <Form data-cy='article-form' inverted onSubmit={handleSubmit}>
      <Form.Group
        style={{
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
            required={originalArticle ? false : true}
            onChange={(event) => handleImage(event)}
          />
        </Form.Field>
        <div>
          {article.image && (
            <img
              data-cy='thumbnail'
              src={thumbnail ? URL.createObjectURL(thumbnail) : article.image}
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
      <Form.Group grouped style={{ padding: 10 }}>
        <Form.TextArea
          required
          onChange={(event) => handleChange(event)}
          value={article.teaser}
          label='Teaser'
          name='teaser'
          placeholder='Teaser'
          data-cy='teaser'
          style={{ marginBottom: 15 }}
        />
        <Form.TextArea
          required
          onChange={(event) => handleChange(event)}
          label='Main Text'
          value={article.body}
          name='body'
          placeholder='Article Body'
          data-cy='body'
          style={{ marginBottom: 15, height: 115 }}
        />
        <Form.Group>
          <Form.Button type='submit' data-cy='submit-btn'>
            Submit
          </Form.Button>
          <Form.Button
            style={{ marginLeft: 15 }}
            onClick={() => setActive(false)}>
            Close
          </Form.Button>
        </Form.Group>
      </Form.Group>
    </Form>
  );
};

export default EditorialForm;
