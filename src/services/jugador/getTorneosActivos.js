export default function (index, cantidad, user, setTorneos, search = null) {
	const startIndex = (index > 0 ? index - 1 : index) * cantidad;
	let endpoint = '';
	if (search === null) {
		endpoint = `getTorneosActivos/${startIndex}/${cantidad}`;
	} else {
		endpoint = `getTorneoByName/${startIndex}/${cantidad}?name=${search}`;
	}
	setTorneos({});
	fetch(`${process.env.REACT_APP_API_URL}/jugador/${endpoint}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + user.token,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			if (data) {
				setTorneos(data);
			} else {
				console.log(data.message);
			}
		})
		.catch((error) => {
			console.log(error);
		});
}
