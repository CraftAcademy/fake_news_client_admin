import axios from 'axios';

const articleCreate = async (event, category) => {
  return await axios.post('/articles', {
    params: {
      title: event.target.title.value,
      category: category,
      teaser: event.target.teaser.value,
      body: event.target.body.value,
    },
  });
};

export default articleCreate;
