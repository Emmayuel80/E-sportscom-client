import React, { useContext } from 'react';
import { Grid, Pagination, Typography, Skeleton } from '@mui/material';
// import CustomCard from '../CustomCard';
import CardElement from '../CardElement';
import DashboardOrganizadorContext from '../../context/DashboardOrganizadorContext';
import getTorneos from '../../services/organizador/getTorneos';
// import PublicForm from '../PublicForm';
const cantidad = 6;
// let torneoSize = 0;
const DashboardOrganizadorVerHistorialDeTorneos = () => {
	const { user } = useContext(DashboardOrganizadorContext);
	const [torneos, setTorneos] = React.useState({});
	const [paginationCount, setPaginationCount] = React.useState(0);

	const getPaginationCalc = () => {
		const n = parseInt(torneos.total) / cantidad;
		setPaginationCount(n % 1 === 0 ? n : parseInt(n + 1));
	};

	const handlePaginationChange = (event, index) => {
		getTorneos(index, cantidad, user, setTorneos, torneos);
	};

	React.useEffect(() => {
		// tournaments/:inicio/:cantidad
		if (user.token) {
			getTorneos(0, cantidad, user, setTorneos, torneos);
			// torneoSize = Math.round(torneos.length / cantidad) + 1;
		}
	}, []);

	React.useEffect(() => {
		if (torneos.total) {
			getPaginationCalc();
		}
	}, [torneos]);

	console.log(Math.round(torneos.total / cantidad) + 1);

	return (
		<Grid item xs={12} container justifyContent='center' direction='row'>
			<Grid item xs={12}>
				<Typography variant='h3'>Historial de Torneos</Typography>
			</Grid>
			<Grid
				container
				justifyContent='center'
				alignItems='center'
				item
				direction='row'
				xs={12}>
				<Grid
					item
					container
					justifyContent='space-around'
					direction='row'
					gap={2}>
					{torneos.torneos ? (
						torneos.torneos.map((element, index) => {
							return (
								<Grid
									key={JSON.stringify(element)}
									item
									xs={12}
									sm={6}
									md={4}
									lg={3}>
									<CardElement
										data={element}
										edicionHabilitada={false}></CardElement>
								</Grid>
							);
						})
					) : (
						<Grid
							item
							container
							justifyContent='space-around'
							direction='column'>
							<Skeleton variant='rectangular' width={310} height={200} />
							<Skeleton width={310} height={20} />
							<Skeleton width={310} height={20} />
						</Grid>
					)}
				</Grid>
				<Grid container justifyContent='center' item xs={12} direction='row'>
					{torneos.total && (
						<Pagination
							onChange={handlePaginationChange}
							size='small'
							count={paginationCount}
							color='secondary'
						/>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default DashboardOrganizadorVerHistorialDeTorneos;
