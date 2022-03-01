import { CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';
const CircularDisplay = ({ data }) => {
	return (
		<Grid item>
			<Box
				sx={{
					position: 'relative',
					display: 'inline-flex',
				}}>
				<CircularProgress
					variant='determinate'
					color='secondary'
					size={250}
					value={data.progress ? data.progress : 100}></CircularProgress>
				<Box
					sx={{
						top: 0,
						left: 0,
						bottom: 0,
						right: 0,
						position: 'absolute',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<Typography
						sx={{ fontSize: 100, color: 'white' }}
						variant='caption'
						component='div'
						color='text.secondary'>
						{data.value ? data.value : '-'}
					</Typography>
				</Box>
			</Box>
			<Typography
				sx={{
					textAlign: 'center',
					fontSize: 30,
					fontWeight: 'bold',
					color: 'white',
				}}>
				{data.description ? data.description : '-'}
			</Typography>
		</Grid>
	);
};

CircularDisplay.propTypes = {
	data: PropTypes.any,
};

export default CircularDisplay;
