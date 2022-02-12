import DashboardOrganizadorMisTorneos from '../components/DashboardOrganizador/DashboardOrganizadorMisTorneos';
import React from 'react';

export default function (token, idTorneo, setResponseError, changeComponent) {
	fetch(
		`${process.env.REACT_APP_API_URL}/organizador/cancelTournament/${idTorneo}`,
		{
			method: 'PUT',
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
				changeComponent(<DashboardOrganizadorMisTorneos />);
			}
		})
		.catch((error) => {
			setResponseError(error.toString());
		});
}
