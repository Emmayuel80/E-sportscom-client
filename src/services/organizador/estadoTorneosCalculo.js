import ESTADOS from '../../constants/Estados';
/* Calculo de array para grafica de DashboardOrganizadorInicio */
export default function (arrayTorneosCreados) {
	const aux = Array(Object.keys(ESTADOS).length).fill(0);

	arrayTorneosCreados.forEach((torneo) => {
		aux[torneo.id_estado]++;
	});
	return aux;
}
