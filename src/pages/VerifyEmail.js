import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PublicForm from '../components/PublicForm';

const VerifyEmail = () => {
	const { id, token } = useParams();
	const [responseError, setResponseError] = React.useState(false);

	const verifyEmail = () => {
		fetch(`${process.env.REACT_APP_API_URL}/verifyEmail/${id}/${token}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.name) {
					setResponseError(response.name);
				}
			})
			.catch((error) => {
				setResponseError(error.toString());
			});
	};

	React.useEffect(() => {
		verifyEmail();
	}, []);

	return (
		<Grid>
			<Navbar isPublic={true}></Navbar>
			{!responseError ? (
				<Grid container sx={{ minHeight: '100vh', textAlign: 'center' }}>
					<PublicForm>
						<Grid item sx={{ py: 1 }}>
							<Typography variant='h4'>Se ha verificado tu correo</Typography>
						</Grid>
						<Grid item sx={{ py: 1 }}>
							<Button
								href='/login'
								fullWidth
								variant='contained'
								color='primary'>
								Ir a iniciar sesion
							</Button>
						</Grid>
					</PublicForm>
				</Grid>
			) : (
				<Grid container sx={{ minHeight: '100vh', textAlign: 'center' }}>
					<PublicForm>
						<Grid item sx={{ py: 1 }}>
							<Typography variant='h4'>
								Ocurrio un error: {responseError}
							</Typography>
						</Grid>
						<Grid item sx={{ py: 1 }}>
							<Button
								href='/login'
								fullWidth
								variant='contained'
								color='primary'>
								Ir a iniciar sesion
							</Button>
						</Grid>
					</PublicForm>
				</Grid>
			)}
		</Grid>
	);
};

export default VerifyEmail;
