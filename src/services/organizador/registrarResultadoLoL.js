export default function (
	token,
	idGanador,
	idPartida,
	setResponseError,
	setReload,
	reload,
	setConfirmDialog,
	setOpen
) {
	fetch(
		`${process.env.REACT_APP_API_URL}/organizador/registerResultLOL/${idGanador}/${idPartida}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		}
	)
		.then((response) => response.json())
		.then((response) => {
			if (response.err) {
				setResponseError(response.err);
				setConfirmDialog(false);
				setOpen(false);
			} else {
				setConfirmDialog(false);
				setOpen(false);
				setReload(reload + 1);
			}
		})
		.catch((error) => {
			setResponseError(error.toString());
		});
}
