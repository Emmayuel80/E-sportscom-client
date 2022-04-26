import {
	Avatar,
	Collapse,
	Divider,
	Grid,
	IconButton,
	List,
	ListItemText,
	Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import getDataTorneo from '../../services/organizador/getDataTorneo';
import DashboardOrganizadorContext from '../../context/DashboardOrganizadorContext';
import ResponseError from '../ResponseError';
import JUEGOS from '../../constants/Juegos.json';
import COLORS from '../../constants/Colors.json';
import ETAPAS from '../../constants/Etapas.json';
import MaterialIcon from 'material-icons-react';
import expulsarJugador from '../../services/organizador/expulsarJugador';
const DashboardOrganizadorVerTorneoLOL = ({ idTorneo }) => {
	// Context
	const { user } = React.useContext(DashboardOrganizadorContext);
	// States
	const [values, setValues] = React.useState(null);
	const [responseError, setResponseError] = React.useState(false);
	const [ganador, setGanador] = React.useState(null);
	const [disableAll, setDisableAll] = React.useState(false);
	const [equiposInscritos, setEquiposInscritos] = React.useState({});
	const [logos, setLogos] = React.useState([]);
	const [verEquipo, setVerEquipo] = React.useState([]);
	const [idEquipos, setIdEquipos] = React.useState([]);
	const [etapas, setEtapas] = React.useState({});

	// Handlers
	const handleExpandEquipo = (index) => {
		const newVerEquipo = verEquipo.slice();
		newVerEquipo[index] = !newVerEquipo[index];
		setVerEquipo(newVerEquipo);
	};
	// UseEffect
	React.useEffect(() => {
		getDataTorneo(user.token, idTorneo, setResponseError, setValues);
	}, []);

	React.useEffect(() => {
		if (values) {
			console.log(values);
			if (values.torneo.id_estado === 3) {
				console.log(`id_edo: ${values.torneo.id_estado}`);
				const firstPos = values.participantes.filter(
					(participante) => participante.posicion === 1
				);
				setGanador(firstPos[0]);
			}

			const participantes = values.participantes;
			const equipos = {};
			const logos = [];
			const verEquipoAux = [];
			const idEquiposAux = [];
			participantes.forEach((participante) => {
				if (equipos[participante.equipo]) {
					equipos[participante.equipo].push(participante);
				} else {
					equipos[participante.equipo] = [participante];
					idEquiposAux.push(participante.id_equipo);
					logos.push(participante.logo);
					verEquipoAux.push(false);
				}
			});
			setIdEquipos(idEquiposAux);
			setEquiposInscritos(equipos);
			setVerEquipo(verEquipoAux);
			setLogos(logos);

			const partidas = values.partidas;
			const etapasAux = {};
			partidas.forEach((partida) => {
				if (etapasAux[partida.etapa]) {
					etapasAux[partida.etapa].push(partida);
				} else {
					etapasAux[partida.etapa] = [partida];
				}
			});
			console.log(etapasAux);
			setEtapas(etapasAux);
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
			<Grid item xs={12}>
				<Typography sx={{ color: 'white' }} variant='h4'>
					Partidas en curso
				</Typography>
			</Grid>
			{etapas &&
				Object.values(etapas).map((etapa, index) => {
					return (
						<Grid key={JSON.stringify(etapa) + index} item xs={12}>
							<Grid item xs={12}>
								<Typography sx={{ color: 'white' }} variant='h4'>
									Etapa: {ETAPAS[etapa[0].etapa]}
								</Typography>
							</Grid>
							<Divider sx={{ backgroundColor: 'white' }} />
							{etapa &&
								etapa.map((partida) => {
									return (
										<Grid key={JSON.stringify(partida)}>
											<Grid item xs={12}>
												<Typography sx={{ color: 'white' }} variant='h6'>
													{!partida?.id_ganador
														? 'Fecha a jugar'
														: 'Fecha jugada'}
													: {new Date(partida?.fecha_jugada).toLocaleString()}
												</Typography>
											</Grid>
											<Grid item xs={12}>
												{partida.equipo1 && (
													<Grid container>
														<Grid
															sx={{
																backgroundColor: COLORS.secondary.main,
																borderRadius: '1rem',
																width: '100%',
																my: 3,
															}}>
															<Grid
																sx={{ py: 1.5, px: 1.5 }}
																justifyContent='space-between'
																alignItems='center'
																item
																container
																direction='row'>
																<Grid item xs={6} sx={{ height: '70px' }}>
																	<Typography
																		sx={{
																			overflowWrap: 'break-word',
																			inlineSize: '200px',
																		}}
																		variant='h5'>
																		{partida.equipo1}
																	</Typography>
																</Grid>
																<Grid
																	container
																	justifyContent='end'
																	item
																	xs={6}>
																	<Avatar
																		sx={{ width: 64, height: 64 }}
																		src={partida.logo1}
																		variant='rounded'
																		aria-label='recipe'></Avatar>
																</Grid>
															</Grid>
														</Grid>
														<Grid item xs={12} sx={{ mb: 3 }}>
															<Typography
																sx={{ color: 'white', textAlign: 'center' }}
																variant='h4'>
																VS
															</Typography>
														</Grid>
														<Grid
															sx={{
																backgroundColor: COLORS.secondary.main,
																borderRadius: '1rem',
																width: '100%',
																mb: 5,
															}}>
															<Grid
																sx={{ py: 1.5, px: 1.5 }}
																justifyContent='space-between'
																alignItems='center'
																item
																container
																direction='row'>
																<Grid item xs={6} sx={{ height: '70px' }}>
																	<Typography
																		sx={{
																			overflowWrap: 'break-word',
																			inlineSize: '200px',
																		}}
																		variant='h5'>
																		{partida.equipo2}
																	</Typography>
																</Grid>
																<Grid
																	container
																	justifyContent='end'
																	item
																	xs={6}>
																	<Avatar
																		sx={{ width: 64, height: 64 }}
																		src={partida.equipo2.logo2}
																		variant='rounded'
																		aria-label='recipe'></Avatar>
																</Grid>
															</Grid>
														</Grid>
													</Grid>
												)}
											</Grid>
										</Grid>
									);
								})}
						</Grid>
					);
				})}
			<Grid item container alignItems='center' xs={12} sx={{ mb: 0, pb: 0 }}>
				<Typography sx={{ color: 'white' }} variant='h4'>
					Participantes{' '}
				</Typography>
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
				justifyContent='start'
				direction='column'>
				<List
					sx={{ width: '100%', bgcolor: 'background.paper' }}
					component='nav'
					aria-labelledby='nested-list-subheader'>
					{equiposInscritos &&
						Object.keys(equiposInscritos).map((equipo, index) => {
							console.log(equipo);
							return (
								<Grid key={JSON.stringify(equipo) + index} item sx={{ pb: 5 }}>
									<Grid
										container
										justifyContent='space-between'
										direction='row'>
										<Grid
											item
											xs={values.torneo.id_estado === 0 ? 11 : 12}
											sx={{
												backgroundColor: COLORS.secondary.main,
												borderRadius: '1rem',
												width: '100%',
											}}
											onClick={(e) => handleExpandEquipo(index)}>
											<Grid
												sx={{ py: 1.5, px: 1.5 }}
												justifyContent='space-between'
												alignItems='center'
												item
												container
												direction='row'>
												<Grid item xs={6} sx={{ height: '70px' }}>
													<Typography
														sx={{
															overflowWrap: 'break-word',
															inlineSize: '200px',
														}}
														variant='h5'>
														{equipo}
													</Typography>
												</Grid>
												<Grid container justifyContent='end' item xs={6}>
													<Avatar
														sx={{ width: 64, height: 64 }}
														src={logos[index]}
														variant='rounded'
														aria-label='recipe'></Avatar>
												</Grid>
											</Grid>
										</Grid>
										{values.torneo.id_estado === 0 && (
											<Grid
												container
												justifyContent='center'
												alignItems='center'
												item
												xs={1}>
												<IconButton
													disabled={disableAll}
													size={'large'}
													onClick={(e) =>
														expulsarJugador(
															user.token,
															idEquipos[index],
															idTorneo,
															setResponseError,
															values,
															setValues,
															setDisableAll,
															true
														)
													}>
													<MaterialIcon
														size={50}
														icon='group_remove'></MaterialIcon>
												</IconButton>
											</Grid>
										)}
									</Grid>
									<Grid item xs={values.torneo.id_estado === 0 ? 11 : 12}>
										<Collapse
											in={verEquipo[index]}
											timeout='auto'
											unmountOnExit>
											<List
												sx={{
													backgroundColor: `${COLORS.secondary.main}DD`,
													borderRadius: '1rem',
													p: 2,
												}}
												component='div'
												disablePadding>
												{equiposInscritos[equipo] &&
													equiposInscritos[equipo].map(
														(participante, index) => (
															<>
																<Grid
																	key={
																		JSON.stringify(participante) +
																		index +
																		equipo
																	}
																	container
																	sx={{ p: 1 }}
																	direction='row'>
																	<Avatar src={participante.image}></Avatar>
																	<ListItemText
																		key={
																			JSON.stringify(participante) +
																			equipo +
																			index
																		}
																		sx={{ p: 1 }}
																		primary={participante.nombre}
																	/>
																</Grid>
																<Divider />
															</>
														)
													)}
											</List>
										</Collapse>
									</Grid>
								</Grid>
							);
						})}
				</List>
			</Grid>
			<Grid item>
				<ResponseError error={responseError}></ResponseError>
			</Grid>
		</Grid>
	);
};
DashboardOrganizadorVerTorneoLOL.propTypes = {
	idTorneo: PropTypes.any,
};

export default DashboardOrganizadorVerTorneoLOL;
