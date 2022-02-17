import { Button, Grid, Toolbar, Divider } from '@mui/material';
import React, { useContext } from 'react';
import DashBoardOrganizadorContext from '../context/DashboardOrganizadorContext';
import DashboardOrganizadorInicio from './DashboardOrganizador/DashboardOrganizadorInicio';
import DashboardOrganizadorCrearTorneo from './DashboardOrganizador/DashboardOrganizadorCrearTorneo';
import DashboardOrganizadorMisTorneos from './DashboardOrganizador/DashboardOrganizadorMisTorneos';
import DashboardOrganizadorVerHistorialDeTorneos from './DashboardOrganizador/DashboardOrganizadorVerHistorialDeTorneos';

const buttonExtraStyles = {
	fontSize: 20,
};

const OpcionesOrganizador = () => {
	const { changeComponent } = useContext(DashBoardOrganizadorContext);
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
				onClick={(e) => changeComponent(<DashboardOrganizadorInicio />)}
				variant='text'
				color='secondary'>
				Inicio
			</Button>
			<Button
				onClick={(e) => changeComponent(<DashboardOrganizadorCrearTorneo />)}
				sx={buttonExtraStyles}
				variant='text'
				color='secondary'>
				Crear torneo
			</Button>
			<Button
				onClick={(e) => changeComponent(<DashboardOrganizadorMisTorneos />)}
				sx={buttonExtraStyles}
				variant='text'
				color='secondary'>
				Mis torneos
			</Button>
			<Button
				onClick={(e) =>
					changeComponent(<DashboardOrganizadorVerHistorialDeTorneos />)
				}
				sx={buttonExtraStyles}
				variant='text'
				color='secondary'>
				Historial de torneos
			</Button>
			<Button sx={buttonExtraStyles} variant='text' color='secondary'>
				Ver bitacora torneos
			</Button>
		</Grid>
	);
};

export default OpcionesOrganizador;
