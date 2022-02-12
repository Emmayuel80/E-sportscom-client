import { Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import DashboardOrganizadorContext from '../../context/DashboardOrganizadorContext';
import CircularDisplay from '../CircularDisplay';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import JUEGOS from '../../constants/Juegos.json';
import ESTADOS from '../../constants/Estados.json';
import estadoTorneosCalculo from '../../services/estadoTorneosCalculo';
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

// eslint-disable-next-line complexity
const DashboardOrganizadorInicio = () => {
	const [data, setData] = React.useState({});
	const { user } = useContext(DashboardOrganizadorContext);

	React.useEffect(() => {
		if (user.token) {
			fetch(`${process.env.REACT_APP_API_URL}/organizador/dashboardData`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + user.token,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					if (!data.message) {
						setData(data);
					} else {
						console.log(data.message);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [user]);

	return (
		data && (
			<Grid container justifyContent='space-around'>
				<Grid item xs={12} sx={{ py: 4 }}>
					<Typography
						variant='h4'
						align='center'
						sx={{ textAlign: 'left', px: 4, fontWeight: 'bold' }}>
						Bienvenido, {user.nombre}
					</Typography>
				</Grid>
				<Grid
					item
					container
					justifyContent='space-around'
					alignItems='center'
					direction='row'>
					<CircularDisplay
						data={{
							value: data.torneosActivos?.length,
							description: 'Torneos Activos',
						}}></CircularDisplay>
					<CircularDisplay
						data={{
							value: data.torneosCreados?.length,
							description: 'Torneos Creados',
						}}></CircularDisplay>
					<CircularDisplay
						data={{
							value: data.torneosActivos?.length,
							description: 'Torneos de juegos',
						}}></CircularDisplay>
				</Grid>
				<Grid item xs={12} sx={{ py: 4 }}>
					<Grid item xs={12}>
						<Typography
							variant='h4'
							align='center'
							sx={{ textAlign: 'left', px: 4 }}>
							Torneo reciente
						</Typography>
					</Grid>
					<Grid
						sx={{ px: 6 }}
						item
						container
						direction='row'
						justifyContent='space-around'>
						<Grid xs={12} md={3} item>
							<Typography variant='h5'>
								Nombre:{' '}
								{data?.latestTorneoCreado
									? data.latestTorneoCreado[0]?.nombre
									: '-'}
							</Typography>
						</Grid>
						<Grid xs={12} md={3} item>
							<Typography variant='h5'>
								Juego:{' '}
								{data?.latestTorneoCreado
									? JUEGOS[`${data.latestTorneoCreado[0]?.id_juego}`]
									: '-'}
							</Typography>
						</Grid>
						<Grid xs={12} md={3} item>
							<Typography variant='h5'>
								Estado:{' '}
								{data.latestTorneoCreado
									? ESTADOS[`${data.latestTorneoCreado[0]?.id_estado}`]
									: '-'}
							</Typography>
						</Grid>
						<Grid xs={12} md={3} item>
							<Typography variant='h5'>
								Código:{' '}
								{data.latestTorneoCreado
									? data.latestTorneoCreado[0]?.codigo_torneo
									: '-'}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid
					item
					container
					justifyContent='start'
					alignItems='center'
					direction='row'
					sx={{ py: 6 }}>
					<Grid item xs={12}>
						<Typography
							variant='h4'
							align='center'
							sx={{ textAlign: 'left', px: 4 }}>
							Actividad reciente
						</Typography>
					</Grid>
					{data && data.latestActivity ? (
						data.latestActivity.map((register, index) => {
							return (
								<Grid
									item
									xs={12}
									key={JSON.stringify(data.latestActivity) + index}>
									<Typography variant='h6' sx={{ textAlign: 'left', px: 6 }}>
										{new Date(register.fecha_modificacion).toLocaleString()} |{' '}
										{register.desc_modificacion
											.split('\n')
											.map((item, index) => {
												return (
													<Grid key={index}>
														<Typography variant='span'> {item} </Typography>
														<br />
													</Grid>
												);
											})}
									</Typography>
									<br />
								</Grid>
							);
						})
					) : (
						<Typography variant='h6' sx={{ textAlign: 'left', px: 6, py: 1 }}>
							{' '}
							No hay actividad reciente
						</Typography>
					)}
				</Grid>
				<Grid
					item
					sx={{
						minWidth: '90%',
						backgroundColor: 'rgba(255, 255, 255, 0)',
						p: 5,
						borderRadius: 5,
					}}>
					{data.torneosCreados && (
						<Bar
							options={{
								responsive: true,

								scales: {
									y: {
										grid: {
											color: '#ffffff',
										},
										ticks: {
											color: '#ffffff', // this here
										},
									},
									x: {
										ticks: {
											color: '#ffffff', // this here
										},
										grid: {
											color: '#ffffff',
										},
									},
								},
								plugins: {
									legend: {
										display: false,
										color: 'black',
									},
								},
							}}
							data={{
								color: '#fff',
								labels: Object.values(ESTADOS),
								datasets: [
									{
										data: estadoTorneosCalculo(data.torneosCreados),
										backgroundColor: [
											'rgba(255, 99, 132, 1)',
											'rgba(255, 159, 64, 1)',
											'rgba(255, 205, 86, 1)',
											'rgba(75, 192, 192, 1)',
											'rgba(54, 162, 235, 1)',
											'rgba(153, 102, 255, 1)',
										],
										borderColor: [
											'rgb(255, 99, 132)',
											'rgb(255, 159, 64)',
											'rgb(255, 205, 86)',
											'rgb(75, 192, 192)',
											'rgb(54, 162, 235)',
											'rgb(153, 102, 255)',
										],
										borderWidth: 1,
									},
								],
							}}></Bar>
					)}
				</Grid>
			</Grid>
		)
	);
};

export default DashboardOrganizadorInicio;
