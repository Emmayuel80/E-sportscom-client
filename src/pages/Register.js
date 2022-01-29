import {
	// Alert,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material';
import React from 'react';
import PublicForm from '../components/PublicForm';
import MaterialIcon from 'material-icons-react';
import Navbar from '../components/Navbar';
import ResponseError from '../components/ResponseError';

const Register = () => {
	const [values, setValues] = React.useState({
		email: '',
		password1: '',
		password2: '',
		usuario: '',
		showPassword1: false,
		showPassword2: false,
		tipo: 'Jugador',
	});
	const [responseError, setResponseError] = React.useState(false);
	const [nextStep, setNextStep] = React.useState(false);

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = (prop) => (event) => {
		setValues({
			...values,
			[prop]: !values[prop],
		});
	};
	const validateEmail = (email) => {
		return email.match(
			// eslint-disable-next-line no-useless-escape
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	};

	const handleRegisterSubmit = () => {
		if (values.email === '' && values.password === '') {
			setResponseError('Campos vacios');
			return;
		}
		if (!validateEmail(values.email)) {
			setResponseError('Email invalido');
			return;
		}
		if (values.password1 !== values.password2) {
			setResponseError('Las contraseñas no coinciden');
			return;
		}

		fetch(`${process.env.REACT_APP_API_URL}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: values.email,
				password: values.password1,
				username: values.usuario,
				type: values.tipo.toLowerCase(),
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.error) {
					setResponseError(response.error);
				} else {
					// window.location.href = '/login';
					setNextStep(true);
				}
			})
			.catch((error) => {
				setResponseError(error.toString());
			});
	};

	return nextStep ? (
		<Grid container sx={{ minHeight: '100vh' }}>
			<Navbar />
			<PublicForm>
				<Grid item>
					<Typography variant='h6'>
						Se ha enviado un correo para verificar la cuenta
					</Typography>
				</Grid>
			</PublicForm>
		</Grid>
	) : (
		<Grid container sx={{ minHeight: '100vh' }}>
			<Navbar></Navbar>
			<PublicForm padx={6} pady={10}>
				<Grid item>
					<Typography
						variant='h3'
						sx={{ textAlign: 'center', color: '#28527A' }}>
						Registro
					</Typography>
				</Grid>
				<Grid sx={{ py: 2 }} item xs={12} md={12} lg={12}>
					<TextField
						fullWidth
						label='Nombre de usuario'
						placeholder='Ingresa tu nombre de usuario'
						type='text'
						value={values.usuario}
						onChange={handleChange('usuario')}></TextField>
				</Grid>
				<Grid sx={{ py: 2 }} item xs={12} md={12} lg={12}>
					<TextField
						fullWidth
						label='Email'
						placeholder='Ingresa tu email'
						type='email'
						value={values.email}
						onChange={handleChange('email')}></TextField>
				</Grid>
				<Grid sx={{ py: 2 }} item xs={12} md={12} lg={12}>
					<FormControl fullWidth variant='outlined'>
						<InputLabel htmlFor='outlined-adornment-password1'>
							Contraseña
						</InputLabel>
						<OutlinedInput
							id='outlined-adornment-password1'
							type={values.showPassword1 ? 'text' : 'password'}
							value={values.password1}
							onChange={handleChange('password1')}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowPassword('showPassword1')}
										// onMouseDown={handleMouseDownPassword}
										edge='end'>
										<MaterialIcon icon='visibility' size='small' />
									</IconButton>
								</InputAdornment>
							}
							label='Contraseña1'
						/>
					</FormControl>
				</Grid>
				<Grid sx={{ py: 2 }} item xs={12} md={12} lg={12}>
					<FormControl fullWidth variant='outlined'>
						<InputLabel htmlFor='outlined-adornment-password2'>
							Confirma tu contraseña
						</InputLabel>
						<OutlinedInput
							id='outlined-adornment-password2'
							type={values.showPassword2 ? 'text' : 'password'}
							value={values.password2}
							onChange={handleChange('password2')}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowPassword('showPassword2')}
										// onMouseDown={handleMouseDownPassword}
										edge='end'>
										<MaterialIcon icon='visibility' size='small' />
									</IconButton>
								</InputAdornment>
							}
							label='Confirma tu contraseña'
						/>
					</FormControl>
				</Grid>
				<Grid sx={{ py: 2 }} item xs={12} md={12} lg={12}>
					<FormControl fullWidth component='fieldset'>
						<FormLabel sx={{ textAlign: 'center' }} component='legend'>
							Selecciona tipo de perfil
						</FormLabel>
						<RadioGroup
							row
							aria-label='gender'
							defaultValue='Jugador'
							onChange={handleChange('tipo')}
							name='radio-buttons-group'>
							<Grid container justifyContent='space-around'>
								<FormControlLabel
									value='Jugador'
									control={<Radio />}
									label='Jugador'
								/>
								<FormControlLabel
									value='Organizador'
									control={<Radio />}
									label='Organizador'
								/>
							</Grid>
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item sx={{ py: 1 }} xs={12} md={12} lg={12}>
					<Button
						onClick={handleRegisterSubmit}
						fullWidth
						variant='contained'
						color='primary'>
						Registrarse
					</Button>
				</Grid>
				<Grid item sx={{ py: 2 }} xs={12} md={12} lg={12}>
					<Button href='/login' fullWidth variant='text' color='primary'>
						¿Ya tienes una cuenta? Inicia sesión
					</Button>
				</Grid>
				<ResponseError error={responseError} />
			</PublicForm>
		</Grid>
	);
};

export default Register;
