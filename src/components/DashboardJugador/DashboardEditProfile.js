import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import DashBoardJugadorContext from '../../context/DashboardJugadorContext';
import PublicForm from '../PublicForm';
import ResponseError from '../ResponseError';
import DashboardBuscarTorneos from './DashboardBuscarTorneos';

const EditProfile = () => {
	const { user, setUser, changeComponent } = useContext(DashBoardJugadorContext);
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

		fetch(`${process.env.REACT_APP_API_URL}/editProfile`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + user.token,
			},
			body: JSON.stringify({
				nombre: values.usuario,
				nombre_invocador: values.nombreInvocador,
				profileIconId: values.randomNumber,

			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.error) {
					setResponseError(response.message ? response.message : response.error);
				} else {
					localStorage.setItem('data', JSON.stringify({...response.data[0], token: user.token}));
					setUser({...response.data[0], token: user.token});
					changeComponent(<DashboardBuscarTorneos />);
				}
			})
			.catch((error) => {
				setResponseError(error);
			});
	};

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	React.useEffect(() => {
		// generate random number from 1 to 10
		const randomNumber = Math.floor(Math.random() * 10) + 1;
		// set the state of the randomNumber
		setValues({ ...values, randomNumber });
	}, [])
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
				<Grid container sx={{ py: 2 }} item xs={12} md={12} lg={12} justifyContent="center" alignItems="center" spacing={3}>
					<Grid item container xs={12} md={12} lg={4} justifyContent="center"  >
					<img style={{width: "10rem", height: "10rem"}} src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${values.randomNumber}.jpg`} alt='profileIcon'/>
					</Grid>
					<Grid item xs={12} md={12} lg={4}>
					<Typography variant='h6' textAlign='justify'> Para validar que la cuenta de RIOT Games sea tuya,
					 por favor entra a League of legends para cambiar tu foto de perfil a la imagen presentada, cuando ya la hayas cambiado presiona el boton de guardar </Typography>
					 </Grid>
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
