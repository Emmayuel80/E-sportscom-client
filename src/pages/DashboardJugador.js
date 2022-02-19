import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import {
	Grid,
	Avatar,
	IconButton,
	Menu,
	MenuItem,
	Box,
	Drawer,
	Divider,
	ListItemIcon,
} from '@mui/material';
import OpcionesJugador from '../components/OpcionesJugador';
import DashBoardJugadorContext from '../context/DashboardJugadorContext';
import AvatarImg from '../pngegg.png';
import verifyToken from '../services/verifyToken';
import MaterialIcon from 'material-icons-react';
import DashboardEditProfile from '../components/DashboardJugador/DashboardEditProfile';
import PropTypes from 'prop-types';
import Logout from '../services/logout';
import DashboardBuscarTorneos from '../components/DashboardJugador/DashboardBuscarTorneos';
const DashboardJugador = (props) => {
	const { window } = props;
	const {
		setUser,
		Component,
		changeComponent,
		user,
		mobileOpen,
		handleDrawerToggle,
	} = useContext(DashBoardJugadorContext);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClickMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	React.useEffect(() => {
		// alert(localStorage.getItem('data'));
		verifyToken(setUser);
	}, []);
	React.useEffect(() => {
		if (user !== {}) {
			changeComponent(<DashboardBuscarTorneos />);
		}
	}, [user]);
	const container =
		window !== undefined ? () => window().document.body : undefined;
	return (
		<Box sx={{ display: 'flex' }}>
			<Box
				component='nav'
				sx={{
					width: { xs: '0', sm: '0', lg: `240px` },
					flexShrink: { lg: 0 },
				}}
				aria-label='mailbox folders'>
				<Navbar handleDrawerToggle={handleDrawerToggle}>
					<IconButton
						onClick={handleClickMenu}
						size='small'
						sx={{ pl: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}>
						<Avatar src={user.image ? user.image : AvatarImg} />
					</IconButton>
				</Navbar>
				<Menu
					anchorEl={anchorEl}
					id='account-menu'
					open={open}
					onClose={handleClose}
					onClick={handleClose}
					PaperProps={{
						elevation: 0,
						sx: {
							backgroundColor: '#f5f5f5',
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							'&:before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: '#f5f5f5',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0,
							},
						},
					}}
					transformOrigin={{ horizontal: 'right', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
					<MenuItem>
						<Avatar src={user.image ? user.image : AvatarImg} />{' '}
						{user.nombre_invocador}
					</MenuItem>
					<Divider />
					<MenuItem onClick={(e) => changeComponent(<DashboardEditProfile />)}>
						<ListItemIcon>
							<MaterialIcon icon='settings' size='small' />
						</ListItemIcon>
						Editar Cuenta
					</MenuItem>
					<MenuItem onClick={(e) => Logout(setUser)}>
						<ListItemIcon>
							<MaterialIcon icon='logout' size='small' />
						</ListItemIcon>
						Cerrar Sesión
					</MenuItem>
				</Menu>
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'block', lg: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
					}}>
					<OpcionesJugador></OpcionesJugador>
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: 'none', sm: 'none', lg: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
					}}
					open>
					<OpcionesJugador></OpcionesJugador>
				</Drawer>
			</Box>

			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 0,
					m: 0,
					width: { md: '100vw', lg: `calc(100% - ${240}px)` },
				}}>
				<Grid
					container
					direction='column'
					justifyContent='center'
					sx={{ minHeight: '100vh' }}>
					<Grid item container justifyContent='center'>
						<Grid
							item
							container
							direction='row'
							justifyContent='center'
							xs={10}
							sx={{ minHeight: '100vh', backgroundColor: '#28527A', py: 12 }}>
							{Component}
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

DashboardJugador.propTypes = {
	window: PropTypes.any,
};
export default DashboardJugador;
