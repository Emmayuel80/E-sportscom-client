export default function (idCampeon) {
	return new Promise(function (resolve, reject) {
		fetch(
			`https://cdn.communitydragon.org/${process.env.REACT_APP_PATCH}/champion/${idCampeon}/data`,
			{
				method: 'GET',
			}
		)
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					// setCampeon(data);
					// console.log(data);
					resolve(data);
				} else {
					console.log(data.message);
				}
			})
			.catch((error) => {
				reject(error);
				console.log(error);
			});
	});
}
