import { Grid, Typography } from '@mui/material';
import verifyToken from '../services/verifyToken';
import React, { useContext } from 'react';
import DashboardOrganizadorContext from '../context/DashboardOrganizadorContext';

const DashboardOrganizador = () => {
	const { setUser } = useContext(DashboardOrganizadorContext);
	// const [anchorEl, setAnchorEl] = React.useState(null);
	// const open = Boolean(anchorEl);
	// const handleClickMenu = (event) => {
	// 	setAnchorEl(event.currentTarget);
	// };
	// const handleClose = () => {
	// 	setAnchorEl(null);
	// };

	React.useEffect(() => {
		// alert(localStorage.getItem('data'));
		verifyToken(setUser);
	}, []);
	return (
		<Grid>
			<Typography variant='h1'>Organizador</Typography>
		</Grid>
	);
};

export default DashboardOrganizador;
