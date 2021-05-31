import React, { useState } from 'react';
import { Popup, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Articles from '../../modules/Articles';
import PreviewModal from './PreviewModal';
import BackyardArticles from '../../modules/BackyardArticles';

const EditorActionButton = ({ article, isBackyard }) => {
  const [confirming, setConfirming] = useState(false);

  return (
    <Popup
      trigger={<Button data-cy='action-btn'>Actions</Button>}
      flowing
      inverted
      offset={[0, 5]}
      position='bottom center'
      style={{ padding: 15 }}
      onUnmount={() => setConfirming(false)}
      on='click'>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {confirming ? (
          <>
            <Button
              style={{ marginBottom: 10 }}
              onClick={() =>
                isBackyard
                  ? BackyardArticles.setStatus(article.id, article.status)
                  : Articles.setStatus(article.id, article.status)
              }>
              Confirm
            </Button>
            <Button onClick={() => setConfirming(false)}>Cancel</Button>
          </>
        ) : (
          <>
            <Button
              style={{ marginBottom: 10, width: '100%' }}
              onClick={() => setConfirming(true)}>
              {article.status === 'Published' ? 'Archive' : 'Publish'}
            </Button>
            {!isBackyard && (
              <Link
                style={{ width: '100%', marginBottom: 10 }}
                data-cy='edit-article-btn'
                to={{ pathname: '/edit', state: { id: article.id } }}>
                <Button style={{ width: '100%' }}>Edit</Button>
              </Link>
            )}
            <PreviewModal id={article.id} isBackyard={isBackyard} />
          </>
        )}
      </div>
    </Popup>
  );
};
export default EditorActionButton;
