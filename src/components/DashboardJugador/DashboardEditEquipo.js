import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	ImageList,
	ImageListItem,
	TextField,
	Typography,
} from '@mui/material';
import PublicForm from '../PublicForm';
import ResponseError from '../ResponseError';
import DashBoardJugadorContext from '../../context/DashboardJugadorContext';
import editEquipo from '../../services/jugador/editEquipo';
import PropTypes from 'prop-types';

const DashboardEditEquipo = ({ idEquipo, nombre, logoBefore }) => {
	const { user, changeComponent } = React.useContext(DashBoardJugadorContext);
	const [values, setValues] = React.useState({
		nombre: nombre,
		id_equipo: idEquipo,
	});
	const [logo, setLogo] = React.useState(logoBefore);
	const [responseError, setResponseError] = React.useState(false);

	// Handlers
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Grid container direction='column' justifyContent='center'>
			<PublicForm>
				<Grid container direction='row' justifyContent='center'>
					<Grid item xs={10}>
						<Typography variant='h4' color='primary'>
							EDITAR EQUIPO
						</Typography>
					</Grid>
				</Grid>

				<Grid
					container
					direction='row'
					justifyContent='space-around'
					sx={{ py: 2 }}>
					<Grid sx={{ py: 5 }} item xs={10}>
						<TextField
							id='outlined-basic'
							label='Nombre del equipo'
							variant='outlined'
							color='primary'
							value={values.nombre}
							onChange={handleChange('nombre')}
							fullWidth
						/>
					</Grid>
					{logo && (
						<Grid sx={{ pb: 5 }} container justifyContent='space-around'>
							<Typography variant='h4'>Logo: </Typography>
							<img
								style={{ height: 'auto', width: 'auto' }}
								src={logo}
								alt={'Logo'}
							/>
						</Grid>
					)}
					<Grid item sx={{ pb: 3 }} xs={10}>
						<Button
							onClick={(e) => setOpen(true)}
							fullWidth
							variant='outlined'
							color='primary'>
							Seleccionar logo
						</Button>
					</Grid>
					<Grid item sx={{ pb: 2 }} xs={10}>
						<Button
							onClick={(e) =>
								editEquipo(
									user,
									{
										id_equipo: values.id_equipo,
										nombre: values.nombre,
										logo: logo,
									},
									setResponseError,
									changeComponent
								)
							}
							fullWidth
							variant='contained'
							color='primary'>
							Guardar equipo
						</Button>
					</Grid>
				</Grid>
				<ResponseError error={responseError} />
			</PublicForm>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'>
				<DialogTitle
					sx={{ color: 'white', fontWeight: 'bold' }}
					id='alert-dialog-title'>
					{'Selecciona un logo'}
				</DialogTitle>
				<DialogContent>
					<ImageList cols={3} gap={25}>
						{Array(9)
							.fill()
							.map((item, index) => {
								return (
									<ImageListItem
										sx={{
											width: 'auto',
											height: 'auto',
										}}
										onClick={(e) =>
											setLogo(`/assets/team-icons/logo${index}.png`)
										}
										key={index}>
										<img
											draggable='false'
											style={{
												height: 'auto',
												width: 'auto',
												userDrag: 'none',
											}}
											src={`/assets/team-icons/logo${index}.png`}
											alt={`logo${index}`}
										/>
									</ImageListItem>
								);
							})}
					</ImageList>
					{logo && (
						<Grid container justifyContent='space-around'>
							<Typography sx={{ color: 'white' }} variant='h4'>
								Seleccionado:{' '}
							</Typography>
							<img
								style={{ height: 'auto', width: 'auto' }}
								src={logo}
								alt={logo}
							/>
						</Grid>
					)}
					<a
						style={{ textDecoration: 'none', color: 'white', fontSize: '10px' }}
						href='https://www.vecteezy.com/free-vector/sports-logo'>
						Sports Logo Vectors by Vecteezy
					</a>
				</DialogContent>
				<DialogActions>
					<Button
						variant='contained'
						color='secondary'
						onClick={(e) => setOpen(false)}
						autoFocus>
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>
		</Grid>
	);
};
DashboardEditEquipo.propTypes = {
	nombre: PropTypes.string,
	idEquipo: PropTypes.number,
	logoBefore: PropTypes.string,
};
export default DashboardEditEquipo;
