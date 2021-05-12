import React from 'react';
import { Grid, GridColumn, Image } from 'semantic-ui-react';

const LogInLandingpage = () => {
	return (
		<>
			<Grid divided columns={2}>
				<Grid.Column >
					<Image fluid
						data-cy='landing-image'
						src='../images/ufo admin login.jpg'
						alt='UFO image'
					/>
				</Grid.Column>
        <Grid.Column>
          
        </Grid.Column>
			</Grid>
		</>
	);
};

export default LogInLandingpage;
