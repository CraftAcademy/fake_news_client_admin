import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Radio } from 'semantic-ui-react';
import Articles, { imageEncoder } from '../modules/Articles';
import Popup from '../modules/Popup';
import SubmitMessage from './SubmitMessage';

const emptyArticle = {
  title: '',
  teaser: '',
  body: '',
  category: '',
  premium: false,
};
const categories = [
  { key: 'HW', text: 'Hollywood', value: 'Hollywood' },
  { key: 'UFO', text: 'Aliens', value: 'Aliens' },
  { key: 'ILU', text: 'Illuminati', value: 'Illuminati' },
  { key: 'POL', text: 'Politics', value: 'Politics' },
  { key: 'COV', text: 'Covid', value: 'Covid' },
  { key: 'SC', text: 'Science', value: 'Science' },
];

const EditorialForm = ({ isCreateMode }) => {
  const { submitted } = useSelector((state) => state);
  const [article, setArticle] = useState(emptyArticle);
  const [originalArticle, setOriginalArticle] = useState({});
  const [thumbnail, setThumbnail] = useState();
  let location = useLocation();

  useEffect(() => {
    if (!isCreateMode) {
      getArticle();
    }
    // eslint-disable-next-line
  }, [isCreateMode]);

  const getArticle = async () => {
    let response = await Articles.show(location.state.id);
    if (response) {
      setArticle(response);
      setOriginalArticle(response);
    }
  };

  const handleSubmit = async () => {
    if (isCreateMode) {
      Articles.create(article);
    } else {
      if (article === originalArticle) {
        Popup.open(
          'ERROR_MESSAGE',
          'You might want to change something in the article!'
        );
      } else {
        Articles.update(article);
      }
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
    <div style={styles.container} className='box-shadow'>
      {submitted && <SubmitMessage time={2000} />}
      <Form
        style={styles.form}
        data-cy='article-form'
        inverted
        onSubmit={handleSubmit}>
        <Form.Group
          style={{
            padding: '10px 0',
            margin: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
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
            <Form.Group inline>
              <Form.Select
                style={{ marginBottom: 10, width: 210 }}
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
              <Form.Group
                style={{
                  backgroundColor: '#333',
                  marginTop: 20,
                }}>
                <div className='box-shadow' style={styles.radioWrapper}>
                  <Radio
                    label='Free'
                    data-cy='free'
                    checked={!article.premium}
                    onChange={() =>
                      setArticle({
                        ...article,
                        premium: !article.premium,
                      })
                    }
                  />
                  <Radio
                    style={{ marginLeft: 15 }}
                    label='Premium'
                    data-cy='premium'
                    checked={article.premium}
                    onChange={() =>
                      setArticle({
                        ...article,
                        premium: !article.premium,
                      })
                    }
                  />
                </div>
              </Form.Group>
            </Form.Group>
            <Form.Input
              type='file'
              label='Image'
              name='image'
              data-cy='image'
              required={originalArticle ? false : true}
              onChange={(event) => handleImage(event)}
            />
          </Form.Field>
          <div style={{ marginRight: 50 }}>
            {article.image ? (
              <img
                data-cy='thumbnail'
                src={thumbnail ? URL.createObjectURL(thumbnail) : article.image}
                alt='thumbnail'
                style={styles.thumbnail}
              />
            ) : (
              <div style={styles.thumbnailPlaceholder}>
                <p style={{ fontSize: 20, color: 'white' }}>Thumbnail</p>
              </div>
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
            style={{ marginBottom: 15, height: 250 }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Button type='submit' data-cy='submit-btn'>
            Submit
          </Form.Button>
          <Link to='/'>
            <Form.Button style={{ marginLeft: 25 }}>Cancel</Form.Button>
          </Link>
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditorialForm;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 100,
    marginLeft: 350,
    marginRight: 100,
    backgroundColor: '#333',
    padding: 25,
  },
  form: {
    width: '100%',
  },
  thumbnailPlaceholder: {
    display: 'flex',
    width: 300,
    height: 190,
    padding: '0 35px',
    border: '3px solid #2b2b2b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    objectFit: 'cover',
    width: 300,
    height: 190,
    padding: '0 35px',
  },
  radioWrapper: {
    padding: 9,
    borderRadius: 4,
    width: 175,
    marginLeft: 7,
  },
};
