import React from 'react';
import ArticleCreationModal from './ArticleCreationModal';
import PopupMessage from './PopupMessage';

const JournalistDashboard = () => {
  return (
    <>
      <ArticleCreationModal />
      <PopupMessage />
    </>
  );
};

export default JournalistDashboard;
