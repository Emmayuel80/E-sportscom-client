import React from 'react';
import DashboardMisEquipos from '../../components/DashboardJugador/DashboardMisEquipos';
export default function (
	token,
	idJugador,
	idEquipo,
	setResponseError,
	changeComponent,
	setDisableAll
) {
	setDisableAll(true);
	fetch(`${process.env.REACT_APP_API_URL}/jugador/deletePlayerFromTeam`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify({
			idEquipo: idEquipo,
			idJugador: idJugador,
		}),
	})
		.then((response) => response.json())
		.then((response) => {
			if (response.err) {
				setResponseError(response.msg);
				setDisableAll(false);
			} else {
				changeComponent(<DashboardMisEquipos />);
			}
		})
		.catch((error) => {
			setResponseError(error.toString());
		});
}
