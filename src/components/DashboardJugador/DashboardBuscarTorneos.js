import React from 'react';
import {
	Grid,
	TextField,
	Button,
	Pagination,
	Skeleton,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@mui/material';
import CardElementJugador from '../CardElementJugador';
import getTorneosActivos from '../../services/jugador/getTorneosActivos';
import DashBoardJugadorContext from '../../context/DashboardJugadorContext';
// import IconButton from '@mui/material/IconButton';
import MaterialIcon from 'material-icons-react';
import getTournamentByCode from '../../services/jugador/getTournamentByCode';
import ResponseError from '../ResponseError';
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
	// Context
	const { user, changeComponent } = React.useContext(DashBoardJugadorContext);

	// State
	const [searchValue, setSearchValue] = React.useState('');
	const [torneos, setTorneos] = React.useState({});
	const [paginationCount, setPaginationCount] = React.useState(0);
	const [values, setValues] = React.useState({ codigo: '' });
	const [responseError, setResponseError] = React.useState(false);
	const [open, setOpen] = React.useState(false);

	// Handlers
	const handleClose = () => {
		setOpen(false);
		setValues({ codigo: '' });
	};

	const handleSubmit = () => {
		getTournamentByCode(
			user.token,
			values.codigo,
			setResponseError,
			changeComponent
		);
		setValues({ codigo: '' });
		setOpen(false);
	};
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};
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

	// useEffect
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
					xs={8}
					lg={10}
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
					<Button
						onClick={(e) => setOpen(true)}
						variant='contained'
						color='secondary'>
						BUSCAR POR CÓDIGO
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
									md={6}
									lg={4}
									xl={3}>
									<CardElementJugador
										data={element}
										edicionHabilitada={false}></CardElementJugador>
								</Grid>
							);
						})
					) : torneos.err ? (
						<Grid
							item
							container
							justifyContent='space-around'
							direction='column'>
							<Typography variant='h4'>
								No existen torneos con ese nombre
							</Typography>
						</Grid>
					) : torneos.error ? (
						<Typography variant='h3' sx={{ color: 'white' }}>
							No se han encontrado torneos disponibles.
						</Typography>
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
			<Grid item>
				<ResponseError error={responseError}></ResponseError>
			</Grid>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle sx={{ color: 'white' }}>
					Buscar torneo por código
				</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ color: 'white' }}>
						Por favor introduce el código del torneo
					</DialogContentText>
					<TextField
						color='secondary'
						autoFocus
						margin='dense'
						label='Codigo de torneo'
						type='text'
						fullWidth
						value={values.codigo ? values.codigo : ''}
						onChange={handleChange('codigo')}
					/>
				</DialogContent>
				<DialogActions>
					<Button color='secondary' variant='contained' onClick={handleClose}>
						Cancelar
					</Button>
					<Button color='secondary' variant='contained' onClick={handleSubmit}>
						Unirse
					</Button>
				</DialogActions>
			</Dialog>
		</Grid>
	);
};

export default DashboardVerJugador;
