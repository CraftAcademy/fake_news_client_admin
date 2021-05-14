import React from 'react';
import ArticleCreationModal from './ArticleCreationModal';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const JournalistDashboard = () => {
  const authenticated = useSelector((state) => state.authenticated);
  return (
    <>
      {!authenticated && <Redirect to='/' />}
      <ArticleCreationModal />
    </>
  );
};

export default JournalistDashboard;
