import { Grid, IconButton, Snackbar } from '@mui/material';
import React from 'react';
import MaterialIcon from 'material-icons-react';
import PropTypes from 'prop-types';

const CopyToClipboard = ({
	setOpen,
	open,
	copy,
	msg = 'Se ha copiado al portapapeles',
}) => {
	const handleClipboard = (e) => {
		navigator.clipboard.writeText(copy);
		setOpen(true);
	};
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};
	return (
		<Grid sx={{ display: 'inline' }}>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={open}
				onClose={handleClose}
				message={msg}
				action={
					<IconButton
						size='small'
						aria-label='close'
						color='inherit'
						onClick={handleClose}>
						<MaterialIcon icon='close'></MaterialIcon>
					</IconButton>
				}></Snackbar>
			<IconButton variant='secondary' onClick={handleClipboard}>
				<MaterialIcon icon='content_copy'></MaterialIcon>
			</IconButton>
		</Grid>
	);
};

CopyToClipboard.propTypes = {
	setOpen: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	copy: PropTypes.string.isRequired,
	msg: PropTypes.string,
};

export default CopyToClipboard;
