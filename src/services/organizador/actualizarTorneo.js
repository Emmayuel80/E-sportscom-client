import React from 'react';
import DashboardOrganizadorInicio from '../../components/DashboardOrganizador/DashboardOrganizadorInicio';

export default function (token, torneoData, setResponseError, changeComponent) {
	fetch(
		`${process.env.REACT_APP_API_URL}/organizador/updateTournament/${torneoData.id_torneo}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			body: JSON.stringify({
				...torneoData,
				fecha_fin_registro: new Date(torneoData.fecha_fin_registro).toString(),
				fecha_inicio: new Date(torneoData.fecha_inicio).toString(),
			}),
		}
	)
		.then((response) => response.json())
		.then((response) => {
			if (response.err) {
				setResponseError(response.err);
			} else {
				changeComponent(<DashboardOrganizadorInicio />);
			}
		})
		.catch((error) => {
			setResponseError(error.toString());
		});
}
