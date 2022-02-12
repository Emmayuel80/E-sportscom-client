export default function (user, setTorneos) {
	fetch(`${process.env.REACT_APP_API_URL}/organizador/activeTournaments`, {
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
