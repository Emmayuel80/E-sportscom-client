import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import MaterialIcon from 'material-icons-react';
import AvatarImg from '../pngegg.png';
import {
	Avatar,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function FullScreenDialog({
	open,
	setOpen,
	enfrentamiento,
	puuids,
}) {
	console.log(enfrentamiento);
	return (
		<Dialog
			fullScreen
			open={open}
			onClose={(e) => setOpen(false)}
			TransitionComponent={Transition}>
			<AppBar sx={{ position: 'relative' }}>
				<Toolbar>
					{' '}
					<Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
						Enfrentamiento ID: {enfrentamiento.idenfrentamiento_TFT}
					</Typography>
					<IconButton
						edge='start'
						color='inherit'
						onClick={(e) => setOpen(false)}
						aria-label='close'>
						<MaterialIcon icon='close'></MaterialIcon>
					</IconButton>
				</Toolbar>
			</AppBar>
			{enfrentamiento?.json_resultado?.info ? (
				<>
					<Grid item container justifyContent='center' sx={{ py: 5 }}>
						<Typography variant='h3' sx={{ color: 'white' }}>
							Tabla de resultados
						</Typography>
					</Grid>
					<TableContainer sx={{ p: 5 }}>
						<Table sx={{ overflowX: 'hidden' }}>
							<TableHead>
								<TableRow>
									<TableCell></TableCell>
									<TableCell sx={{ color: 'white' }}>Nombre</TableCell>
									<TableCell sx={{ textAlign: 'end', color: 'white' }}>
										Posicion
									</TableCell>
									<TableCell sx={{ textAlign: 'end', color: 'white' }}>
										Daño Total
									</TableCell>
									<TableCell sx={{ textAlign: 'end', color: 'white' }}>
										Jugadores eliminados
									</TableCell>
									<TableCell sx={{ textAlign: 'end', color: 'white' }}>
										Nivel alcanzado
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{enfrentamiento.json_resultado.info.participants.map(
									(participante, index) => {
										const participantePuuid = participante.puuid;
										return (
											<TableRow key={index}>
												{/* TFT */}
												<TableCell>
													<Avatar
														src={
															puuids[participantePuuid].image
																? puuids[participantePuuid].image
																: AvatarImg
														}
													/>
												</TableCell>
												<TableCell>
													<Typography
														sx={{ color: 'white' }}
														variant='body2'
														component='span'>
														{puuids[participantePuuid].nombre}
													</Typography>
												</TableCell>
												<TableCell sx={{ textAlign: 'end' }}>
													<Typography
														sx={{ color: 'white' }}
														variant='body2'
														component='span'>
														{participante.placement === -1
															? 'Sin posicion'
															: participante.placement}
													</Typography>
												</TableCell>
												<TableCell sx={{ textAlign: 'end' }}>
													<Typography
														sx={{ color: 'white' }}
														variant='body2'
														component='span'>
														{participante.total_damage_to_players}
													</Typography>
												</TableCell>
												<TableCell sx={{ textAlign: 'end' }}>
													<Typography
														sx={{ color: 'white' }}
														variant='body2'
														component='span'>
														{participante.players_eliminated}
													</Typography>
												</TableCell>
												<TableCell sx={{ textAlign: 'end' }}>
													<Typography
														sx={{ color: 'white' }}
														variant='body2'
														component='span'>
														{participante.level}
													</Typography>
												</TableCell>
											</TableRow>
										);
									}
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</>
			) : (
				<Grid
					sx={{ height: '100%' }}
					container
					justifyContent='center'
					alignItems='center'>
					<Typography variant='h4' sx={{ color: 'white' }}>
						No se han registrado los resultados aún
					</Typography>
				</Grid>
			)}
		</Dialog>
	);
}

FullScreenDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	enfrentamiento: PropTypes.object,
	puuids: PropTypes.object,
};
