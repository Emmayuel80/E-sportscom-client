import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import COLORS from '../constants/Colors.json';
import PropTypes from 'prop-types';

import DashboardJugadordorContext from '../context/DashboardJugadorContext';
// import DashboardOrganizadorVerTorneo from './DashboardOrganizador/DashboardOrganizadorVerTorneo';
// import MaterialIcon from 'material-icons-react';
// import DashboardOrganizadorEditarTorneo from './DashboardOrganizador/DashboardOrganizadorEditarTorneo';

const CardEnfrentamientoTFT = ({ data }) => {
	// console.log(data);
	const { changeComponent } = React.useContext(DashboardJugadordorContext);
	return (
		<Card
			sx={{
				backgroundColor: COLORS.secondary.main,
				minWidth: 310,
				borderRadius: '1rem',
			}}>
			<CardActionArea onClick={(e) => changeComponent(<></>)} sx={{ p: 2 }}>
				<Grid
					sx={{ py: 1.5, px: 1.5 }}
					justifyContent='space-between'
					alignItems='center'
					item
					container
					direction='row'>
					<Grid item xs={6} sx={{ height: '70px' }}>
						<Typography
							sx={{ overflowWrap: 'break-word', inlineSize: '200px' }}
							variant='h5'>
							{data.nombre}
						</Typography>
					</Grid>
					<Grid container justifyContent='end' item xs={6}>
						<Typography
							sx={{ overflowWrap: 'break-word', inlineSize: '200px' }}
							variant='h5'>
							fecha creado: {new Date(data.fecha_creado).toLocaleString()}
						</Typography>
					</Grid>
				</Grid>
				<CardContent sx={{ py: 0 }}></CardContent>
			</CardActionArea>
		</Card>
	);
};
CardEnfrentamientoTFT.propTypes = {
	edicionHabilitada: PropTypes.any,
	data: PropTypes.any,
};
export default CardEnfrentamientoTFT;
