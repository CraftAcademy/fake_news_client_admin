import React, { useState } from 'react';
import { Portal, Segment, Button, Header } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

const PopupMessage = (props) => {
	const [popup, setPopup] = useState(true);
	const message = useSelector((state) => state.message);
	const popupOpen = useSelector((state) => state.popupOpen)
	const dispatch = useDispatch()


	return (
		<Portal closeOnDocumentClick 
		 onClose={() => dispatch({type: 'CLOSE_MESSAGE'})} 
		open={popupOpen}>
			<Segment
				style={{
					left: '40%',
					position: 'fixed',
					top: '50%',
					zIndex: 1000,
				}}>
				<Header>Success</Header>
				<p>{message}</p>
			</Segment>
		</Portal>
	);
};

export default PopupMessage;
