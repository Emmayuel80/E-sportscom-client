export default function (token, setEquipos) {
	return new Promise((resolve, reject) => {
		setEquipos(null);
		fetch(`${process.env.REACT_APP_API_URL}/jugador/getEquiposLlenosCapitan`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (!data.error) {
					setEquipos(data);
					resolve(data);
				} else {
					console.log(data.error);
				}
			})
			.catch((error) => {
				console.log(error);
				reject(error);
			});
	});
}
