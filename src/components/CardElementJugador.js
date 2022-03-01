import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import COLORS from '../constants/Colors.json';
import JUEGOS from '../constants/Juegos.json';
import PropTypes from 'prop-types';
import DashboardJugadordorContext from '../context/DashboardJugadorContext';
import DashboardVerTorneo from './DashboardJugador/DashboardVerTorneo';
// import DashboardOrganizadorVerTorneo from './DashboardOrganizador/DashboardOrganizadorVerTorneo';
// import MaterialIcon from 'material-icons-react';
// import DashboardOrganizadorEditarTorneo from './DashboardOrganizador/DashboardOrganizadorEditarTorneo';

const CardElement = ({ data }) => {
	// console.log(data);
	const { changeComponent } = React.useContext(DashboardJugadordorContext);
	return (
		<Card
			sx={{
				backgroundColor: COLORS.secondary.main,
				minWidth: 310,
				borderRadius: '1rem',
			}}>
			<CardActionArea
				onClick={(e) =>
					changeComponent(
						<DashboardVerTorneo idTorneo={data.id_torneo}></DashboardVerTorneo>
					)
				}
				sx={{ p: 2 }}>
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
						<Typography sx={{ fontSize: '0.8rem' }} variant='span'>
							{JUEGOS[data.id_juego]}
						</Typography>
					</Grid>
					<Grid container justifyContent='end' item xs={6}>
						<Avatar
							sx={{ width: 64, height: 64 }}
							src='/assets/landing2.jpg'
							variant='rounded'
							aria-label='recipe'></Avatar>
					</Grid>
				</Grid>
				<CardContent sx={{ py: 0 }}>
					<Typography
						sx={{
							textAlign: 'justify',
							height: '6rem',
						}}
						variant='body2'
						color='text.secondary'>
						{data.description}
					</Typography>
					<Typography
						sx={{
							textAlign: 'justify',
						}}
						variant='body2'
						color='text.secondary'>
						Fin registro:{' '}
						{new Date(data.fecha_fin_registro).toLocaleString().split(' ')[0]}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};
CardElement.propTypes = {
	edicionHabilitada: PropTypes.any,
	data: PropTypes.any,
};
export default CardElement;
