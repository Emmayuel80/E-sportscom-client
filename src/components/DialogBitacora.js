import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Grid,
	Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import MaterialIcon from 'material-icons-react';
const DialogBitacora = ({ open, setOpen, bitacoraArray }) => {
	const handleClose = () => {
		setOpen(false);
	};
	const descriptionElementRef = React.useRef(null);
	React.useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open]);
    const textStyle = {
        color: 'white',
    };

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			scroll={'paper'}
			aria-labelledby='scroll-dialog-title'
			aria-describedby='scroll-dialog-description'>
			<DialogTitle id='scroll-dialog-title' sx={{color: 'white'}}>Bitacora</DialogTitle>
			<DialogContent dividers={scroll === 'paper'}>
				{bitacoraArray.map((register, index) => {
					return (
						<Grid
							item
							xs={12}
							key={index}>
							<Grid sx={{ px: 5 }} item container alignItems={'center'}>
								<MaterialIcon
									size='small'
									icon='access_time_filled'></MaterialIcon>
								<Typography
									variant='h6'
									sx={{ textAlign: 'left', ...textStyle }}>
									{new Date(register.fecha_modificacion).toLocaleString()}
								</Typography>
							</Grid>
							<Grid item xs={12} sx={{ px: 5 }}>
								<Typography variant='h6'>
									{register.desc_modificacion.split('\n').map((item, index) => {
										return (
											<Grid key={index}>
												<Typography sx={textStyle} variant='span'>
													{' '}
													{item}{' '}
												</Typography>
												<br />
											</Grid>
										);
									})}
									<Divider
										sx={{ background: 'white', my: 2 }}
										light={true}></Divider>
								</Typography>
							</Grid>
							<br />
						</Grid>
					);
				})}
			</DialogContent>
			<DialogActions>
				<Button variant="contained" color="secondary" onClick={handleClose}>Cerrar</Button>
			</DialogActions>
		</Dialog>
	);
};

DialogBitacora.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
    bitacoraArray: PropTypes.array.isRequired,
};

export default DialogBitacora;
