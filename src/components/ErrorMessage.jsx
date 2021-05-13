import React from 'react';
import { Portal, Segment, Header } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { popupClose } from '../modules/popup';

const ErrorMessage = () => {
	const message = useSelector((state) => state.message);
	const popupOpen = useSelector((state) => state.errorOpen);

	return (
		<Portal closeOnDocumentClick onClose={() => popupClose()} open={popupOpen}>
			<Segment
				inverted
				color='red'
				style={{
					left: '50%',
					position: 'fixed',
					top: '53%',
					transform: 'translate(-50%, -100%)',
					zIndex: 1000,
				}}>
				<Header>Error:</Header>
				<p data-cy='error-message'>{message}</p>
			</Segment>
		</Portal>
	);
};

export default ErrorMessage;
