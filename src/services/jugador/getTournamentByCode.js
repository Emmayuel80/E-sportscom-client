import React from 'react';
import DashboardVerTorneoTFT from '../../components/DashboardJugador/DashboardVerTorneoTFT';
import DashboardVerTorneoLOL from '../../components/DashboardJugador/DashboardVerTorneoLOL';
export default function (token, code, setResponseError, changeComponent) {
	fetch(
		`${process.env.REACT_APP_API_URL}/jugador/getTournamentByCode?code=${code}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		}
	)
		.then((response) => response.json())
		.then((response) => {
			if (response.err) {
				setResponseError(response.msg);
			} else {
				changeComponent(
					response.torneo.id_juego ? (
						<DashboardVerTorneoLOL
							idTorneo={response.torneo.id_torneo}></DashboardVerTorneoLOL>
					) : (
						<DashboardVerTorneoTFT idTorneo={response.torneo.id_torneo} />
					)
				);
			}
		})
		.catch((error) => {
			setResponseError(error.toString());
		});
}
