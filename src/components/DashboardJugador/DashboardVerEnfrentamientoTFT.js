import {
	Avatar,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import AvatarImg from '../../pngegg.png';

const DashboardVerEnfrentamiento = ({ values }) => {
	return (
		<Grid container direction='column' justifyContent='center'>
			<Grid item>
				<Typography sx={{ color: 'white' }} variant='h3'>
					Participantes
				</Typography>
			</Grid>
			<Grid item>
				<TableContainer>
					<Table size='small' sx={{ overflowX: 'hidden' }}>
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell sx={{ color: 'white' }}>Nombre</TableCell>
								<TableCell sx={{ textAlign: 'end', color: 'white' }}>
									Posicion
								</TableCell>
								<TableCell sx={{ textAlign: 'end', color: 'white' }}>
									Puntaje
								</TableCell>
								<TableCell sx={{ textAlign: 'end', color: 'white' }}>
									# Enfrentamientos
								</TableCell>
								<TableCell sx={{ textAlign: 'end', color: 'white' }}>
									Daño Total
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{values?.json_data?.players &&
								values?.json_data?.players.map((element, index) => {
									return (
										<TableRow key={index}>
											<TableCell sx={{ color: 'white' }}>
												<Avatar
													src={element.image ? element.image : AvatarImg}
												/>
											</TableCell>
											<TableCell>
												<Typography
													sx={{ color: 'white' }}
													variant='body2'
													component='span'>
													{element.nombre}
												</Typography>
											</TableCell>
											<TableCell sx={{ textAlign: 'end', color: 'white' }}>
												<Typography variant='body2' component='span'>
													{element.posicion === -1
														? 'Sin posicion'
														: element.posicion}
												</Typography>
											</TableCell>
											<TableCell sx={{ textAlign: 'end', color: 'white' }}>
												<Typography variant='body2' component='span'>
													{element.puntaje_jugador || ''}
												</Typography>
											</TableCell>
											<TableCell sx={{ textAlign: 'end', color: 'white' }}>
												<Typography variant='body2' component='span'>
													{element.no_enfrentamientos_jugados || ''}
												</Typography>
											</TableCell>
											<TableCell sx={{ textAlign: 'end', color: 'white' }}>
												<Typography variant='body2' component='span'>
													{element.total_damage || ''}
												</Typography>
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</Grid>
	);
};
DashboardVerEnfrentamiento.propTypes = {
	values: PropTypes.any,
};

export default DashboardVerEnfrentamiento;
