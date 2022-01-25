import React from 'react';
import { Grid, TextField, Button, Typography } from '@mui/material';
import CardInfo from '../CardInfo';

const cardData = [
	{ title: 'Torneo 1', description: 'lorem' },
	{ title: 'Torneo 2', description: 'lorem' },
	{ title: 'Torneo 3', description: 'lorem' },
	{ title: 'Torneo 4', description: 'lorem' },
	{ title: 'Torneo 5', description: 'lorem' },
];
const DashboardVerJugador = () => {
	return (
		<Grid container direction='column' justifyContent='center'>
			<Grid container direction='row' justifyContent='center' sx={{ mb: 1 }}>
				<Grid
					item
					xs={10}
					sx={{ borderRadius: 1, backgroundColor: 'white', p: 1.5 }}>
					<TextField
						id='outlined-basic'
						label='Buscar torneo'
						variant='outlined'
						color='primary'
						fullWidth
					/>
				</Grid>
			</Grid>
			<Grid container direction='row' justifyContent='center'>
				<Grid item xs={10}>
					<Button variant='contained' color='secondary'>
						UNIRSE POR CODIGO
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
								<Typography variant='p'>{element.description}</Typography>
							</CardInfo>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default DashboardVerJugador;
