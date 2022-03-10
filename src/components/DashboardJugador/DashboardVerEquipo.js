import {
	Avatar,
	Grid,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'material-icons-react';
import DashBoardJugadorContext from '../../context/DashboardJugadorContext';
import ResponseError from '../ResponseError';

import AvatarImg from '../../pngegg.png';
import getEquipo from '../../services/jugador/getEquipo';
import CopyToClipboard from '../CopyToClipboard';
import DashboardEditEquipo from './DashboardEditEquipo';

const capitan = true;
const DashboardVerEquipo = ({ idEquipo }) => {
	// Context
	const { user, changeComponent } = React.useContext(DashBoardJugadorContext);
	// States
	const [values, setValues] = React.useState(null);
	const [responseError, setResponseError] = React.useState(false);
	const [openClipboard, setOpenClipboard] = React.useState(false);
	// Handlers

	// UseEffect
	React.useEffect(() => {
		getEquipo(user, idEquipo, setValues, setResponseError);
	}, []);

	return !values ? (
		<Grid item></Grid>
	) : (
		<Grid container justifyContent='center' direction='row'>
			<Grid
				sx={{ py: 2 }}
				container
				justifyContent='space-between'
				direction='row'
				xs={12}
				item>
				<Grid container direction='row' item xs={6}>
					<Grid
						container
						direction='row'
						justifyContent='start'
						alignItems='center'
						item
						xs={12}>
						<Typography sx={{ color: 'white' }} variant='h2'>
							{values.equipo.nombre}
						</Typography>
						<IconButton
							onClick={(e) =>
								changeComponent(
									<DashboardEditEquipo
										idEquipo={idEquipo}
										nombre={values.equipo.nombre}
										logoBefore={values.equipo.logo}></DashboardEditEquipo>
								)
							}
							size='large'
							aria-label='close'
							color='primary'>
							<MaterialIcon icon='edit'></MaterialIcon>
						</IconButton>
					</Grid>
				</Grid>
				<Grid container alignItems='center' justifyContent='end' item xs={6}>
					<img width={96} height={96} src={values.equipo.logo} />
				</Grid>
				<Grid
					container
					justifyContent='start'
					alignItems={'center'}
					item
					xs={12}>
					<Typography sx={{ color: 'white' }} variant='h4'>
						Código de Equipo: {values.equipo.codigo_equipo}
					</Typography>
					<CopyToClipboard
						open={openClipboard}
						setOpen={setOpenClipboard}
						copy={values.equipo.codigo_equipo}></CopyToClipboard>
				</Grid>
			</Grid>
			<Grid
				sx={{ width: '80vw' }}
				xs={12}
				item
				container
				justifyContent='start'
				direction='column'>
				<Typography sx={{ color: 'white' }} variant='h4'>
					Integrantes:{' '}
				</Typography>
				<TableContainer>
					<Table sx={{ overflowX: 'hidden' }}>
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell sx={{ color: 'white' }}>Nombre</TableCell>
								<TableCell sx={{ color: 'white' }}>Nombre Invocador</TableCell>
								{capitan && (
									<TableCell sx={{ textAlign: 'center', color: 'white' }}>
										Acciones
									</TableCell>
								)}
							</TableRow>
						</TableHead>
						<TableBody>
							{values?.jugadores &&
								values.jugadores.map((element, index) => {
									return (
										<TableRow key={index}>
											<TableCell>
												<Avatar
													src={element.image ? element.image : AvatarImg}
												/>
											</TableCell>
											<TableCell>
												<Typography
													sx={{ color: 'white' }}
													variant='body2'
													component='span'>
													{element.nombre}
												</Typography>
											</TableCell>
											<TableCell>
												<Typography
													sx={{ color: 'white' }}
													variant='body2'
													component='span'>
													{element.nombre_invocador}
												</Typography>
											</TableCell>
											{capitan && (
												<TableCell sx={{ textAlign: 'center' }}>
													<Tooltip title='Expulsar jugador'>
														<IconButton>
															<MaterialIcon icon='person_off'></MaterialIcon>
														</IconButton>
													</Tooltip>
												</TableCell>
											)}
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
			<Grid item>
				<ResponseError error={responseError}></ResponseError>
			</Grid>
		</Grid>
	);
};
DashboardVerEquipo.propTypes = {
	idEquipo: PropTypes.any,
};

export default DashboardVerEquipo;
