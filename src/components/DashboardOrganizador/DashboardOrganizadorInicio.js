import { Divider, Grid, Typography } from '@mui/material';
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
import estadoTorneosCalculo from '../../services/organizador/estadoTorneosCalculo';
import CopyToClipboard from '../CopyToClipboard';
import MaterialIcon from 'material-icons-react';
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const textStyle = {
	color: 'white',
};

// eslint-disable-next-line complexity
const DashboardOrganizadorInicio = () => {
	const [data, setData] = React.useState({});
	const { user } = useContext(DashboardOrganizadorContext);
	const [open, setOpen] = React.useState(false);

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
				<Grid
					item
					container
					justifyContent='space-around'
					alignItems='center'
					direction='row'
					sx={{ backgroundColor: '#1a3650', p: 5, mt: 3, borderRadius: 5 }}>
					<Grid item xs={12} sx={{ py: 4 }}>
						<Typography
							variant='h4'
							align='center'
							sx={{
								textAlign: 'left',
								px: 4,
								fontWeight: 'bold',
								...textStyle,
							}}>
							Bienvenido, {user.nombre}
						</Typography>
					</Grid>
					<Grid item xs={12} xl={4}>
						<CircularDisplay
							data={{
								value: data.torneosActivos?.length,
								description: 'Torneos Activos',
							}}></CircularDisplay>
					</Grid>
					<Grid item xs={12} xl={4}>
						<CircularDisplay
							data={{
								value: data.torneosCreados?.length,
								description: 'Torneos Creados',
							}}></CircularDisplay>
					</Grid>
					<Grid item xs={12} xl={4}>
						<CircularDisplay
							data={{
								value: data.torneosActivos?.length,
								description: 'Torneos de juegos',
							}}></CircularDisplay>
					</Grid>
				</Grid>
				<Grid
					item
					xs={12}
					sx={{ backgroundColor: '#287A79', p: 5, mt: 3, borderRadius: 5 }}>
					<Grid item xs={12}>
						<Typography
							variant='h4'
							align='center'
							sx={{ textAlign: 'left', px: 3, ...textStyle }}>
							Torneo reciente
						</Typography>
					</Grid>
					<Grid
						sx={{ px: 3 }}
						xs={12}
						item
						container
						direction='row'
						justifyContent='space-around'>
						<Grid xs={12} md={12} item container alignItems='center'>
							<Grid item xs={12} xl={1}>
								<MaterialIcon size='large' icon='abc'></MaterialIcon>
							</Grid>
							<Grid item xs={12} xl={11}>
								<Typography sx={textStyle} variant='h5'>
									{data?.latestTorneoCreado
										? data.latestTorneoCreado[0]?.nombre
										: '-'}
								</Typography>
							</Grid>
						</Grid>
						<Grid xs={12} md={12} item container alignItems='center'>
							<Grid item xs={12} xl={1}>
								<MaterialIcon size='large' icon='sports_esports'></MaterialIcon>
							</Grid>
							<Grid item xs={12} xl={11}>
								<Typography sx={textStyle} variant='h5'>
									{data?.latestTorneoCreado
										? JUEGOS[`${data.latestTorneoCreado[0]?.id_juego}`]
										: '-'}
								</Typography>
							</Grid>
						</Grid>
						<Grid xs={12} md={12} item container alignItems='center'>
							<Grid item xs={12} xl={1}>
								<MaterialIcon size='large' icon='traffic'></MaterialIcon>
							</Grid>
							<Grid item xs={12} xl={11}>
								<Typography sx={textStyle} variant='h5'>
									{data.latestTorneoCreado
										? ESTADOS[`${data.latestTorneoCreado[0]?.id_estado}`]
										: '-'}
								</Typography>
							</Grid>
						</Grid>
						<Grid xs={12} md={12} item container>
							<Grid item xs={12} xl={1}>
								<MaterialIcon size='large' icon='qr_code'></MaterialIcon>
							</Grid>
							<Grid item xs={12} xl={11}>
								<Typography sx={textStyle} variant='h5'>
									{data.latestTorneoCreado
										? data.latestTorneoCreado[0]?.codigo_torneo
										: '-'}
									{data.latestTorneoCreado && (
										<CopyToClipboard
											open={open}
											setOpen={setOpen}
											copy={
												data.latestTorneoCreado[0]?.codigo_torneo
											}></CopyToClipboard>
									)}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid
					item
					container
					justifyContent='start'
					alignItems='center'
					direction='row'
					sx={{ backgroundColor: '#1a3650', p: 6, mt: 3, borderRadius: 5 }}>
					<Grid item xs={12}>
						<Typography
							variant='h4'
							align='center'
							sx={{ textAlign: 'left', p: 4, ...textStyle }}>
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
									<Grid sx={{ px: 5 }} item container alignItems={'center'}>
										<MaterialIcon
											size='small'
											icon='access_time_filled'></MaterialIcon>
										<Typography
											variant='h6'
											sx={{ textAlign: 'left', ...textStyle }}>
											{new Date(register.fecha_modificacion).toLocaleString()}
										</Typography>
									</Grid>
									<Grid item xs={12} sx={{ px: 5 }}>
										<Typography variant='h6'>
											{register.desc_modificacion
												.split('\n')
												.map((item, index) => {
													return (
														<Grid key={index}>
															<Typography sx={textStyle} variant='span'>
																{' '}
																{item}{' '}
															</Typography>
															<br />
														</Grid>
													);
												})}
											<Divider
												sx={{ background: 'white', my: 2 }}
												light={true}></Divider>
										</Typography>
									</Grid>
									<br />
								</Grid>
							);
						})
					) : (
						<Typography
							variant='h6'
							sx={{ textAlign: 'left', px: 6, py: 1, ...textStyle }}>
							{' '}
							No hay actividad reciente
						</Typography>
					)}
				</Grid>
				<Grid
					item
					sx={{
						backgroundColor: '#287A79',
						p: 5,
						mt: 3,
						borderRadius: 5,
						minWidth: '100%',
					}}>
					<Grid item>
						<Typography sx={textStyle} variant='h4'>
							Grafica de torneos
						</Typography>
					</Grid>
					<Grid
						item
						sx={{
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
									labels: Object.values(ESTADOS).slice(0, 4),
									datasets: [
										{
											data: estadoTorneosCalculo(data.torneosCreados).slice(
												0,
												4
											),
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
			</Grid>
		)
	);
};

export default DashboardOrganizadorInicio;
