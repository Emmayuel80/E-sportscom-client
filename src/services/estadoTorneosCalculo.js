import ESTADOS from '../constants/Estados';
export default function (arrayTorneosCreados) {
	const aux = Array(Object.keys(ESTADOS).length).fill(0);

	arrayTorneosCreados.forEach((torneo) => {
		aux[torneo.id_estado]++;
	});
	return aux;
}
