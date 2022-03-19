export default function (user, idEquipo, setEquipos, setResponseError) {
	return new Promise((resolve, reject) => {
		setEquipos(null);
		fetch(`${process.env.REACT_APP_API_URL}/jugador/getEquipo/${idEquipo}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + user.token,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
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
