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
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const DashboardOrganizadorInicio = () => {
	const [data, setData] = React.useState({});
	const { user } = useContext(DashboardOrganizadorContext);
	React.useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/organizador/dashboardData`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.status === 'success') {
					setData(data);
				} else {
					console.log(data.message);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
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
						value: data.torneosActivos,
						description: 'Torneos Activos',
					}}></CircularDisplay>
				<CircularDisplay
					data={{
						value: data.torneosCreados,
						description: 'Torneos Creados',
					}}></CircularDisplay>
				<CircularDisplay
					data={{
						value: data.torneosActivos,
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
				<Grid item container direction='row' justifyContent='space-around'>
					<Grid item>
						<Typography variant='h5'>
							Nombre:{' '}
							{data.latestTorneoCreado ? data.latestTorneoCreado.nombre : '-'}
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant='h5'>
							Juego:{' '}
							{data.latestTorneoCreado ? data.latestTorneoCreado.juego : '-'}
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant='h5'>
							Estado:{' '}
							{data.latestTorneoCreado ? data.latestTorneoCreado.estado : '-'}
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant='h5'>
							Código:{' '}
							{data.latestTorneoCreado
								? data.latestTorneoCreado.codigo_torneo
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
				direction='row'>
				<Grid item xs={12}>
					<Typography
						variant='h4'
						align='center'
						sx={{ textAlign: 'left', px: 4 }}>
						Actividad reciente
					</Typography>
				</Grid>
				{data.latestActivity ? (
					data.latestActivity.map((register) => {
						return (
							<Grid item key={JSON.stringify(data.latestActivity)}>
								<Typography
									variant='h6'
									sx={{ textAlign: 'left', px: 6, py: 1 }}>
									{register.fecha_modificacion} | {register.desc_modificacion}
								</Typography>
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
			<Grid item sx={{ minWidth: '90%', backgroundColor: 'white' }}>
				<Bar
					data={{
						labels: 'Ejemplo',
						datasets: [
							{
								label: 'My First Dataset',
								data: [65, 59, 80, 81, 56, 55, 40],
								backgroundColor: [
									'rgba(255, 99, 132, 0.2)',
									'rgba(255, 159, 64, 0.2)',
									'rgba(255, 205, 86, 0.2)',
									'rgba(75, 192, 192, 0.2)',
									'rgba(54, 162, 235, 0.2)',
									'rgba(153, 102, 255, 0.2)',
									'rgba(201, 203, 207, 0.2)',
								],
								borderColor: [
									'rgb(255, 99, 132)',
									'rgb(255, 159, 64)',
									'rgb(255, 205, 86)',
									'rgb(75, 192, 192)',
									'rgb(54, 162, 235)',
									'rgb(153, 102, 255)',
									'rgb(201, 203, 207)',
								],
								borderWidth: 1,
							},
						],
					}}></Bar>
			</Grid>
		</Grid>
	);
};

export default DashboardOrganizadorInicio;
