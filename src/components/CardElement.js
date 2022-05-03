import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import COLORS from '../constants/Colors.json';
import JUEGOS from '../constants/Juegos.json';
import PropTypes from 'prop-types';
import DashboardOrganizadorContext from '../context/DashboardOrganizadorContext';
import DashboardOrganizadorVerTorneoTFT from './DashboardOrganizador/DashboardOrganizadorVerTorneoTFT';
import DashboardOrganizadorVerTorneoLOL from './DashboardOrganizador/DashboardOrganizadorVerTorneoLOL';
// import MaterialIcon from 'material-icons-react';
import DashboardOrganizadorEditarTorneo from './DashboardOrganizador/DashboardOrganizadorEditarTorneo';

const CardElement = ({ edicionHabilitada = true, data }) => {
	const { changeComponent } = React.useContext(DashboardOrganizadorContext);
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
						data.id_juego === 1 ? (
							<DashboardOrganizadorVerTorneoLOL idTorneo={data.id_torneo} />
						) : (
							<DashboardOrganizadorVerTorneoTFT idTorneo={data.id_torneo} />
						)
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
					<Grid item xs={6}>
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
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Grid
					item
					container
					direction='row'
					justifyContent='space-around'
					alignItems='center'>
					{edicionHabilitada && (
						<Grid item sx={{ px: 1 }} xs={12}>
							<Button
								onClick={(e) =>
									changeComponent(
										<DashboardOrganizadorEditarTorneo torneoData={data} />
									)
								}
								fullWidth
								size='small'
								variant='outlined'
								color='primary'>
								Editar
							</Button>
						</Grid>
					)}
				</Grid>
			</CardActions>
		</Card>
	);
};
CardElement.propTypes = {
	edicionHabilitada: PropTypes.any,
	data: PropTypes.any,
};
export default CardElement;
