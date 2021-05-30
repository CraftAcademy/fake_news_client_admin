import React from 'react';
import { Table } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import BackyardModal from './BackyardModal';
import { Redirect } from 'react-router';

const BackyardArticleTable = () => {
  const { backyardArticles, role } = useSelector((state) => state);

  const backyardArticleList = backyardArticles.map((backyardArticle) => (
    <Table.Row
      key={backyardArticle.id}
      textAlign='center'
      data-cy='backyard-article-row'>
      <Table.Cell
        data-cy='title'
        textAlign='left'
        width={5}
        style={{ fontWeight: 'bold' }}>
        {backyardArticle.title}
      </Table.Cell>
      <Table.Cell data-cy='theme' singleLine>
        {backyardArticle.theme}
      </Table.Cell>
      <Table.Cell data-cy='date'>{backyardArticle.date}</Table.Cell>
      <Table.Cell data-cy='written-by'>{backyardArticle.written_by}</Table.Cell>
      <Table.Cell data-cy='country'>{backyardArticle.location}</Table.Cell>
      <Table.Cell data-cy='status'>
        {backyardArticle.status}
      </Table.Cell>
      <Table.Cell>
        <BackyardModal id={backyardArticle.id} />
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      {!role === 'editor' && <Redirect to='/dashboard' />}
      <Table stackable celled padded inverted style={{ overflowY: 'scroll' }}>
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell singleLine>Title</Table.HeaderCell>
            <Table.HeaderCell>Theme</Table.HeaderCell>
            <Table.HeaderCell>Created On</Table.HeaderCell>
            <Table.HeaderCell>Written by</Table.HeaderCell>
            <Table.HeaderCell>Country</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{backyardArticleList}</Table.Body>
      </Table>
    </>
  );
};

export default BackyardArticleTable;
