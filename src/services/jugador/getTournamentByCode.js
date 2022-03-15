import DashboardVerTorneo from '../../components/DashboardJugador/DashboardVerTorneo';
import React from 'react';
export default function (token, code, setResponseError, changeComponent) {
	fetch(`${process.env.REACT_APP_API_URL}/jugador/getTournamentByCode?code=${code}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then((response) => response.json())
		.then((response) => {
            
			if (response.err) {
				setResponseError(response.msg);
			} else {
                changeComponent(<DashboardVerTorneo idTorneo={response.torneo.id_torneo} />);
            }
		})
		.catch((error) => {
			setResponseError(error.toString());
		});
}
