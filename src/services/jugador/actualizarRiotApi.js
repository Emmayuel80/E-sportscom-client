export default function (
	user,
	setResponseError,
	getProfileData,
	setProfileData
) {
	fetch(`${process.env.REACT_APP_API_URL}/jugador/actualizarRiotApi`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + user.token,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.error) {
				setResponseError(data.error);
			} else {
				getProfileData(user, setProfileData, setResponseError);
			}
		})
		.catch((error) => {
			setResponseError(error);
		});
}
