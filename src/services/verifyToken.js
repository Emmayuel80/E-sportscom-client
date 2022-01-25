import logout from './logout';

export default async function (setUser) {
	const data = JSON.parse(localStorage.getItem('data')) || {};
	const token = data.token || '';

	await fetch(`${process.env.REACT_APP_API_URL}/${data.tipo}/verifyToken`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then((response) => response.json())
		.then((response) => {
			// console.log(response);
			if (response.error) {
				logout(setUser);
			} else {
				setUser(data);
			}
		})
		.catch((error) => {
			console.log(error);
			logout(setUser);
		});
}
