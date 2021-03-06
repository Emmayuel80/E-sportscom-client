import {
	Button,
	Checkbox,
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
import JUEGOS from '../../constants/Juegos.json';
import ResponseError from '../ResponseError';
import crearTorneo from '../../services/organizador/crearTorneo';
import DashboardOrganizadorContext from '../../context/DashboardOrganizadorContext';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	menuPaper: {
		maxHeight: 170,
		overflowY: 'scroll',
	},
}));
const DashboardOrganizadorCrearTorneo = () => {
	const classes = useStyles();
	// checar que id juego coincida con los equipos
	const [fechaFinRegistro, setFechaFinRegistro] = React.useState(null);
	const [fechaInicio, setFechaInicio] = React.useState(null);
	const { user, changeComponent } = useContext(DashboardOrganizadorContext);
	const [values, setValues] = React.useState({
		nombreTorneo: '',
		idJuego: '',
		noEquipos: 4,
		noEnfrentamientos: 2,
		premio: false,
		privado: false,
		descPremio: '',
		descTorneo: '',
		horaInicio: 17,
	});
	const [responseError, setResponseError] = React.useState(false);
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};
	const handleClickCrearTorneo = () => {
		crearTorneo(
			{ ...values, fechaFinRegistro, fechaInicio },
			user.token,
			setResponseError,
			changeComponent
		);
	};

	return (
		<Grid container justifyContent='center'>
			<PublicForm pady={10} minWidth={'80%'}>
				<Grid item>
					<Typography variant='h3'>Crear torneo</Typography>
				</Grid>
				<Grid item>
					<FormControl fullWidth>
						<Grid sx={{ py: 2, px: 1 }} item xs={12} md={12} lg={12}>
							<TextField
								fullWidth
								label='Nombre de torneo'
								placeholder='Nombre...'
								type='text'
								value={values.nombreTorneo}
								onChange={handleChange('nombreTorneo')}></TextField>
						</Grid>
					</FormControl>
				</Grid>
				<Grid item container>
					<Grid sx={{ py: 2, px: 1 }} item xs={12} md={12} lg={12}>
						<FormControl fullWidth>
							<InputLabel id='juego-select'>Juego</InputLabel>
							<Select
								required
								labelId='juego-select'
								value={values.idJuego}
								label='Juego'
								onChange={handleChange('idJuego')}>
								{Object.keys(JUEGOS).map((key) => {
									return (
										<MenuItem key={key} value={key}>
											{JUEGOS[`${key}`]}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</Grid>

					{values.idJuego === '1' && (
						<Grid sx={{ py: 2, px: 1 }} item xs={12} md={12} lg={12}>
							<FormControl fullWidth>
								<InputLabel id='equipos-select'>No. Equipos</InputLabel>
								<Select
									required
									labelId='equipos-select'
									value={values.noEquipos}
									label='No. Equipos'
									onChange={handleChange('noEquipos')}>
									<MenuItem value={4}>4 Equipos</MenuItem>
									<MenuItem value={8}>8 Equipos</MenuItem>
									<MenuItem value={16}>16 Equipos</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					)}
					{values.idJuego === '2' && (
						<>
							<Grid sx={{ py: 2, px: 1 }} item xs={12} md={12} lg={12}>
								<FormControl fullWidth>
									<InputLabel id='equipos-select'>No. Participantes</InputLabel>
									<Select
										required
										labelId='equipos-select'
										value={values.noEquipos < 8 ? 8 : values.noEquipos}
										label='No. Participantes'
										onChange={handleChange('noEquipos')}>
										<MenuItem value={8}>8 Jugadores</MenuItem>
										<MenuItem value={16}>16 Jugadores</MenuItem>
										<MenuItem value={32}>32 Jugadores</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</>
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
				<Grid sx={{ py: 2, px: 1 }} item xs={12} md={12} lg={12}>
					<FormControl fullWidth>
						<InputLabel id='equipos-select'>Hora de inicio</InputLabel>
						<Select
							MenuProps={{ classes: { paper: classes.menuPaper } }}
							required
							labelId='hora-select'
							value={values.horaInicio}
							label='Hora de inicio'
							onChange={handleChange('horaInicio')}>
							{Array(24)
								.fill(0)
								.map((value, index) => {
									return (
										<MenuItem key={index} value={index}>
											{index + ':00 horas'}
										</MenuItem>
									);
								})}
						</Select>
					</FormControl>
				</Grid>
				<Grid sx={{ py: 2, px: 1 }} item xs={12} md={6} lg={6}>
					<FormControlLabel
						label='??Vas a ofrecer un premio?'
						control={
							<Checkbox
								onChange={(event) => {
									setValues({ ...values, premio: !values.premio });
								}}
								inputProps={{ 'aria-label': 'controlled' }}
							/>
						}></FormControlLabel>
				</Grid>
				{values.premio && (
					<Grid sx={{ py: 2, px: 1 }} item xs={12} md={12} lg={12}>
						<TextField
							fullWidth
							label='Descripci??n del premio'
							placeholder='Se ofrece un premio de...'
							type='text'
							value={values.descPremio}
							onChange={handleChange('descPremio')}></TextField>
					</Grid>
				)}
				<Grid sx={{ py: 2, px: 1 }} item xs={12} md={6} lg={6}>
					<FormControlLabel
						label='??El torneo es privado?'
						control={
							<Checkbox
								onChange={(event) => {
									setValues({ ...values, privado: !values.privado });
								}}
								inputProps={{ 'aria-label': 'controlled' }}
							/>
						}></FormControlLabel>
				</Grid>

				<Grid sx={{ py: 2, px: 1 }} item xs={12} md={12} lg={12}>
					<TextField
						fullWidth
						label='Descripci??n del torneo'
						placeholder='El torneo consistira en...'
						type='text'
						value={values.descTorneo}
						onChange={handleChange('descTorneo')}></TextField>
				</Grid>
				<Grid item sx={{ py: 1 }} xs={12} md={12} lg={12}>
					<Button
						onClick={handleClickCrearTorneo}
						fullWidth
						variant='contained'
						color='primary'>
						Crear Torneo
					</Button>
				</Grid>
				<ResponseError error={responseError}></ResponseError>
			</PublicForm>
		</Grid>
	);
};

export default DashboardOrganizadorCrearTorneo;
