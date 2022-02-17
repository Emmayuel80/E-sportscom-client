import { Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import Navbar from '../components/Navbar';
import PublicForm from '../components/PublicForm';
import ResponseError from '../components/ResponseError';

const ForgotPassword = () => {
	const [sentEmail, setSentEmail] = React.useState(false);
	const [values, setValues] = React.useState({
		email: '',
	});
	const [responseError, setResponseError] = React.useState(false);
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const validateEmail = (email) => {
		return email.match(
			// eslint-disable-next-line no-useless-escape
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	};
	const handleRestablecer = () => {
		if (values.email === '') {
			setResponseError('Campos vacios');
			return;
		}
		if (!validateEmail(values.email)) {
			setResponseError('Email invalido');
			return;
		}
		fetch(`${process.env.REACT_APP_API_URL}/forgotPassword`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: values.email,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.error) {
					setResponseError(response.error);
				} else {
					setSentEmail(true);
				}
			})
			.catch((error) => {
				setResponseError(error.toString());
			});
	};

	React.useEffect(() => {}, []);
	return (
		<Grid container sx={{ minHeight: '100vh' }}>
			<Navbar isPublic={true}></Navbar>
			<PublicForm pady={5}>
				{!sentEmail ? (
					<Grid>
						<Grid sx={{ py: 1, textAlign: 'center' }} item>
							<Typography variant='h4'>Recupera tu cuenta</Typography>
						</Grid>
						<Grid sx={{ py: 1 }} item>
							<Typography variant='p'>
								Ingresa tu correo electrónico para buscar tu cuenta.
							</Typography>
						</Grid>
						<Grid sx={{ py: 1 }} item>
							<TextField
								fullWidth
								placeholder='Correo a restaurar'
								label='Email'
								type='email'
								value={values.email}
								onChange={handleChange('email')}></TextField>
						</Grid>
						<Grid sx={{ py: 1 }} item>
							<Button fullWidth onClick={handleRestablecer} variant='contained'>
								Restablecer Contraseña
							</Button>
						</Grid>
						<ResponseError error={responseError}></ResponseError>{' '}
					</Grid>
				) : (
					<Grid>
						<Typography variant='h6'>
							Se envio un correo de restablecimiento de contraseña a la <br />
							dirección <b>{values.email}</b>, siga los pasos que se le indican{' '}
							<br />
							para restablecer su contraseña.
						</Typography>
					</Grid>
				)}
			</PublicForm>
		</Grid>
	);
};

export default ForgotPassword;
