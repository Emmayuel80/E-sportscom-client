import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

const PublicForm = ({ children, pady = 10, padx = 5, minWidth = '25%' }) => {
	return (
		<Grid
			container
			sx={{ py: 10 }}
			justifyContent='center'
			alignItems='center'
			direction='column'>
			<Grid
				container
				justifyContent='center'
				alignItems='center'
				direction='column'
				item>
				<Grid
					sx={{
						backgroundColor: '#F4D160',
						borderRadius: 5,
						py: pady,
						px: padx,
						minWidth: minWidth,
					}}>
					{children}
				</Grid>
			</Grid>
		</Grid>
	);
};
PublicForm.propTypes = {
	children: PropTypes.any,
	padx: PropTypes.number,
	pady: PropTypes.number,
	minWidth: PropTypes.string,
};

export default PublicForm;
