import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Rating } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import EditorActionButton from './editor/EditorActionButton';

const ArticleTable = () => {
  const { role, articles } = useSelector((state) => state);

  const articleList = articles.map((article) => (
    <Table.Row key={article.id} textAlign='center' data-cy='article'>
      <Table.Cell
        data-cy='title'
        textAlign='left'
        width={5}
        style={{ fontWeight: 'bold' }}>
        {article.title}
      </Table.Cell>
      <Table.Cell data-cy='category' singleLine>
        {article.category}
      </Table.Cell>
      <Table.Cell data-cy='date'>{article.date}</Table.Cell>
      <Table.Cell data-cy='author'>
        {article.author &&
          `${article.author.first_name} ${article.author.last_name}`}
      </Table.Cell>
      <Table.Cell data-cy='comments'>{article.comments}</Table.Cell>
      <Table.Cell>
        <Rating
          data-cy='rating'
          icon='star'
          size='tiny'
          defaultRating={article.rating}
          maxRating={5}
          disabled
        />
      </Table.Cell>
      <Table.Cell data-cy='premium'>
        {article.premium ? 'Premium' : 'Free'}
      </Table.Cell>
      <Table.Cell data-cy='status'>{article.status}</Table.Cell>
      <Table.Cell>
        {role === 'editor' ? (
          <EditorActionButton article={article} />
        ) : (
          <Link
            data-cy='edit-article-btn'
            to={{ pathname: '/edit', state: { id: article.id } }}>
            <Button>Edit</Button>
          </Link>
        )}
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Table celled padded inverted stackable={true}>
      <Table.Header>
        <Table.Row textAlign='center'>
          <Table.HeaderCell singleLine>Title</Table.HeaderCell>
          <Table.HeaderCell>Category</Table.HeaderCell>
          <Table.HeaderCell>Updated On</Table.HeaderCell>
          <Table.HeaderCell>Author</Table.HeaderCell>
          <Table.HeaderCell>Comments</Table.HeaderCell>
          <Table.HeaderCell>Rating</Table.HeaderCell>
          <Table.HeaderCell>Access</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{articleList}</Table.Body>
    </Table>
  );
};

export default ArticleTable;
