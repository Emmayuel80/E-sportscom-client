export default function (
	token,
	idJugador,
	idTorneo,
	setResponseError,
	values,
	setValues,
	setDisableAll
) {
	setDisableAll(true);
	fetch(
		`${process.env.REACT_APP_API_URL}/organizador/kickPlayerOrTeam/${idTorneo}/${idJugador}`,
		{
			method: 'DELETE',
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
				const newParticipantes = values.participantes.filter(
					(element) => element.id_usuario !== idJugador
				);
				setValues({ ...values, participantes: newParticipantes });
				setDisableAll(false);
			}
		})
		.catch((error) => {
			setResponseError(error.toString());
		});
}
