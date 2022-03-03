import React, { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
// import CustomCard from '../CustomCard';
import CardElement from '../CardElement';
import getTorneosActivos from '../../services/organizador/getTorneosActivos';
import DashboardOrganizadorContext from '../../context/DashboardOrganizadorContext';
const DashboardOrganizadorMisTorneos = () => {
	const { user } = useContext(DashboardOrganizadorContext);
	const [torneos, setTorneos] = React.useState([]);

	React.useEffect(() => {
		if (user.token) {
			getTorneosActivos(user, setTorneos);
		}
	}, []);

	return (
		<Grid container justifyContent='center'>
			<Grid item xs={12}>
				<Typography sx={{ color: 'white' }} variant='h3'>
					Mis torneos activos
				</Typography>
			</Grid>
			<Grid
				container
				justifyContent='space-around'
				gap={2}
				alignItems='center'
				item
				sx={{ p: 5 }}
				xs={12}>
				{torneos &&
					torneos.map((element, index) => {
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
									edicionHabilitada={true}></CardElement>
							</Grid>
						);
					})}
			</Grid>
		</Grid>
	);
};

export default DashboardOrganizadorMisTorneos;
