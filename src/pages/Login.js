import React from 'react';
import {
	Grid,
	Typography,
	TextField,
	Button,
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
} from '@mui/material';
import MaterialIcon from 'material-icons-react';
import Navbar from '../components/Navbar';
import PublicForm from '../components/PublicForm';
import ResponseError from '../components/ResponseError';
const Login = () => {
	const [values, setValues] = React.useState({
		email: '',
		password: '',
		showPassword: false,
	});

	const [responseError, setResponseError] = React.useState(false);
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};
	const validateEmail = (email) => {
		return email.match(
			// eslint-disable-next-line no-useless-escape
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	};

	const handleInciarSesion = () => {
		if (values.email === '' && values.password === '') {
			setResponseError('Campos vacios');
			return;
		}
		if (!validateEmail(values.email)) {
			setResponseError('Email invalido');
			return;
		}
		fetch(`${process.env.REACT_APP_API_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: values.email,
				password: values.password,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.error) {
					setResponseError(response.error);
				} else {
					localStorage.setItem('data', JSON.stringify(response.data));
					if (response.data.tipo === 'jugador') {
						window.location.href = '/dashboardJugador';
					} else {
						window.location.href = '/dashboardOrganizador';
					}
				}
			})
			.catch((error) => {
				setResponseError(error.toString());
			});
	};

	React.useEffect(() => {
		// alert(localStorage.getItem('data'));
		const sesion = JSON.parse(localStorage.getItem('data'));
		if (sesion) {
			if (sesion.tipo === 'jugador') {
				window.location.href = '/dashboardJugador';
			} else {
				window.location.href = '/dashboardOrganizador';
			}
		}
	}, []);

	return (
		<Grid container sx={{ minHeight: '100vh' }}>
			<Navbar isPublic={true}></Navbar>
			<PublicForm>
				<Grid item>
					<Typography
						variant='h3'
						sx={{ textAlign: 'center', color: '#28527A' }}>
						Ingresar
					</Typography>
				</Grid>
				<Grid sx={{ py: 2 }} item xs={12} md={12} lg={12}>
					<TextField
						fullWidth
						label='Email'
						type='email'
						value={values.email}
						onChange={handleChange('email')}></TextField>
				</Grid>
				<Grid sx={{ py: 2 }} item xs={12} md={12} lg={12}>
					<FormControl fullWidth variant='outlined'>
						<InputLabel htmlFor='outlined-adornment-password'>
							Contraseña
						</InputLabel>
						<OutlinedInput
							id='outlined-adornment-password'
							type={values.showPassword ? 'text' : 'password'}
							value={values.password}
							onChange={handleChange('password')}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowPassword}
										// onMouseDown={handleMouseDownPassword}
										edge='end'>
										<MaterialIcon icon='visibility' size='small' />
									</IconButton>
								</InputAdornment>
							}
							label='Contraseña'
						/>
					</FormControl>
				</Grid>
				<Grid item sx={{ py: 1 }} xs={12} md={12} lg={12}>
					<Button
						onClick={handleInciarSesion}
						fullWidth
						variant='contained'
						color='primary'>
						Iniciar Sesion
					</Button>
				</Grid>
				<Grid item sx={{ py: 1 }} xs={12} md={12} lg={12}>
					<Button
						href='/register'
						fullWidth
						variant='contained'
						color='primary'>
						Registrarse
					</Button>
				</Grid>
				<Grid item sx={{ py: 2 }} xs={12} md={12} lg={12}>
					<Button
						href='/forgotPassword'
						fullWidth
						variant='text'
						color='primary'>
						¿Olvidaste tu contraseña? Haz click aquí
					</Button>
				</Grid>
				<ResponseError error={responseError}></ResponseError>
			</PublicForm>
		</Grid>
	);
};

export default Login;
