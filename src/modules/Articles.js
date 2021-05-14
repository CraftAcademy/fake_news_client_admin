import axios from 'axios';

const Articles = {
  async create(event, category, headers) {
    return await axios.post('/articles', {
      params: {
        article: {
          title: event.target.title.value,
          category: category,
          teaser: event.target.teaser.value,
          body: event.target.body.value,
        },
      },      
    }, {
      headers: headers
    });
  },
};

export default Articles;