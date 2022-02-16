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
	TableRow,
	Tooltip,
	Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import getDataTorneo from '../../services/getDataTorneo';
import DashboardOrganizadorContext from '../../context/DashboardOrganizadorContext';
import ResponseError from '../ResponseError';
import JUEGOS from '../../constants/Juegos.json';
import COLORS from '../../constants/Colors.json';
import AvatarImg from '../../pngegg.png';
import MaterialIcon from 'material-icons-react';
const DashboardOrganizadorVerTorneo = ({ idTorneo }) => {
	// Context
	const { user } = React.useContext(DashboardOrganizadorContext);
	// States
	const [values, setValues] = React.useState(null);
	const [responseError, setResponseError] = React.useState(false);
	const [ganador, setGanador] = React.useState(null);
	// Handlers
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
		<Grid container justifyContent='center' direction='column'>
			<Grid
				sx={{ py: 5 }}
				container
				justifyContent='center'
				direction='column'
				item>
				<Grid item>
					<Typography variant='h2'>{values.torneo.nombre}</Typography>
				</Grid>
				<Grid sx={{ py: 2, px: 1, fontWeight: 'bold' }} item>
					<Typography variant='h5'>{JUEGOS[values.torneo.id_juego]}</Typography>
				</Grid>
				<Grid
					item
					container
					justifyContent={'start'}
					direction='row'
					sx={{
						display: 'flex',
						p: 1,
						alignItems: 'center',
						width: 'fit-content',
						border: `1px solid ${COLORS.secondary.main}`,
						borderRadius: 1,
						bgcolor: COLORS.primary.main,
						color: 'black',
						'& svg': {
							m: 1.5,
						},
						'& hr': {
							mx: 0.5,
						},
					}}>
					<Grid item sx={{ p: 0.5 }}>
						<Typography variant='span'>{values.torneo.description}</Typography>
					</Grid>
					<Divider
						sx={{ background: COLORS.secondary.main }}
						orientation='vertical'
						variant='middle'
						flexItem
					/>
					<Grid item sx={{ p: 0.5 }}>
						<Typography variant='span'>
							{' '}
							Fecha inicio:{' '}
							{new Date(values.torneo.fecha_inicio).toLocaleString()}
						</Typography>
					</Grid>
					<Divider
						sx={{ background: COLORS.secondary.main }}
						orientation='vertical'
						variant='middle'
						flexItem
					/>
					<Grid item sx={{ p: 0.5 }}>
						<Typography variant='span'>
							{' '}
							Fecha fin registro:{' '}
							{new Date(values.torneo.fecha_fin_registro).toLocaleString()}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			{ganador && (
				<Grid item container justifyContent='center' direction='column'>
					<Typography variant='h5'>Ganador: {ganador.nombre}</Typography>
				</Grid>
			)}
			<Grid
				sx={{ py: 5 }}
				item
				container
				justifyContent='center'
				direction='column'>
				<Typography variant='h4'>Participantes </Typography>
				<TableContainer>
					<Table sx={{ textAlign: 'end' }}>
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell>Nombre</TableCell>
								<TableCell sx={{ textAlign: 'end' }}>Posicion</TableCell>
								<TableCell sx={{ textAlign: 'end' }}>Puntaje</TableCell>
								<TableCell sx={{ textAlign: 'end' }}>
									# Enfrentamientos
								</TableCell>
								<TableCell sx={{ textAlign: 'end' }}>Daño Total</TableCell>
								{values.torneo.id_estado === 0 && (
									<TableCell sx={{ textAlign: 'center' }}>Acciones</TableCell>
								)}
							</TableRow>
						</TableHead>
						<TableBody>
							{values.participantes.map((element, index) => {
								return (
									<TableRow key={index}>
										{/* TFT */}
										<TableCell>
											<Avatar src={user.image ? user.image : AvatarImg} />
										</TableCell>
										<TableCell>
											<Typography variant='body2' component='span'>
												{element.nombre}
											</Typography>
										</TableCell>
										<TableCell sx={{ textAlign: 'end' }}>
											<Typography variant='body2' component='span'>
												{element.posicion === -1
													? 'Sin posicion'
													: element.posicion}
											</Typography>
										</TableCell>
										<TableCell sx={{ textAlign: 'end' }}>
											<Typography variant='body2' component='span'>
												{element.puntaje_jugador}
											</Typography>
										</TableCell>
										<TableCell sx={{ textAlign: 'end' }}>
											<Typography variant='body2' component='span'>
												{element.no_enfrentamientos_jugados}
											</Typography>
										</TableCell>
										<TableCell sx={{ textAlign: 'end' }}>
											<Typography variant='body2' component='span'>
												{element.total_damage}
											</Typography>
										</TableCell>
										{values.torneo.id_estado === 0 && (
											<TableCell sx={{ textAlign: 'center' }}>
												<Tooltip title='Expulsar jugador'>
													<IconButton>
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
			<Grid item>
				<ResponseError error={responseError}></ResponseError>
			</Grid>
		</Grid>
	);
};
DashboardOrganizadorVerTorneo.propTypes = {
	idTorneo: PropTypes.any,
};

export default DashboardOrganizadorVerTorneo;
