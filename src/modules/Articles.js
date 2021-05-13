import axios from 'axios';

const Articles = {
  async create(event, category) {
    return await axios.post('/articles', {
      params: {
        title: event.target.title.value,
        category: category,
        teaser: event.target.teaser.value,
        body: event.target.body.value,
      },
    });
  },
};

export default Articles;
