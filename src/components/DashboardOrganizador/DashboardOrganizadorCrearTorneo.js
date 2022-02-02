import {
	Checkbox,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import React from 'react';
import PublicForm from '../PublicForm';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import JUEGOS from '../../constants/Juegos.json';
const DashboardOrganizadorCrearToreno = () => {
	// checar que id juego coincida con los equipos
	const [fechaFinRegistro, setFechaFinRegistro] = React.useState(null);
	const [fechaInicio, setFechaInicio] = React.useState(null);
	const [values, setValues] = React.useState({
		nombreTorneo: '',
		idJuego: '',
		noEquipos: 4,
		noEnfrentamientos: null,
		fechaFinRegistro: null,
		fechaIncio: '',
		premio: false,
		descPremio: '',
		descTorneo: '',
	});
	// const [responseError, setResponseError] = React.useState(false);
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	return (
		<Grid container justifyContent='center'>
			<PublicForm minWidth={'80%'}>
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
					<Grid
						sx={{ py: 2, px: 1 }}
						item
						xs={12}
						md={values.idJuego === '1' ? 6 : 12}
						lg={values.idJuego === '1' ? 6 : 12}>
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
						<Grid sx={{ py: 2, px: 1 }} item xs={12} md={6} lg={6}>
							<FormControl fullWidth>
								<InputLabel id='equipos-select'>No. Equipos</InputLabel>
								<Select
									required
									labelId='equipos-select'
									value={values.noEquipos}
									label='No. Equipos'
									onChange={handleChange('idEquipos')}>
									<MenuItem value={4}>4 Equipos</MenuItem>
									<MenuItem value={8}>8 Equipos</MenuItem>
									<MenuItem value={16}>16 Equipos</MenuItem>
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
							value={values.descPremio}
							onChange={handleChange('descPremio')}></TextField>
					</Grid>
				)}
				<Grid sx={{ py: 2, px: 1 }} item xs={12} md={12} lg={12}>
					<TextField
						fullWidth
						label='Descripción del torneo'
						placeholder='El torneo consistira en...'
						type='text'
						value={values.descTorneo}
						onChange={handleChange('descTorneo')}></TextField>
				</Grid>
			</PublicForm>
		</Grid>
	);
};

export default DashboardOrganizadorCrearToreno;
