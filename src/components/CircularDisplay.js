import { CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';
const CircularDisplay = ({ data, fontSize = 100, size = 250 }) => {
	return (
		<Grid item container justifyContent='center' xs={12} direction='column'>
			<Grid item container justifyContent='center'>
				<Box
					sx={{
						position: 'relative',
						display: 'inline-flex',
					}}>
					<CircularProgress
						variant='determinate'
						color='secondary'
						size={size}
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
							sx={{ fontSize: fontSize, color: 'white', textAlign: 'center' }}
							variant='caption'
							component='div'
							color='text.secondary'>
							{data.value ? data.value : '-'}
						</Typography>
					</Box>
				</Box>
			</Grid>
			<Grid item>
				<Typography
					sx={{
						textAlign: 'center',
						fontSize: fontSize * 0.3,
						fontWeight: 'bold',
						color: 'white',
						wordWrap: 'break-word',
					}}>
					{data.description ? data.description : '-'}
				</Typography>
			</Grid>
		</Grid>
	);
};

CircularDisplay.propTypes = {
	data: PropTypes.any,
	fontSize: PropTypes.number,
	size: PropTypes.number,
};

export default CircularDisplay;
