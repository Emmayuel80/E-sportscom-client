import React from 'react';
import { Grid, Typography, Button } from '@mui/material';

const buttonStyles = {
	px: 3,
	py: 2,
	fontSize: '1.5rem',
	width: '100%',
};
const Landing = () => {
	return (
		<Grid
			container
			justifyContent='center'
			alignItems='center'
			direction='column'
			sx={{
				backgroundImage: 'url(./assets/landing3.jpg)',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				minHeight: '100vh',
				minWidth: '100vw',
				color: 'white',
			}}>
			{/* <img
				src='./assets/landing.jpeg'
				sx={{ position: 'absolute', top: 0, left: 0 }}></img> */}
			<Grid item container justifyContent='center'>
				<Typography variant='h2' sx={{ fontWeight: 'bold' }}>
					E-SPORTSCOM
				</Typography>
			</Grid>
			<Grid item container justifyContent='center' xs={12} sx={{ p: 5 }}>
				<Typography variant='h4'>
					¡Hola Gamer! Bienvenido a la comunidad de E-sports de ESCOM.
				</Typography>
			</Grid>
			<Grid
				xs={12}
				item
				container
				justifyContent='space-evenly'
				direction='row'>
				<Grid item xs={12} md={8} lg={4}>
					<Button
						href='/login'
						variant='contained'
						color='primary'
						sx={buttonStyles}>
						Iniciar Sesion
					</Button>
				</Grid>

				<Grid item xs={12} md={8} lg={4}>
					<Button
						href='/register'
						variant='contained'
						color='secondary'
						sx={buttonStyles}>
						Registro
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Landing;
