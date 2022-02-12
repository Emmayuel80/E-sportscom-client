export default function (token, idTorneo, setResponseError, setValues) {
	fetch(
		`${process.env.REACT_APP_API_URL}/organizador/tournamentData/${idTorneo}`,
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
			// setValues(response);
			if (response.err) {
				setResponseError(response.msg);
			} else {
				setValues(response);
			}
		})
		.catch((error) => {
			setResponseError(error.toString());
		});
}
