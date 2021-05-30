import React, { useState } from 'react';
import { Popup, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Articles from '../../modules/Articles';

const EditorActionButton = ({ article }) => {
  const [confirming, setConfirming] = useState(false);

  // change attribute to status fixture CHECK
  // change published attribute to backyard fixture CHECK
  // change display columns CHECK
  // Publish param = status: published
  // Archive = status: archive
  // Unpublish to backyard articles - published: true/false

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
              onClick={() => Articles.publish(article.id)}>
              Confirm
            </Button>
            <Button onClick={() => setConfirming(false)}>Cancel</Button>
          </>
        ) : (
          <>
            <Button
              style={{ marginBottom: 10, width: '100%' }}
              disabled={article.published}
              onClick={() => setConfirming(true)}>
              Publish
            </Button>
            <Link
              style={{ width: '100%' }}
              data-cy='edit-article-btn'
              to={{ pathname: '/edit', state: { id: article.id } }}>
              <Button style={{ width: '100%' }}>Edit</Button>
            </Link>
          </>
        )}
      </div>
    </Popup>
  );
};
export default EditorActionButton;
