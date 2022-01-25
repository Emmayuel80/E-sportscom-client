import React, { useContext } from 'react';
import { Button, Grid, List, ListItem } from '@mui/material';
import CardInfo from '../CardInfo';
import DashBoardJugadorContext from '../../context/DashboardJugadorContext';
import DashboardCrearEquipo from './DashboardCrearEquipo';

const cardData = [
	{ title: 'Equipo 1', jugadores: ['Juanito', 'Luis', 'Carlos'] },
	{
		title: 'Equipo 2',
		jugadores: ['Juanito', 'Luis', 'Miguel', 'Carlos', 'Jose'],
	},
];
const DashboardMisEquipos = () => {
	const { changeComponent } = useContext(DashBoardJugadorContext);

	return (
		<Grid container direction='column' justifyContent='center'>
			<Grid
				container
				direction='row'
				sx={{ px: 22 }}
				alignItems='center'
				justifyContent=''>
				<Grid item xs={2}>
					<Button variant='contained' color='secondary'>
						UNIRTE A UN EQUIPO
					</Button>
				</Grid>
				<Grid item xs={2}>
					<Button
						onClick={(e) => changeComponent(<DashboardCrearEquipo />)}
						variant='contained'
						color='secondary'>
						CREAR EQUIPO
					</Button>
				</Grid>
			</Grid>
			<Grid
				container
				direction='row'
				sx={{ overflow: 'auto' }}
				spacing={2}
				alignItems='center'
				justifyContent='center'>
				<Grid container item xs={10}>
					{cardData.map((element) => (
						<Grid key={JSON.stringify(element)} item xs={4}>
							<CardInfo data={element}>
								<List dense>
									{element.jugadores.map((jugador, index) => (
										<ListItem key={jugador + index}>{jugador}</ListItem>
									))}
								</List>
							</CardInfo>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default DashboardMisEquipos;
