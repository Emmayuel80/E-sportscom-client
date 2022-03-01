export default function (token, idTorneo, setResponseError, setValues) {
	fetch(`${process.env.REACT_APP_API_URL}/jugador/getTorneoData/${idTorneo}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then((response) => response.json())
		.then((response) => {
			// setValues(response);
			if (!response.torneos) {
				const torneos = {};
				torneos.torneo = response;
				console.log(torneos)
				setValues(torneos);
			} else {
				setValues(response);
			}
			if (response.err) {
				setResponseError(response.msg);
			}
		})
		.catch((error) => {
			setResponseError(error.toString());
		});
}
