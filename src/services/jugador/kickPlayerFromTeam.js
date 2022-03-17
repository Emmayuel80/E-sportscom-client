export default function (
	token,
	idJugador,
	idEquipo,
	setResponseError,
	values,
	setValues,
	setDisableAll
) {
	setDisableAll(true);
	fetch(`${process.env.REACT_APP_API_URL}/jugador/kickPlayerFromTeam`, {
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
			} else {
				const newParticipantes = values.jugadores.filter(
					(element) => element.id_usuario !== idJugador
				);
				setValues({ ...values, jugadores: newParticipantes });
				setDisableAll(false);
			}
		})
		.catch((error) => {
			setResponseError(error.toString());
		});
}
