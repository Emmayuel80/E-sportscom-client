import {
	Button,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Typography,
} from '@mui/material';
import React from 'react';
import Navbar from '../components/Navbar';
import PublicForm from '../components/PublicForm';
import MaterialIcon from 'material-icons-react';
import ResponseError from '../components/ResponseError';
import { useParams } from 'react-router-dom';

const RestorePassword = () => {
	const [isUpdatedPassword, setisUpdatedPassword] = React.useState(false);
	const { id, token } = useParams();
	const [values, setValues] = React.useState({
		password1: '',
		password2: '',
		showPassword1: false,
		showPassword2: false,
	});
	const [responseError, setResponseError] = React.useState(false);

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = (prop) => (event) => {
		setValues({
			...values,
			[prop]: !values[prop],
		});
	};

	const handleRestoreSubmit = () => {
		if (values.password1 === '' && values.password2 === '') {
			setResponseError('Campos vacios');
			return;
		}
		if (values.password1 !== values.password2) {
			setResponseError('Las contraseñas no coinciden');
			return;
		}
		fetch(`${process.env.REACT_APP_API_URL}/resetPassword/${id}/${token}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				password: values.password1,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.error) {
					setResponseError(response.error);
				} else {
					setisUpdatedPassword(true);
				}
			})
			.catch((error) => {
				setResponseError(error);
			});
	};

	return (
		<Grid container sx={{ minHeight: '100vh' }}>
			<Navbar></Navbar>
			<PublicForm>
				{!isUpdatedPassword ? (
					<Grid>
						<Grid>
							<Typography variant='h4' sx={{ textAlign: 'center' }}>
								Restablecer contraseña.
							</Typography>
						</Grid>
						<Grid sx={{ py: 2 }} item xs={12} md={12} lg={12}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel htmlFor='outlined-adornment-password1'>
									Nueva contraseña
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
									label='Nueva contraseña'
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
						<Grid item sx={{ py: 1 }} xs={12} md={12} lg={12}>
							<Button
								onClick={handleRestoreSubmit}
								fullWidth
								variant='contained'
								color='primary'>
								Restablecer
							</Button>
						</Grid>
						<ResponseError error={responseError} />
					</Grid>
				) : (
					<Grid>
						<Grid>
							<Typography variant='h6'>
								Se ha restablecido la contraseña
							</Typography>
						</Grid>
						<Grid item sx={{ py: 1 }} xs={12} md={12} lg={12}>
							<Button
								href='/login'
								fullWidth
								variant='contained'
								color='primary'>
								Iniciar Sesion
							</Button>
						</Grid>
					</Grid>
				)}
			</PublicForm>
		</Grid>
	);
};

export default RestorePassword;
