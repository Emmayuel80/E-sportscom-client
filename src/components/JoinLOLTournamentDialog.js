import {
	AppBar,
	Dialog,
	IconButton,
	Toolbar,
	Typography,
	Slide,
	Grid,
	Avatar,
	Button,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'material-icons-react';
import COLORS from '../constants/Colors.json';
import getEquiposInscribibles from '../services/jugador/getEquiposInscribibles';
import ResponseError from './ResponseError';
import unirseTorneoLOL from '../services/jugador/unirseTorneoLOL';
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});
const JoinLOLTournamentDialog = ({ open, handleClose, token, idTorneo }) => {
	const [equipos, setEquipos] = React.useState([]);
	const [equipoSeleccionado, setEquipoSeleccionado] = React.useState(null);
	const [responseError, setResponseError] = React.useState(false);

	React.useEffect(() => {
		getEquiposInscribibles(token, setEquipos);
	}, []);

	return (
		<Dialog
			fullScreen
			open={open}
			onClose={handleClose}
			TransitionComponent={Transition}>
			<AppBar sx={{ position: 'relative' }}>
				<Toolbar>
					<IconButton
						edge='start'
						color='inherit'
						onClick={handleClose}
						aria-label='close'>
						<MaterialIcon icon='close'></MaterialIcon>
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
						Inscribirse a torneo
					</Typography>
				</Toolbar>
			</AppBar>
			<Grid
				container
				direction='column'
				item
				xs={12}
				sx={{ px: 10, py: 5 }}
				alignItems='center'>
				<Grid>
					<Typography sx={{ color: 'white', fontSize: '2rem' }} variant='h4'>
						Selecciona el equipo con el que te quieres unir
					</Typography>
				</Grid>
				{equipos &&
					equipos.map((equipo, i) => {
						return (
							<Grid
								item
								onClick={(e) => setEquipoSeleccionado(equipo)}
								key={JSON.stringify(equipo) + i}
								sx={{
									backgroundColor: COLORS.secondary.main,
									borderRadius: '2rem',
									width: '100%',
									p: 2,
									margin: '1rem 0',
									border: equipoSeleccionado === equipo ? '5px solid white' : 'none',
									opacity: equipoSeleccionado === equipo ? 1 : 0.5,
								}}>
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
											{equipo.nombre}
										</Typography>
									</Grid>
									<Grid container justifyContent='end' item xs={6}>
										<Avatar
											sx={{ width: 64, height: 64 }}
											src={equipo.logo}
											variant='rounded'
											aria-label='recipe'></Avatar>
									</Grid>
								</Grid>
							</Grid>
						);
					})}
			</Grid>
			{equipoSeleccionado && (
				<Grid
					sx={{ p: 10 }}
					item
					xs={12}
					direction='column'
					container
					justifyContent='end'>
					<Button
						sx={{ fontSize: '2rem' }}
						onClick={(e) =>
							unirseTorneoLOL(
								token,
								idTorneo,
								equipoSeleccionado.id_equipo,
								setResponseError,
								handleClose
							)
						}
						variant='contained'
						color='secondary'>
						UNIRSE A TORNEO
					</Button>
					<ResponseError error={responseError}></ResponseError>
				</Grid>
			)}
		</Dialog>
	);
};

JoinLOLTournamentDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired,
	idTorneo: PropTypes.number.isRequired,
};

export default JoinLOLTournamentDialog;
