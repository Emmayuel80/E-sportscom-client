import React from 'react';
import { Grid, TextField, Button, Pagination, Skeleton } from '@mui/material';
import CardElementJugador from '../CardElementJugador';
import getTorneosActivos from '../../services/jugador/getTorneosActivos';
import DashBoardJugadorContext from '../../context/DashboardJugadorContext';

// const cardData = [
// 	{ nombre: 'Torneo 1', id_juego: '2', description: 'lorem' },
// 	{ nombre: 'Torneo 2', id_juego: '2', description: 'lorem' },
// 	{ nombre: 'Torneo 3', id_juego: '2', description: 'lorem' },
// 	{ nombre: 'Torneo 4', id_juego: '2', description: 'lorem' },
// 	{ nombre: 'Torneo 5', id_juego: '2', description: 'lorem' },
// 	{ nombre: 'Torneo 5', id_juego: '2', description: 'lorem' },
// ];
const cantidad = 6;
const DashboardVerJugador = () => {
	const { user } = React.useContext(DashBoardJugadorContext);
	const [torneos, setTorneos] = React.useState({});
	const [paginationCount, setPaginationCount] = React.useState(0);

	const getPaginationCalc = () => {
		const n = parseInt(torneos.total) / cantidad;
		setPaginationCount(n % 1 === 0 ? n : parseInt(n + 1));
	};
	const handlePaginationChange = (event, index) => {
		getTorneosActivos(index, cantidad, user, setTorneos, torneos);
	};

	React.useEffect(() => {
		// tournaments/:inicio/:cantidad
		if (user.token) {
			getTorneosActivos(0, cantidad, user, setTorneos, torneos);
		}
	}, [user]);

	React.useEffect(() => {
		if (torneos.total) {
			getPaginationCalc();
		}
	}, [torneos]);

	return (
		<Grid container direction='column' justifyContent='center'>
			<Grid container direction='row' justifyContent='center' sx={{ pt: 4 }}>
				<Grid
					item
					xs={10}
					sx={{ borderRadius: 1, backgroundColor: 'white', p: 1.5 }}>
					<TextField
						id='outlined-basic'
						label='Buscar torneo'
						variant='outlined'
						color='primary'
						fullWidth
					/>
				</Grid>
			</Grid>
			<Grid container direction='row' justifyContent='center'>
				<Grid item xs={10} sx={{ py: 2 }}>
					<Button variant='contained' color='secondary'>
						UNIRSE POR CODIGO
					</Button>
				</Grid>
			</Grid>
			<Grid
				container
				item
				direction='row'
				sx={{ overflow: 'auto' }}
				alignItems='center'
				justifyContent='space-around'>
				<Grid container item xs={10} gap={2} justifyContent='space-around'>
					{torneos.torneos ? (
						torneos.torneos.map((element, index) => {
							return (
								<Grid
									key={JSON.stringify(element) + index}
									item
									xs={12}
									sm={6}
									md={4}
									lg={3}>
									<CardElementJugador
										data={element}
										edicionHabilitada={false}></CardElementJugador>
								</Grid>
							);
						})
					) : (
						<Grid
							item
							container
							justifyContent='space-around'
							direction='column'>
							<Skeleton variant='rectangular' width={310} height={200} />
							<Skeleton width={310} height={20} />
							<Skeleton width={310} height={20} />
						</Grid>
					)}
				</Grid>
				<Grid
					sx={{ pt: 3 }}
					container
					justifyContent='center'
					item
					xs={12}
					direction='row'>
					{torneos.total && (
						<Pagination
							onChange={handlePaginationChange}
							size='small'
							count={paginationCount}
							color='secondary'
						/>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default DashboardVerJugador;
