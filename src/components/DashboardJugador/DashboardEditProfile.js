import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import DashBoardJugadorContext from '../../context/DashboardJugadorContext';
import PublicForm from '../PublicForm';
import ResponseError from '../ResponseError';

const EditProfile = () => {
	const { user } = useContext(DashBoardJugadorContext);
	const [values, setValues] = React.useState({
		usuario: user.nombre,
		nombreInvocador: user.nombre_invocador || '',
	});
	const [responseError, setResponseError] = React.useState(false);
	const handleEditSubmit = () => {
		if (values.usuario === '') {
			setResponseError('Campos vacios');
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
				type: values.tipo,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.error) {
					setResponseError(response.error);
				} else {
					window.location.href = '/login';
				}
			});
	};

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};
	return (
		<Grid item container>
			<PublicForm minWidth='30%'>
				<Grid item>
					<Typography variant='h4' textAlign='center'>
						Editar Perfil
					</Typography>
				</Grid>
				<Grid sx={{ py: 2 }} item xs={12} md={12} lg={12}>
					<TextField
						fullWidth
						label='Email'
						type='text'
						disabled
						value={user.email}></TextField>
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
						label='Nombre de invocador'
						placeholder='Ingresa tu nombre de invocador'
						type='text'
						value={values.nombreInvocador}
						onChange={handleChange('nombreInvocador')}></TextField>
				</Grid>
				<ResponseError error={responseError} />
				<Grid item sx={{ py: 2 }} xs={12} md={12} lg={12}>
					<Button
						onClick={handleEditSubmit}
						fullWidth
						variant='contained'
						color='primary'>
						Guardar
					</Button>
				</Grid>
			</PublicForm>
		</Grid>
	);
};

export default EditProfile;
