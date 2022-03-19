export default function (
	token,
	idTorneo,
	idEquipo,
	setResponseError,
	handleClickOpen
) {
	fetch(`${process.env.REACT_APP_API_URL}/jugador/registerTeamToTournament`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify({
			idTorneo: idTorneo,
			idEquipo: idEquipo,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			if (!data.error) {
				handleClickOpen();
			} else {
				setResponseError(data.error);
			}
		})
		.catch((error) => {
			setResponseError(error);
		});
}
