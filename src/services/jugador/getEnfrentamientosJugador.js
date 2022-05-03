export default function (token, idTorneo, setEnfrentamientos) {

	fetch(
		`${process.env.REACT_APP_API_URL}/jugador/getEnfrentamientos/${idTorneo}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		}
	)
		.then((response) => response.json())
		.then((data) => {
			if (data) {
				setEnfrentamientos(data);
			} else {
				console.log(data.message);
			}
		})
		.catch((error) => {
			console.log(error);
		});
}
