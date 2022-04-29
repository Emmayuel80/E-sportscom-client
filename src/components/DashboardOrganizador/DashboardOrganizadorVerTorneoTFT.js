import {
	Avatar,
	Divider,
	Grid,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	Button,
	TableRow,
	Tooltip,
	Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import getDataTorneo from '../../services/organizador/getDataTorneo';
import DashboardOrganizadorContext from '../../context/DashboardOrganizadorContext';
import ResponseError from '../ResponseError';
import JUEGOS from '../../constants/Juegos.json';
import COLORS from '../../constants/Colors.json';
import AvatarImg from '../../pngegg.png';
import MaterialIcon from 'material-icons-react';
import expulsarJugador from '../../services/organizador/expulsarJugador';
import DialogBitacora from '../DialogBitacora';
import DialogEnfrentamientoTFT from '../DialogEnfrentamientoTFT';
import getBitacoraTorneo from '../../services/organizador/getBitacoraTorneo';
import CardEnfrentamientoTFT from '../CardEnfrentamientoTFT';
const DashboardOrganizadorVerTorneoTFT = ({ idTorneo }) => {
	// Context
	const { user } = React.useContext(DashboardOrganizadorContext);
	// States
	const [values, setValues] = React.useState(null);
	const [responseError, setResponseError] = React.useState(false);
	const [ganador, setGanador] = React.useState(null);
	const [disableAll, setDisableAll] = React.useState(false);
	const [openDialogBitacora, setOpenDialogBitacora] = React.useState(false);
	const [openDialogEnfrentamientoTFT, setOpenDialogEnfrentamientoTFT] =
		React.useState(false);
	const [bitacora, setBitacora] = React.useState([]);
	const [enfrentamientoSeleccionado, setEnfrentamientoSeleccionado] =
		React.useState({});
	const [enfrentamientos, setEnfrentamientos] = React.useState(null);
	// Handlers
	const handleBitacoraEquipo = () => {
		getBitacoraTorneo(user, idTorneo, setBitacora, setResponseError).then(
			() => {
				setOpenDialogBitacora(true);
			}
		);
	};
	const handleEnfrentamientoSeleccionado = (enfrentamiento) => {
		setOpenDialogEnfrentamientoTFT(true);
		setEnfrentamientoSeleccionado(enfrentamiento);
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
			setEnfrentamientos(values.partidas);
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
			<Grid item container justifyContent='start'>
				<Grid item xs={12}>
					<Button
						variant='contained'
						color='secondary'
						onClick={handleBitacoraEquipo}>
						Ver bitacora de torneo.
					</Button>
				</Grid>
			</Grid>
			<Grid
				sx={{ width: '80vw' }}
				xs={12}
				item
				container
				justifyContent='center'
				direction='column'>
				<Typography sx={{ color: 'white', mt: 5 }} variant='h4'>
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
								{values.torneo.id_estado === 0 && (
									<TableCell sx={{ textAlign: 'center', color: 'white' }}>
										Acciones
									</TableCell>
								)}
							</TableRow>
						</TableHead>
						<TableBody>
							{values.participantes.map((element, index) => {
								return (
									<TableRow key={index}>
										{/* TFT */}
										<TableCell>
											<Avatar src={element.image ? element.image : AvatarImg} />
										</TableCell>
										<TableCell>
											<Typography
												sx={{ color: 'white' }}
												variant='body2'
												component='span'>
												{element.nombre}
											</Typography>
										</TableCell>
										<TableCell sx={{ textAlign: 'end' }}>
											<Typography
												sx={{ color: 'white' }}
												variant='body2'
												component='span'>
												{element.posicion === -1
													? 'Sin posicion'
													: element.posicion}
											</Typography>
										</TableCell>
										<TableCell sx={{ textAlign: 'end' }}>
											<Typography
												sx={{ color: 'white' }}
												variant='body2'
												component='span'>
												{element.puntaje_jugador}
											</Typography>
										</TableCell>
										<TableCell sx={{ textAlign: 'end' }}>
											<Typography
												sx={{ color: 'white' }}
												variant='body2'
												component='span'>
												{element.no_enfrentamientos_jugados}
											</Typography>
										</TableCell>
										<TableCell sx={{ textAlign: 'end' }}>
											<Typography
												sx={{ color: 'white' }}
												variant='body2'
												component='span'>
												{element.total_damage}
											</Typography>
										</TableCell>
										{values.torneo.id_estado === 0 && (
											<TableCell sx={{ textAlign: 'center' }}>
												<Tooltip title='Expulsar jugador'>
													<IconButton
														disabled={disableAll}
														onClick={(e) =>
															expulsarJugador(
																user.token,
																element.id_usuario,
																idTorneo,
																setResponseError,
																values,
																setValues,
																setDisableAll
															)
														}>
														<MaterialIcon icon='person_off'></MaterialIcon>
													</IconButton>
												</Tooltip>
											</TableCell>
										)}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
			{values?.torneo?.id_estado === 2 && (
				<Grid container item>
					<Grid item sx={{ my: 5 }} xs={12}>
						<Typography sx={{ color: 'white' }} variant='h4'>
							Enfrentamientos{' '}
						</Typography>
					</Grid>
					<Grid
						sx={{ width: '80vw' }}
						xs={12}
						item
						container
						justifyContent='start'
						direction='column'>
						{enfrentamientos &&
							enfrentamientos?.map((enfrentamiento, i) => {
								return (
									<Grid
										onClick={(e) =>
											handleEnfrentamientoSeleccionado(enfrentamiento)
										}
										item
										key={i}
										sx={{ py: 2.5 }}>
										<CardEnfrentamientoTFT
											data={{
												...enfrentamiento,
												nombre: `ID Enfrentamiento: ${enfrentamiento.idenfrentamiento_TFT}`,
											}}
											textFecha={'Fecha jugada:'}
											propertieFecha={'fecha_jugada'}></CardEnfrentamientoTFT>
									</Grid>
								);
							})}
					</Grid>
				</Grid>
			)}
			<Grid item>
				<ResponseError error={responseError}></ResponseError>
			</Grid>
			<DialogBitacora
				open={openDialogBitacora}
				setOpen={setOpenDialogBitacora}
				bitacoraArray={bitacora}></DialogBitacora>
			<DialogEnfrentamientoTFT
				setOpen={setOpenDialogEnfrentamientoTFT}
				open={openDialogEnfrentamientoTFT}
				enfrentamiento={enfrentamientoSeleccionado}
				puuids={values.puuids}></DialogEnfrentamientoTFT>
		</Grid>
	);
};
DashboardOrganizadorVerTorneoTFT.propTypes = {
	idTorneo: PropTypes.any,
};

export default DashboardOrganizadorVerTorneoTFT;
