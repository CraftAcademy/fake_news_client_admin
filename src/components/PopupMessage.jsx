import React, { useState } from 'react';
import { Portal, Segment, Button, Header } from 'semantic-ui-react';

const PopupMessage = (props) => {
	const [popup, setPopup] = useState(false);

	return (
		<Portal
			closeOnTriggerClick
			openOnTriggerClick
			//trigger={}
	
      >
			<Segment
				style={{
					left: '40%',
					position: 'fixed',
					top: '50%',
					zIndex: 1000,
				}}>
				<Header>Success</Header>
				<p>{props.message}</p>
			</Segment>
		</Portal>
	);
};

export default PopupMessage;
