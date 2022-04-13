import {
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Button,
} from '@mui/material';
import React from 'react';
import DashBoardJugadorContext from '../../context/DashboardJugadorContext';
import getChampionInfo from '../../services/getChampionInfo';
import actualizarRiotApi from '../../services/jugador/actualizarRiotApi';
import getProfileData from '../../services/jugador/getProfileData';
import CircularDisplay from '../CircularDisplay';
import ResponseError from '../ResponseError';

const DashboardVerPerfil = () => {
	const { user } = React.useContext(DashBoardJugadorContext);

	const [profileData, setProfileData] = React.useState(null);
	const [responseError, setResponseError] = React.useState(false);
	const [rankLOL, setRankLOL] = React.useState({});
	const [rankTFT, setRankTFT] = React.useState({});
	const [torneosParticipados, setTorneosParticipados] = React.useState(0);
	const [torneosGanados, setTorneosGanados] = React.useState(0);
	const [championList, setChampionList] = React.useState(null);

	React.useEffect(() => {
		getProfileData(user, setProfileData, setResponseError);
	}, []);

	React.useEffect(() => {
		if (profileData) {
			if (!profileData.usuario[0].riot_api) return;
			const championInfoList = [];
			const auxUserData = JSON.parse(profileData.usuario[0].riot_api);
			// console.log(auxUserData);
			setRankLOL(
				auxUserData.leagueLOL.filter(
					(typeRank) => typeRank.queueType === 'RANKED_SOLO_5x5'
				)[0]
			);
			setRankTFT(
				auxUserData.leagueTFT.filter(
					(typeRank) => typeRank.queueType === 'RANKED_TFT'
				)[0]
			);
			setTorneosParticipados(
				profileData.torneosParticipadosLOL + profileData.torneosParticipadosTFT
			);
			setTorneosGanados(
				profileData.torneosGanadosLOL + profileData.torneosGanadosTFT
			);

			// for(const champ of auxUserData.masteryLOL){
			// 	const aux = await getChampionInfo(champ.championId)
			// }
			auxUserData.masteryLOL.forEach((champ) => {
				championInfoList.push(getChampionInfo(champ.championId));
			});

			Promise.all(championInfoList).then((values) => {
				// console.log(values);
				setChampionList(values);
			});
		}
	}, [profileData]);
	// console.log(profileData);

	const handleActualizarRiotApi = () => {
		actualizarRiotApi(user, setResponseError, getProfileData, setProfileData);
	};

	return (
		<Grid
			container
			item
			xs={12}
			justifyContent='center'
			alignItems='center'
			direction='row'>
			{profileData?.usuario[0]?.riot_api ? (
				<>
					<Grid item xs={12} xl={6} md={6}>
						<Grid item container justifyContent='center' xs={12}>
							<img
								style={{ width: '15rem', height: '15rem', borderRadius: '50%' }}
								src={user.image}
							/>
						</Grid>
						<Grid container justifyContent='center' item xs={12}>
							<Grid item xs={12} container justifyContent='center'>
								<Typography sx={{ color: 'white' }} variant='h4'>
									{user.nombre_invocador}
								</Typography>
							</Grid>
							<Grid item xs={12} container justifyContent='center'>
								<Typography sx={{ color: 'white' }} variant='h5'>
									Nivel de invocador:{' '}
									{JSON.parse(profileData.usuario[0].riot_api).summonerLevel}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						xs={12}
						md={12}
						xl={6}
						item
						container
						justifyContent='center'
						spacing={5}
						direction='row'>
						<Grid container justifyContent='center' item xs={12} md={6} xl={6}>
							<Grid item>
								<img
									style={{
										width: '15rem',
										height: '15rem',
										borderRadius: '50%',
									}}
									src={
										rankLOL
											? `/assets/emblems/${rankLOL.tier}.png`
											: '/assets/emblems/UNRANKED.png'
									}
								/>
								<Typography
									sx={{ color: 'white', textAlign: 'center' }}
									variant='h5'>
									{rankLOL ? rankLOL.tier + ' ' + rankLOL.rank : 'Unranked'}
								</Typography>
							</Grid>
						</Grid>
						<Grid container justifyContent='center' item xs={12} md={6} xl={6}>
							<Grid item>
								<img
									style={{
										width: '15rem',
										height: '15rem',
										borderRadius: '50%',
									}}
									src={
										rankTFT
											? `/assets/emblems/${rankTFT.tier}.png`
											: '/assets/emblems/UNRANKED.png'
									}
								/>
								<Typography
									sx={{ color: 'white', textAlign: 'center' }}
									variant='h5'>
									{rankTFT ? rankTFT?.tier + ' ' + rankTFT?.rank : 'Unranked'}
								</Typography>
							</Grid>
						</Grid>
						<Grid container justifyContent='center' item xs={12} md={6} xl={6}>
							<Grid item xs={12}>
								<CircularDisplay
									size={180}
									data={{
										value: torneosParticipados,
										description: 'Torneos participados',
									}}></CircularDisplay>
							</Grid>
						</Grid>
						<Grid container justifyContent='center' item xs={12} md={6} xl={6}>
							<Grid item xs={12}>
								<CircularDisplay
									size={180}
									data={{
										value: torneosGanados,
										description: 'Torneos ganados',
									}}></CircularDisplay>
							</Grid>
						</Grid>
					</Grid>

					<Grid sx={{ py: 10, flexShrink: 1 }} item container>
						<TableContainer>
							<Table aria-label='simple table'>
								<TableHead>
									<TableRow>
										<TableCell></TableCell>
										<TableCell align='center'>
											<Typography sx={{ color: 'white' }} variant='h4'>
												Campeon
											</Typography>
										</TableCell>
										<TableCell align='center'>
											<Typography sx={{ color: 'white' }} variant='h4'>
												Maestria
											</Typography>
										</TableCell>
										<TableCell align='center'>
											<Typography sx={{ color: 'white' }} variant='h4'>
												Puntos de Campeon
											</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{championList &&
										championList.map((champ, index) => {
											const auxChampData = JSON.parse(
												profileData.usuario[0].riot_api
											).masteryLOL[index];
											// console.log(champ);
											return (
												<TableRow key={champ.id + ' ' + index}>
													<TableCell>
														<img
															src={`https://cdn.communitydragon.org/${process.env.REACT_APP_PATCH}/champion/${champ.id}/square`}></img>
													</TableCell>
													<TableCell align='center'>
														<Typography sx={{ color: 'white' }} variant='h4'>
															{champ.name}
														</Typography>
													</TableCell>
													<TableCell align='center'>
														<Typography sx={{ color: 'white' }} variant='h4'>
															{auxChampData.championLevel}
														</Typography>
													</TableCell>

													<TableCell align='center'>
														<Typography sx={{ color: 'white' }} variant='h4'>
															{auxChampData.championPoints}
														</Typography>
													</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</>
			) : (
				<Grid item xs={12} container justifyContent='center'>
					<Typography sx={{ color: 'white' }} variant='h4'>
						No hay informacion que mostrar
					</Typography>
				</Grid>
			)}
			<Grid item xs={12} justifyContent='center' container>
				<Button
					onClick={(e) => handleActualizarRiotApi()}
					variant='contained'
					color='secondary'>
					Actualizar informacion
				</Button>
			</Grid>

			<ResponseError error={responseError} />
		</Grid>
	);
};

export default DashboardVerPerfil;
