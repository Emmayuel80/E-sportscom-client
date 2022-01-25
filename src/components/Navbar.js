import React from 'react';
import { AppBar, Grid, Link, Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';
// import { Link } from 'react-router-dom';

const Navbar = ({ children }) => {
	const matches = useMediaQuery('(min-width:600px)');
	return (
		<AppBar>
			<Toolbar>
				<Grid
					sx={{}}
					container
					justifyContent='space-between'
					alignItems='center'>
					<Grid item>
						<Link sx={{ textDecoration: 'none' }} color='secondary' href='/'>
							<Typography
								variant={matches ? 'h2' : 'h4'}
								xs={{ fontWeight: 'bold' }}>
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
};
export default Navbar;
