
export default function (token, idTorneo, setResponseError, setPartida) {
	fetch(
		`${process.env.REACT_APP_API_URL}/jugador/getPartidaLoL/${idTorneo}`,
		{
			method: 'GET',
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
                setPartida(response);
			}
		})
		.catch((error) => {
			setResponseError(error.toString());
		});
}
