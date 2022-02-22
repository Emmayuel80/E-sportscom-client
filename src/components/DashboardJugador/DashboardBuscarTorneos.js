import React from 'react';
import { Grid, TextField, Button, Pagination, Skeleton } from '@mui/material';
import CardElementJugador from '../CardElementJugador';
import getTorneosActivos from '../../services/jugador/getTorneosActivos';
import DashBoardJugadorContext from '../../context/DashboardJugadorContext';
// import IconButton from '@mui/material/IconButton';
import MaterialIcon from 'material-icons-react';
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
	const [searchValue, setSearchValue] = React.useState('');
	const [torneos, setTorneos] = React.useState({});
	const [paginationCount, setPaginationCount] = React.useState(0);
	const handleSearchChange = (event) => {
		setSearchValue(event.target.value);
		if (event.key === 'Enter') {
			// alert('Enter');
			handleSearch();
		}
	};
	const getPaginationCalc = () => {
		const n = parseInt(torneos.total) / cantidad;
		setPaginationCount(n % 1 === 0 ? n : parseInt(n + 1));
	};
	const handlePaginationChange = (event, index) => {
		getTorneosActivos(index, cantidad, user, setTorneos, searchValue);
	};

	const handleSearch = () => {
		getTorneosActivos(0, cantidad, user, setTorneos, searchValue);
	};
	React.useEffect(() => {
		// tournaments/:inicio/:cantidad
		if (user.token) {
			getTorneosActivos(0, cantidad, user, setTorneos);
		}
	}, [user]);

	React.useEffect(() => {
		if (torneos.total) {
			getPaginationCalc();
		}
	}, [torneos]);

	return (
		<Grid container direction='column' justifyContent='center'>
			<Grid
				item
				container
				direction='row'
				justifyContent='center'
				sx={{ pt: 4 }}>
				<Grid
					item
					xs={10}
					sx={{
						borderTopLeftRadius: 5,
						borderBottomLeftRadius: 5,
						backgroundColor: 'white',
						p: 1.5,
					}}>
					<TextField
						onChange={handleSearchChange}
						id='outlined-basic'
						label='Buscar torneo'
						variant='outlined'
						color='primary'
						fullWidth
						onKeyDown={handleSearchChange}
					/>
				</Grid>
				<Grid item>
					<Button
						sx={{
							borderRadius: 0,
							borderTopRightRadius: 5,
							borderBottomRightRadius: 5,
							height: '100%',
							p: 1.5,
						}}
						variant='contained'
						color='secondary'
						onClick={handleSearch}>
						<MaterialIcon icon='search'></MaterialIcon>
					</Button>
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
