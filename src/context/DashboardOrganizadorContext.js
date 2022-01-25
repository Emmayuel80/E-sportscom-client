import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
const DashboardOrganizadorContext = createContext();

const DashboardOrganizadorProvider = ({ children }) => {
	const [Component, setComponent] = useState(null);
	const [user, setUser] = React.useState({});
	const changeComponent = (Component) => {
		setComponent(null);
		setComponent(Component);
	};

	const data = { Component, changeComponent, setUser, user };

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
