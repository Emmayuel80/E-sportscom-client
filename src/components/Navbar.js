import React from 'react';
import {
	AppBar,
	Grid,
	Link,
	Toolbar,
	Typography,
	IconButton,
} from '@mui/material';
import MaterialIcon from 'material-icons-react';
import PropTypes from 'prop-types';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { Link } from 'react-router-dom';
const appBarStyles = {
	width: { sm: `100%`, md: `calc(100% - ${240}px)` },
	ml: { sm: `${240}px`, md: `${240}px` },
};

const Navbar = ({ children, handleDrawerToggle, isPublic }) => {
	// 	const matches = useMediaQuery('(min-width:600px)');
	const appBarButton = (
		<IconButton
			color='inherit'
			aria-label='open drawer'
			edge='start'
			onClick={handleDrawerToggle}
			sx={{ mr: 2, display: { lg: 'none' } }}>
			<MaterialIcon icon='menu'></MaterialIcon>
		</IconButton>
	);
	return (
		<AppBar position='fixed' sx={isPublic ? {} : appBarStyles}>
			<Toolbar>
				{isPublic ? null : appBarButton}
				<Grid
					sx={{}}
					container
					justifyContent='space-between'
					alignItems='center'>
					<Grid item>
						<Link sx={{ textDecoration: 'none' }} color='secondary' href='/'>
							<Typography variant='h4' xs={{ fontWeight: 'bold' }}>
								E-SPORTSCOM
							</Typography>
						</Link>
					</Grid>
					<Grid item>{children}</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};
Navbar.propTypes = {
	children: PropTypes.any,
	handleDrawerToggle: PropTypes.func,
	isPublic: PropTypes.bool,
};
export default Navbar;
