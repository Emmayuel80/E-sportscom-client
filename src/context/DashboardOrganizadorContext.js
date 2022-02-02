import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
const DashboardOrganizadorContext = createContext();

const DashboardOrganizadorProvider = ({ children }) => {
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

	const data = { Component, changeComponent, setUser, user, mobileOpen, setMobileOpen, handleDrawerToggle };

	return (
		<DashboardOrganizadorContext.Provider value={data}>
			{children}
		</DashboardOrganizadorContext.Provider>
	);
};

DashboardOrganizadorProvider.propTypes = {
	children: PropTypes.any,
};

export { DashboardOrganizadorProvider };
export default DashboardOrganizadorContext;
