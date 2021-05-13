import React from 'react';
import ArticleCreationModal from './ArticleCreationModal';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';

const JournalistDashboard = () => {
  return (
    <>
      <ArticleCreationModal />
      <SuccessMessage />
      <ErrorMessage />
    </>
  );
};

export default JournalistDashboard;
