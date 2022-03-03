export default function (user, idTorneo, setResponseError, handleClickOpen) {
	fetch(`${process.env.REACT_APP_API_URL}/jugador/registerPlayerToTournament`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + user.token,
		},
		body: JSON.stringify({
			idTorneo: idTorneo,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			if (!data.error) {
				handleClickOpen();
			} else {
				setResponseError(data.error);
				handleClickOpen();
			}
		})
		.catch((error) => {
			setResponseError(error);
		});
}
