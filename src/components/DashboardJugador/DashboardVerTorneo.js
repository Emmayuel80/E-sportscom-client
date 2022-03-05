import {
	Divider,
	Grid,
	Typography,
	Avatar,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import getDataTorneo from '../../services/jugador/getDataTorneo.js';
import DashboardJugadorContext from '../../context/DashboardJugadorContext';
import ResponseError from '../ResponseError';
import JUEGOS from '../../constants/Juegos.json';
import COLORS from '../../constants/Colors.json';
import AvatarImg from '../../pngegg.png';
import unirseTorneoTFT from '../../services/jugador/unirseTorneoTFT.js';
import DashboardBuscarTorneos from './DashboardBuscarTorneos';
import DashboardVerMisTorneosInscritos from './DashboardVerMisTorneosInscritos';
const DashboardVerTorneo = ({ idTorneo }) => {
	// Context
	const { user, changeComponent } = React.useContext(DashboardJugadorContext);
	// States
	const [values, setValues] = React.useState(null);
	const [responseError, setResponseError] = React.useState(false);
	const [ganador, setGanador] = React.useState(null);

	const [open, setOpen] = React.useState(false);

	// Handlers
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	// UseEffect
	React.useEffect(() => {
		getDataTorneo(user.token, idTorneo, setResponseError, setValues);
	}, []);

	React.useEffect(() => {
		if (values) {
			console.log(values);
			if (values.torneo.id_estado === 4) {
				console.log(`id_edo: ${values.torneo.id_estado}`);
				const firstPos = values.participantes.filter(
					(participante) => participante.posicion === 1
				);
				setGanador(firstPos[0]);
			}
		}
	}, [values]);

	console.log(ganador);
	return !values ? (
		<Grid item></Grid>
	) : (
		<Grid container justifyContent='center' direction='row'>
			<Grid
				sx={{ py: 5 }}
				container
				justifyContent='center'
				direction='row'
				item>
				<Grid item xs={12}>
					<Typography sx={{ color: 'white' }} variant='h2'>
						{values.torneo.nombre}
					</Typography>
				</Grid>
				<Grid xs={12} sx={{ py: 2, px: 1, fontWeight: 'bold' }} item>
					<Typography sx={{ color: 'white' }} variant='h5'>
						{JUEGOS[values.torneo.id_juego]}
					</Typography>
				</Grid>
				<Grid
					item
					container
					justifyContent={'start'}
					xs={12}
					direction='row'
					sx={{
						display: 'flex',
						px: 0.3,
						alignItems: 'center',
						width: 'fit-content',
						border: `1px solid ${COLORS.secondary.main}`,
						borderRadius: 1,
						bgcolor: COLORS.primary.main,
						color: 'black',
						'& svg': {
							m: 0.5,
						},
						'& hr': {
							mx: 0.5,
						},
					}}>
					<Grid item sx={{ px: 0.5 }}>
						<Typography sx={{ color: 'white' }} variant='span'>
							{values.torneo.description}
						</Typography>
					</Grid>
					<Divider
						sx={{ background: COLORS.secondary.main }}
						orientation='vertical'
						variant='middle'
						flexItem
					/>
					<Grid item sx={{ px: 0.5 }}>
						<Typography sx={{ color: 'white' }} variant='span'>
							{' '}
							Fecha inicio:{' '}
							{new Date(values.torneo.fecha_inicio).toLocaleDateString()}
						</Typography>
					</Grid>
					<Divider
						sx={{ background: COLORS.secondary.main }}
						orientation='vertical'
						variant='middle'
						flexItem
					/>
					<Grid item sx={{ px: 0.5 }}>
						<Typography sx={{ color: 'white' }} variant='span'>
							{' '}
							Fecha fin registro:{' '}
							{new Date(values.torneo.fecha_fin_registro).toLocaleDateString()}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			{ganador && (
				<Grid item container justifyContent='center' direction='row'>
					<Typography sx={{ color: 'white' }} variant='h5'>
						Ganador: {ganador.nombre}
					</Typography>
				</Grid>
			)}
			<Grid
				sx={{ width: '80vw' }}
				xs={12}
				item
				container
				justifyContent='center'
				direction='column'>
				<Grid
					item
					xs={4}
					container
					direction='row'
					justifyContent='start'
					alignItems='center'>
					{!values.torneo.participantes.some(
						(value) => value.id_usuario === user.id_usuario
					) && (
						<Button
							onClick={(e) =>
								unirseTorneoTFT(
									user,
									values.torneo.id_torneo,
									setResponseError,
									handleClickOpen
								)
							}
							variant='contained'
							color='secondary'>
							UNIRSE AL TORNEO
						</Button>
					)}
				</Grid>

				<Typography sx={{ color: 'white' }} variant='h4'>
					Participantes{' '}
				</Typography>
				<TableContainer>
					<Table sx={{ overflowX: 'hidden' }}>
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell sx={{ color: 'white' }}>Nombre</TableCell>
								<TableCell sx={{ textAlign: 'end', color: 'white' }}>
									Posicion
								</TableCell>
								<TableCell sx={{ textAlign: 'end', color: 'white' }}>
									Puntaje
								</TableCell>
								<TableCell sx={{ textAlign: 'end', color: 'white' }}>
									# Enfrentamientos
								</TableCell>
								<TableCell sx={{ textAlign: 'end', color: 'white' }}>
									Daño Total
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{values?.torneo?.participantes &&
								values.torneo.participantes.map((element, index) => {
									return (
										<TableRow key={index}>
											<TableCell sx={{ color: 'white' }}>
												<Avatar
													src={element.image ? element.image : AvatarImg}
												/>
											</TableCell>
											<TableCell>
												<Typography
													sx={{ color: 'white' }}
													variant='body2'
													component='span'>
													{element.nombre}
												</Typography>
											</TableCell>
											<TableCell sx={{ textAlign: 'end', color: 'white' }}>
												<Typography variant='body2' component='span'>
													{element.posicion === -1
														? 'Sin posicion'
														: element.posicion}
												</Typography>
											</TableCell>
											<TableCell sx={{ textAlign: 'end', color: 'white' }}>
												<Typography variant='body2' component='span'>
													{element.puntaje_jugador}
												</Typography>
											</TableCell>
											<TableCell sx={{ textAlign: 'end', color: 'white' }}>
												<Typography variant='body2' component='span'>
													{element.no_enfrentamientos_jugados}
												</Typography>
											</TableCell>
											<TableCell sx={{ textAlign: 'end', color: 'white' }}>
												<Typography variant='body2' component='span'>
													{element.total_damage}
												</Typography>
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
			<Grid item>
				<ResponseError error={responseError}></ResponseError>
			</Grid>
			{responseError ? (
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'>
					<DialogTitle
						sx={{ color: 'white', fontWeight: 'bold' }}
						id='alert-dialog-title'>
						{'Error'}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id='alert-dialog-description'>
							<Typography sx={{ color: 'white' }} variant='h5'>
								No fue posible unirte al torneo: {responseError}
							</Typography>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							variant='contained'
							color='secondary'
							onClick={(e) =>
								changeComponent(
									<DashboardBuscarTorneos></DashboardBuscarTorneos>
								)
							}
							autoFocus>
							Aceptar
						</Button>
					</DialogActions>
				</Dialog>
			) : (
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'>
					<DialogTitle
						sx={{ color: 'white', fontWeight: 'bold' }}
						id='alert-dialog-title'>
						{'Unirse a torneo'}
					</DialogTitle>
					<DialogContent>
						<DialogContentText
							sx={{ color: 'white' }}
							id='alert-dialog-description'>
							Te has unido a un torneo
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							variant='contained'
							color='secondary'
							onClick={(e) =>
								changeComponent(
									<DashboardVerMisTorneosInscritos></DashboardVerMisTorneosInscritos>
								)
							}
							autoFocus>
							Aceptar
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</Grid>
	);
};
DashboardVerTorneo.propTypes = {
	idTorneo: PropTypes.any,
};

export default DashboardVerTorneo;
