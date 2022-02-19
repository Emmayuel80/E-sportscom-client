import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import PublicForm from '../PublicForm';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ResponseError from '../ResponseError';
import actualizarTorneo from '../../services/organizador/actualizarTorneo';
import DashboardOrganizadorContext from '../../context/DashboardOrganizadorContext';
import PropTypes from 'prop-types';
import borrarTorneo from '../../services/organizador/borrarTorneo';
const DashboardOrganizadorEditarTorneo = ({ torneoData }) => {
	// Context
	const { user, changeComponent } = useContext(DashboardOrganizadorContext);

	// States
	const [fechaFinRegistro, setFechaFinRegistro] = React.useState(null);
	const [fechaInicio, setFechaInicio] = React.useState(null);
	const [responseError, setResponseError] = React.useState(false);
	const [values, setValues] = React.useState({
		nombre: '',
		premio: false,
		privado: false,
		desc_premio: '',
		description: '',
	});

	// Handlers
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickActualizarTorneo = () => {
		const auxTorneoData = {
			...values,
			fecha_fin_registro: fechaFinRegistro,
			fecha_inicio: fechaInicio,
		};
		console.log(values);

		actualizarTorneo(
			user.token,
			auxTorneoData,
			setResponseError,
			changeComponent
		);
	};

	const handleClickBorrarTorneo = () => {
		borrarTorneo(
			user.token,
			values.id_torneo,
			setResponseError,
			changeComponent
		);
	};

	// UseEffect
	React.useEffect(() => {
		setValues({
			id_torneo: torneoData.id_torneo,
			nombre: torneoData.nombre,
			premio: Boolean(torneoData.premio),
			privado: Boolean(torneoData.privado),
			desc_premio: torneoData.desc_premio,
			description: torneoData.description,
		});
		setFechaFinRegistro(torneoData.fecha_fin_registro);
		setFechaInicio(torneoData.fecha_inicio);
	}, []);

	return (
		<Grid container justifyContent='center'>
			<PublicForm pady={10} minWidth={'80%'}>
				<Grid item>
					<Typography variant='h3'>Editar torneo</Typography>
				</Grid>
				<Grid item>
					<FormControl fullWidth>
						<Grid sx={{ py: 2, px: 1 }} item xs={12} md={12} lg={12}>
							<TextField
								fullWidth
								label='Nombre de torneo'
								placeholder='Nombre...'
								type='text'
								value={values.nombre}
								onChange={handleChange('nombre')}></TextField>
						</Grid>
					</FormControl>
				</Grid>
				<Grid item container>
					{values.idJuego === '2' && (
						<Grid sx={{ py: 2, px: 1 }} item xs={12} md={6} lg={6}>
							<FormControl fullWidth>
								<InputLabel id='rondas-select'>Rondas</InputLabel>
								<Select
									required
									labelId='rondas-select'
									value={values.noEnfrentamientos}
									label='No. Rondas'
									onChange={handleChange('noEnfrentamientos')}>
									<MenuItem value={2}>2 Rondas</MenuItem>
									<MenuItem value={4}>4 Rondas</MenuItem>
									<MenuItem value={8}>8 Rondas</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					)}
				</Grid>
				<Grid container item>
					<Grid sx={{ py: 2, px: 1 }} item xs={12} md={6} lg={6}>
						<FormControl fullWidth>
							<LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
								<DatePicker
									label='Fecha fin registro'
									value={fechaFinRegistro}
									onChange={(newValue) => {
										setFechaFinRegistro(newValue);
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</FormControl>
					</Grid>
					<Grid sx={{ py: 2, px: 1 }} item xs={12} md={6} lg={6}>
						<FormControl fullWidth>
							<LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
								<DatePicker
									label='Fecha inicio'
									value={fechaInicio}
									onChange={(newValue) => {
										setFechaInicio(newValue);
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</FormControl>
					</Grid>
				</Grid>
				<Grid sx={{ py: 2, px: 1 }} item xs={12} md={6} lg={6}>
					<FormControlLabel
						label='¿Vas a ofrecer un premio?'
						control={
							<Checkbox
								onChange={(event) => {
									setValues({ ...values, premio: !values.premio });
								}}
								inputProps={{ 'aria-label': 'controlled' }}
								checked={values.premio}
							/>
						}></FormControlLabel>
				</Grid>
				<Grid sx={{ py: 2, px: 1 }} item xs={12} md={6} lg={6}>
					<FormControlLabel
						label='¿El torneo es privado?'
						control={
							<Checkbox
								onChange={(event) => {
									setValues({ ...values, privado: !values.privado });
								}}
								inputProps={{ 'aria-label': 'controlled' }}
								checked={values.privado}
							/>
						}></FormControlLabel>
				</Grid>
				{values.premio && (
					<Grid sx={{ py: 2, px: 1 }} item xs={12} md={12} lg={12}>
						<TextField
							fullWidth
							label='Descripción del premio'
							placeholder='Se ofrece un premio de...'
							type='text'
							value={values.desc_premio}
							onChange={handleChange('desc_premio')}></TextField>
					</Grid>
				)}
				<Grid sx={{ py: 2, px: 1 }} item xs={12} md={12} lg={12}>
					<TextField
						fullWidth
						label='Descripción del torneo'
						placeholder='El torneo consistira en...'
						type='text'
						value={values.description}
						onChange={handleChange('description')}></TextField>
				</Grid>
				<Grid item sx={{ py: 1 }} xs={12} md={12} lg={12}>
					<Button
						onClick={handleClickActualizarTorneo}
						fullWidth
						variant='contained'
						color='primary'>
						Guardar Torneo
					</Button>
				</Grid>
				<Grid item sx={{ py: 1 }} xs={12} md={12} lg={12}>
					<Button
						sx={{ backgroundColor: '#d32f2f' }}
						onClick={handleClickOpen}
						fullWidth
						variant='contained'
						color='primary'>
						Borrar Torneo
					</Button>
				</Grid>
				<ResponseError error={responseError}></ResponseError>
			</PublicForm>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'>
				<DialogTitle
					sx={{ color: 'white', fontWeight: 'bold' }}
					id='alert-dialog-title'>
					{'¿Borrar torneo?'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						sx={{ color: 'white' }}
						id='alert-dialog-description'>
						Estas apunto de borrar el torneo: <i>{values.nombre}</i>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant='outlined' color='secondary' onClick={handleClose}>
						Cancelar
					</Button>
					<Button
						variant='contained'
						color='error'
						onClick={handleClickBorrarTorneo}
						autoFocus>
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>
		</Grid>
	);
};

DashboardOrganizadorEditarTorneo.propTypes = {
	torneoData: PropTypes.any,
};

export default DashboardOrganizadorEditarTorneo;
