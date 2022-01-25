import { Alert, Grid } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const ResponseError = ({ error }) => {
	return (
		<Grid>
			{error && (
				<Alert severity='error' color='error'>
					Ocurrio un error: {error}
				</Alert>
			)}
		</Grid>
	);
};
ResponseError.propTypes = {
	error: PropTypes.any,
};

export default ResponseError;
