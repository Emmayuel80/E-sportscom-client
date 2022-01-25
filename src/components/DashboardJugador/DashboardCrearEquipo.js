import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';

const DashboardCrearEquipo = () => {
	return (
		<Grid container direction='column' justifyContent='center'>
			<Grid container direction='row' justifyContent='center'>
				<Grid item xs={10}>
					<Typography variant='h4' color='secondary'>
						CREAR NUEVO EQUIPO
					</Typography>
				</Grid>
			</Grid>

			<Grid container direction='row' justifyContent='center' sx={{ py: 2 }}>
				<Grid
					item
					xs={10}
					sx={{ borderRadius: 1, backgroundColor: 'white', p: 1.5 }}>
					<TextField
						id='outlined-basic'
						label='Nombre del equipo'
						variant='outlined'
						color='primary'
						fullWidth
					/>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default DashboardCrearEquipo;
