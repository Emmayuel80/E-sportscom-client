import React from 'react';
import DashboardOrganizadorInicio from '../../components/DashboardOrganizador/DashboardOrganizadorInicio';
export default function crearTorneo(
	datos,
	token,
	setResponseError,
	changeComponent
) {
	fetch(`${process.env.REACT_APP_API_URL}/organizador/createTournament`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify({
			nombre: datos.nombreTorneo,
			id_juego: datos.idJuego,
			no_equipos: datos.idJuego === '1' ? datos.noEquipos : null,
			no_enfrentamientos:
				datos.idJuego === '2' ? datos.noEnfrentamientos : null,
			fecha_fin_registro: new Date(datos.fechaFinRegistro).toString(),
			fecha_inicio: new Date(datos.fechaInicio).toString(),
			premio: datos.premio,
			privado: datos.privado,
			desc_premio: datos.descPremio,
			description: datos.descTorneo,
		}),
	})
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
