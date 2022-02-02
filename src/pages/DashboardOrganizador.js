import {
	Avatar,
	Divider,
	Grid,
	IconButton,
	ListItemIcon,
	Menu,
	Box,
	Drawer,
	MenuItem,
} from '@mui/material';
import verifyToken from '../services/verifyToken';
import React, { useContext } from 'react';
import DashboardOrganizadorContext from '../context/DashboardOrganizadorContext';
import Navbar from '../components/Navbar';
import OpcionesOrganizador from '../components/OpcionesOrganizador';
import MaterialIcon from 'material-icons-react';
import AvatarImg from '../pngegg.png';
import Logout from '../services/logout';
import PropTypes from 'prop-types';
import DashboardOrganizadorInicio from '../components/DashboardOrganizador/DashboardOrganizadorInicio';

const DashboardOrganizador = (props) => {
	const { window } = props;
	const {
		setUser,
		Component,
		changeComponent,
		user,
		mobileOpen,
		handleDrawerToggle,
	} = useContext(DashboardOrganizadorContext);
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
			changeComponent(<DashboardOrganizadorInicio />);
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
						<Avatar src={AvatarImg} />
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
						<Avatar /> Profile
					</MenuItem>
					<Divider />
					<MenuItem>
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
					<OpcionesOrganizador></OpcionesOrganizador>
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: 'none', sm: 'none', lg: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
					}}
					open>
					<OpcionesOrganizador></OpcionesOrganizador>
				</Drawer>
			</Box>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
					width: { md: '100vw', lg: `calc(100% - ${240}px)` },
				}}>
				<Grid container sx={{ minHeight: '100vh' }}>
					<Grid item container justifyContent='center'>
						<Grid
							item
							container
							direction='column'
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
DashboardOrganizador.propTypes = {
	window: PropTypes.any,
};

export default DashboardOrganizador;
