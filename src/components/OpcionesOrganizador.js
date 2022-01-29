import { Button, Grid } from '@mui/material';
import React, { useContext } from 'react';
import DashBoardOrganizadorContext from '../context/DashboardOrganizadorContext';
import DashboardOrganizadorInicio from './DashboardOrganizador/DashboardOrganizadorInicio';

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
			<Button
				sx={buttonExtraStyles}
				onClick={(e) => changeComponent(<DashboardOrganizadorInicio />)}
				variant='text'
				color='secondary'>
				Inicio
			</Button>
			<Button sx={buttonExtraStyles} variant='text' color='secondary'>
				Crear torneo
			</Button>
			<Button sx={buttonExtraStyles} variant='text' color='secondary'>
				Mis torneos
			</Button>
			<Button sx={buttonExtraStyles} variant='text' color='secondary'>
				Historial de torneos
			</Button>
			<Button sx={buttonExtraStyles} variant='text' color='secondary'>
				Ver bitacora torneos
			</Button>
		</Grid>
	);
};

export default OpcionesOrganizador;
