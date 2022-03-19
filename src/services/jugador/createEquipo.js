import React from 'react';
import DashboardMisEquipos from '../../components/DashboardJugador/DashboardMisEquipos';
export default function crearTorneo(
	user,
	datos,
	setResponseError,
	changeComponent
) {
	fetch(`${process.env.REACT_APP_API_URL}/jugador/createTeam`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + user.token,
		},
		body: JSON.stringify(datos),
	})
		.then((response) => response.json())
		.then((response) => {
			if (response.err) {
				setResponseError(response.err);
			} else {
				changeComponent(<DashboardMisEquipos />);
			}
		})
		.catch((error) => {
			setResponseError(error.toString());
		});
}
