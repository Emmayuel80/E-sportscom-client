export default function (user, codigo, setResponseError, setOpen) {
    return new Promise((resolve, reject) => {
	fetch(`${process.env.REACT_APP_API_URL}/jugador/joinTeam`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + user.token,
		},
		body: JSON.stringify({
			codigo: codigo,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			if (!data.error) {
				setOpen(false);
				setResponseError(false);
                resolve(data);
			} else {
				setResponseError(data.error);
				setOpen(false);
            
			}
		})
		.catch((error) => {
			setResponseError(error);
            reject(error);
		});
    });
}
