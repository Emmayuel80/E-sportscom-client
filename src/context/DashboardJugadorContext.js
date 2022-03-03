import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
const DashBoardJugadorContext = createContext();

const DashboardJugadorProvider = ({ children }) => {
	const [Component, setComponent] = useState(null);
	const [user, setUser] = React.useState({});
	const changeComponent = (Component) => {
		setComponent(null);
		setMobileOpen(false);
		setComponent(Component);
	};
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	  };  
  

	const data = { Component, changeComponent, setUser, user,  mobileOpen, setMobileOpen, handleDrawerToggle };

	return (
		<DashBoardJugadorContext.Provider value={data}>
			{children}
		</DashBoardJugadorContext.Provider>
	);
};

DashboardJugadorProvider.propTypes = {
	children: PropTypes.any,
};

export { DashboardJugadorProvider };
export default DashBoardJugadorContext;
