import axios from 'axios';
import React, { useState } from 'react';
//import { useDispatch } from 'react-redux';
import { Button, Modal, Form, Segment } from 'semantic-ui-react';
import articleCreate from '../modules/article';
import store from '../state/store/configureStore';

const ArticleCreationModal = () => {
	const [open, setOpen] = useState(false);
	const [category, setCategory] = useState();

	const categories = [
		{ key: 'FE', text: 'Flat Earth', value: 'flatEarth' },
		{ key: 'UFO', text: 'Aliens', value: 'aliens' },
	];

	const createArticle = async (event) => {
		event.preventDefault();
		try {
			let response = await articleCreate(event, category);

			store.dispatch({
				type: 'SUCCESS_MESSAGE',
				payload: response.data.message,
			});
			setOpen(false);
		} catch (error) {
			if (error.response.status === 500) {
				store.dispatch({
					type: 'ERROR_MESSAGE',
					payload: 'Something went wrong on our server, try again later',
				});
			} else {
				store.dispatch({ type: 'ERROR_MESSAGE', payload: error.message });
			}
		}
	};

	return (
		<Modal
			data-cy='article-creation-modal'
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			open={open}
			trigger={<Button data-cy='create-article-btn'>Create Article</Button>}>
			<Modal.Header inverted>Create New Article</Modal.Header>
			<Segment padded basic>
				<Form
					data-cy='article-creation-form'
					onSubmit={(event) => createArticle(event)}>
					<Form.Group widths='equal'>
						<Form.Input
							required
							fluid
							label='Title'
							name='title'
							placeholder='Title'
							data-cy='title'
						/>
						<Form.Select
							required
							data-cy='categories'
							fluid
							name='category'
							label='Category'
							options={categories}
							onChange={(event) => setCategory(event.target.textContent)}
							placeholder='Category'
						/>
					</Form.Group>
					<Form.TextArea
						required
						label='Teaser'
						name='teaser'
						placeholder='Teaser'
						data-cy='teaser'
					/>
					<Form.TextArea
						required
						label='Main Text'
						name='body'
						placeholder='Article Body'
						data-cy='body'
					/>
					<Form.Button color='green' type='submit' data-cy='submit-btn'>
						Submit
					</Form.Button>
				</Form>
			</Segment>
		</Modal>
	);
};

export default ArticleCreationModal;
