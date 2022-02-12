import { Grid, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import getDataTorneo from '../../services/getDataTorneo';
import DashboardOrganizadorContext from '../../context/DashboardOrganizadorContext';
import ResponseError from '../ResponseError';
import JUEGOS from '../../constants/Juegos.json';

const DashboardOrganizadorVerTorneo = ({ idTorneo }) => {
	// Context
	const { user } = React.useContext(DashboardOrganizadorContext);
	// States
	const [values, setValues] = React.useState(null);
	const [responseError, setResponseError] = React.useState(false);
	// Handlers
	// UseEffect
	React.useEffect(() => {
		getDataTorneo(user.token, idTorneo, setResponseError, setValues);
	}, []);

	return !values ? (
		<Grid item></Grid>
	) : (
		<Grid container>
			<Grid container justifyContent='center' direction='column' item>
				<Grid item>
					<Typography variant='h3'>{values.torneo.nombre}</Typography>
				</Grid>
				<Grid item>
					<Typography variant='h4'>{JUEGOS[values.torneo.id_juego]}</Typography>
				</Grid>
				<Grid item>
					<Typography variant='h4'>Descripción</Typography>
				</Grid>
				<Grid item>
					<Typography variant='h5'>{values.torneo.description}</Typography>
				</Grid>
				<Grid item>
					<Typography variant='h5'>
						{' '}
						Fecha inicio:{' '}
						{new Date(values.torneo.fecha_inicio).toLocaleString()}
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant='h5'>
						{' '}
						Fecha fin registro:{' '}
						{new Date(values.torneo.fecha_fin_registro).toLocaleString()}
					</Typography>
				</Grid>
			</Grid>
			<Grid item>
				{values.participantes.map((element, index) => {
					return (
						<Grid
							key={index}
							item
							container
							justifyContent='space-around'
							direction='row'>
							<Typography variant='h6'>{element.nombre}</Typography>
							<Typography variant='h6'>{element.posicion}</Typography>
						</Grid>
					);
				})}
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
