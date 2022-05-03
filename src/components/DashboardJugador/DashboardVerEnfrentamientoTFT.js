import {
	Avatar,
	Button,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	CircularProgress,
	Backdrop,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import DashBoardJugadorContext from '../../context/DashboardJugadorContext';
import AvatarImg from '../../pngegg.png';
import getResultadoEnfrentamientosTFT from '../../services/jugador/getResultadoEnfrentamientosTFT';
import ResponseError from '../ResponseError';

const DashboardVerEnfrentamiento = ({ values }) => {
	// Context
	const { user, changeComponent } = React.useContext(DashBoardJugadorContext);
	const [open, setOpen] = React.useState(false);
	const [responseError, setResponseError] = React.useState(false);

	const handleRegistrarResultados = () => {
		setOpen(true);
		getResultadoEnfrentamientosTFT(
			user,
			values.idenfrentamiento_TFT,
			values.id_torneo,
			changeComponent,
			setOpen,
			setResponseError
		);
	};

	return (
		<Grid container direction='column' justifyContent='center'>
			<Grid item sx={{ py: 3 }}>
				<Typography sx={{ color: 'white' }} variant='h3'>
					Participantes
				</Typography>
			</Grid>
			{user && values.json_data.captain.id_usuario === user.id_usuario && (
				<Grid item sx={{ py: 3 }}>
					<Button
						onClick={handleRegistrarResultados}
						variant='contained'
						color='secondary'>
						Registrar Resultados del enfrentamiento
					</Button>
				</Grid>
			)}
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}>
				<CircularProgress color='inherit' />
				<Typography variant='h3' sx={{ color: 'white', ml: 4 }}>
					Esperando por resultados, no recargues la página ...
				</Typography>
			</Backdrop>
			<Grid item sx={{ py: 3 }}>
				<Grid item>
					<Typography sx={{ color: 'white' }} variant='h5'>
						Capitan del enfrentamiento:
					</Typography>
				</Grid>
				<Grid
					container
					justifyContent='start'
					item
					xs={12}
					sx={{ px: 3, py: 3 }}>
					<Grid item xs={1}>
						<Avatar
							src={
								values.json_data.captain.image
									? values.json_data.captain.image
									: AvatarImg
							}
						/>
					</Grid>
					<Grid item xs={6}>
						<Typography sx={{ color: 'white' }} variant='h4'>
							{values.json_data.captain.nombre_invocador}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item sx={{ py: 1 }}>
				<TableContainer>
					<Table size='small' sx={{ overflowX: 'hidden' }}>
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell sx={{ color: 'white' }}>Nombre</TableCell>
								<TableCell sx={{ textAlign: 'end', color: 'white' }}>
									Posición
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
							{values?.json_data?.players &&
								values?.json_data?.players.map((element, index) => {
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
														? 'Sin posición'
														: element.posicion}
												</Typography>
											</TableCell>
											<TableCell sx={{ textAlign: 'end', color: 'white' }}>
												<Typography variant='body2' component='span'>
													{element.puntaje_jugador || ''}
												</Typography>
											</TableCell>
											<TableCell sx={{ textAlign: 'end', color: 'white' }}>
												<Typography variant='body2' component='span'>
													{element.no_enfrentamientos_jugados || ''}
												</Typography>
											</TableCell>
											<TableCell sx={{ textAlign: 'end', color: 'white' }}>
												<Typography variant='body2' component='span'>
													{element.total_damage || ''}
												</Typography>
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
			<ResponseError error={responseError} />
		</Grid>
	);
};
DashboardVerEnfrentamiento.propTypes = {
	values: PropTypes.any,
};

export default DashboardVerEnfrentamiento;
