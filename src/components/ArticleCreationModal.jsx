import React, { useState } from 'react';
import { Button, Modal, Form, } from 'semantic-ui-react';

const ArticleCreationModal = () => {
	const [open, setOpen] = useState(false);

  const categories = [
    { key: 'FE', text: 'Flat Earth', value: 'flatEarth'},
    { key: 'UFO', text: 'Aliens', value: 'aliens'}

  ]


  const createArticle = (event) => {
    event.preventDefault()

  }

	return (
		<Modal data-cy='article-creation-modal'
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			open={open}
			trigger={<Button data-cy='create-article-btn'>Create Article</Button>}>
       
			<Form data-cy='article-creation-form' onSubmit={(event) => createArticle(event)}>
				<Form.Group widths='equal'>
					<Form.Input required fluid label='Title' placeholder='Title' data-cy="title" />
					<Form.Select required data-cy="categories"
						fluid
						label='Category'
						options={categories}
						placeholder='Category'
					/>
				</Form.Group>
        <Form.TextArea required label="Teaser" placeholder='Teaser' data-cy="teaser" />
				<Form.TextArea required label='Main Text' placeholder='Article Body' data-cy="body" />
				<Form.Button type='submit' data-cy='submit-btn'>Submit</Form.Button>
			</Form>
		</Modal>
	);
};

export default ArticleCreationModal;
