export default function (user, setEquipos, setResponseError) {
    return new Promise((resolve, reject) => {
	fetch(`${process.env.REACT_APP_API_URL}/jugador/getEquipos`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + user.token,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			if (!data.error) {
				setEquipos(data);
                resolve(data);
			} else {
				setResponseError(data.error);
			}
		})
		.catch((error) => {
			setResponseError(error);
            reject(error);
		});
    });
}
