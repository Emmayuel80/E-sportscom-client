import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,	
	Skeleton,
	TextField,
} from '@mui/material';

import DashBoardJugadorContext from '../../context/DashboardJugadorContext';
import DashboardCrearEquipo from './DashboardCrearEquipo';
import getEquipos from '../../services/jugador/getEquipos';
import ResponseError from '../ResponseError';
import CardEquipo from '../CardEquipo';
import joinEquipo from '../../services/jugador/joinEquipo';

const DashboardMisEquipos = () => {
	// Context
	const { changeComponent, user } = React.useContext(DashBoardJugadorContext);

	// State
	const [equipos, setEquipos] = React.useState([]);
	const [values, setValues] = React.useState({ codigo: '' });
	const [responseError, setResponseError] = React.useState(false);

	// Handler
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async () => {
		await joinEquipo(user, values.codigo, setResponseError, setOpen);
		if (!responseError) {
			await getEquipos(user, setEquipos, setResponseError);
			setValues({ codigo: '' });
		}
		setValues({ codigo: '' });
	};

	// useEffect
	React.useEffect(() => {
		getEquipos(user, setEquipos, setResponseError);
	}, []);

	return (
		<Grid item xs={12} container justifyContent='center' direction='row'>
			<Grid
				container
				item
				direction='row'
				sx={{}}
				alignItems='center'
				justifyContent='space-around'
				xs={12}>
				<Grid item xs={2}>
					<Button
						onClick={handleClickOpen}
						variant='contained'
						color='secondary'>
						UNIRTE A UN EQUIPO
					</Button>
				</Grid>
				<Grid item xs={2}>
					<Button
						onClick={(e) => changeComponent(<DashboardCrearEquipo />)}
						variant='contained'
						color='secondary'>
						CREAR EQUIPO
					</Button>
				</Grid>
			</Grid>
			{equipos ? (
				<Grid
					container
					direction='row'
					sx={{ overflow: 'auto', marginTop: '1rem' }}
					spacing={2}
					alignItems='center'
					justifyContent='center'>
					<Grid
						item
						container
						justifyContent='space-around'
						direction='row'
						gap={2}>
						{equipos &&
							equipos.map((element) => (
								<Grid
									key={JSON.stringify(element)}
									item
									xs={12}
									sm={12}
									md={12}
									lg={12}>
									<CardEquipo data={element}></CardEquipo>
								</Grid>
							))}
					</Grid>
					<Grid item>
						<ResponseError error={responseError}></ResponseError>
					</Grid>
				</Grid>
			) : (
				<Grid item container justifyContent='space-around' direction='column'>
					<Skeleton variant='rectangular' width={'80%'} height={200} />
					<Skeleton width={'80%'} height={20} />
					<Skeleton width={'80%'} height={20} />
				</Grid>
			)}
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle sx={{ color: 'white' }}>Unirse a un equipo</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ color: 'white' }}>
						Por favor introduce el código del equipo
					</DialogContentText>
					<TextField
						color='secondary'
						autoFocus
						margin='dense'
						label='Codigo de equipo'
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

export default DashboardMisEquipos;
