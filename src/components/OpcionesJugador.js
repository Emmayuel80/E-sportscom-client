import React, { useContext } from 'react';
import { Grid, Button, Toolbar, Divider } from '@mui/material';
import DashBoardJugadorContext from '../context/DashboardJugadorContext';
import DashboardBuscarTorneos from './DashboardJugador/DashboardBuscarTorneos';
import DashboardMisEquipos from './DashboardJugador/DashboardMisEquipos';
const buttonExtraStyles = {
	fontSize: 20,
};

const OpcionesJugador = () => {
	const { changeComponent } = useContext(DashBoardJugadorContext);
	return (
		<Grid
			container
			alignItems='strech'
			justifyContent='space-around'
			direction='column'>
			<Toolbar />
			<Divider />
			<Button
				sx={buttonExtraStyles}
				onClick={(e) => changeComponent(<DashboardBuscarTorneos />)}
				variant='text'
				color='secondary'>
				Buscar Torneos
			</Button>
			<Button sx={buttonExtraStyles} variant='text' color='secondary'>
				Ver torneos activos
			</Button>
			<Button sx={buttonExtraStyles} variant='text' color='secondary'>
				Historial de torneos
			</Button>
			<Button
				sx={buttonExtraStyles}
				onClick={(e) => changeComponent(<DashboardMisEquipos />)}
				variant='text'
				color='secondary'>
				Mis equipos
			</Button>
			<Button sx={buttonExtraStyles} variant='text' color='secondary'>
				Ver bitacora
			</Button>
		</Grid>
	);
};
export default OpcionesJugador;
