import React from 'react';
import DashboardVerTorneoTFT from '../../components/DashboardJugador/DashboardVerTorneoTFT';
export default function (
	user,
	idEnfrentamiento,
	idTorneo,
	changeComponent,
	setOpenBackdrop,
	setResponseError
) {
	fetch(
		`${process.env.REACT_APP_API_URL}/jugador/getEnfrentamientosResultados/${idEnfrentamiento}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + user.token,
			},
		}
	)
		.then((response) => response.json())
		.then((data) => {
			if (!data.error) {
				changeComponent(<DashboardVerTorneoTFT idTorneo={idTorneo} />);
			} else {
				setResponseError(data.error);
				setOpenBackdrop(false);
			}
		})
		.catch((error) => {
			setResponseError(error);
			setOpenBackdrop(false);
		});
}
