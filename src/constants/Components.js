import React from 'react';
import DashboardMisEquipos from '../components/DashboardJugador/DashboardMisEquipos';
import DashboardBuscarTorneo from '../components/DashboardJugador/DashboardBuscarTorneo';
import DashboardCrearEquipo from '../components/DashboardJugador/DashboardCrearEquipo';
import DashboardEditProfile from '../components/DashboardJugador/DashboardEditProfile';
import DashboardVerEquipo from '../components/DashboardJugador/DashboardVerEquipo';
import DashboardVerMisTorneosInscritos from '../components/DashboardJugador/DashboardVerMisTorneosInscritos';
import DashboardVerTorneo from '../components/DashboardJugador/DashboardVerTorneo';

const componentes = {
	DashboardBuscarTorneo: <DashboardBuscarTorneo></DashboardBuscarTorneo>,
	DashboardCrearEquipo: <DashboardCrearEquipo></DashboardCrearEquipo>,
	DashboardEditProfile: <DashboardEditProfile></DashboardEditProfile>,
	DashboardMisEquipos: <DashboardMisEquipos></DashboardMisEquipos>,
	DashboardVerEquipo: <DashboardVerEquipo></DashboardVerEquipo>,
	DashboardVerMisTorneosInscritos: (
		<DashboardVerMisTorneosInscritos></DashboardVerMisTorneosInscritos>
	),
	DashboardVerTorneo: <DashboardVerTorneo></DashboardVerTorneo>,
};
export default componentes;
