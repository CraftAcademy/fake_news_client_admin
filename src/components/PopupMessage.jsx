import React, { useState } from 'react';
import { Portal, Segment, Button, Header } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

const PopupMessage = () => {
	const [popup, setPopup] = useState(false);
	const message = useSelector((state) => state.message);

	return (
		<Portal closeOnTriggerClick openOnTriggerChange trigger={<Button>Hello</Button>}>
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
