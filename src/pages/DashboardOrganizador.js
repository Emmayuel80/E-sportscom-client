import {
	Avatar,
	Divider,
	Grid,
	IconButton,
	ListItemIcon,
	Menu,
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
import DashboardOrganizadorInicio from '../components/DashboardOrganizador/DashboardOrganizadorInicio';

const DashboardOrganizador = () => {
	const { setUser, Component, changeComponent } = useContext(
		DashboardOrganizadorContext
	);
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
		changeComponent(<DashboardOrganizadorInicio />);
		verifyToken(setUser);
	}, []);
	return (
		<Grid container sx={{ minHeight: '100vh' }}>
			<Navbar>
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
			<Grid container>
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
				<Grid
					item
					xs={2}
					sx={{
						boxSizing: 'border-box',
						backgroundColor: '#2B6287',
						py: 10,
					}}>
					<OpcionesOrganizador></OpcionesOrganizador>
				</Grid>
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
	);
};

export default DashboardOrganizador;
