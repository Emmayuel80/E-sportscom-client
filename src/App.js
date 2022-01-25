import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
// import DashboardJugador from './pages/DashboardJugador';
// import { DashboardJugadorProvider } from './context/DashboardJugadorContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import DashboardJugador from './pages/DashboardJugador';
import { DashboardJugadorProvider } from './context/DashboardJugadorContext';
import { DashboardOrganizadorProvider } from './context/DashboardOrganizadorContext';
import VerifyEmail from './pages/VerifyEmail';
import DashboardOrganizador from './pages/DashboardOrganizador';

const defaultTheme = createTheme({
	palette: {
		background: {
			default: '#28527A',
			paper: '#28527A',
		},
		primary: {
			main: '#28527A',
			contrastText: '#F4D160',
		},
		secondary: {
			main: '#F4D160',
			contrastText: '#28527A',
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<CssBaseline></CssBaseline>
			<Router>
				<Routes>
					<Route exact path='/' element={<Landing></Landing>} />
					<Route exact path='/login' element={<Login></Login>} />
					<Route exact path='/register' element={<Register></Register>} />
					<Route
						exact
						path='/forgotPassword/'
						element={<ForgotPassword></ForgotPassword>}></Route>
					<Route
						exact
						path='/resetPassword/:id/:token'
						element={<ResetPassword></ResetPassword>}></Route>
					<Route
						exact
						path='/dashboardJugador'
						element={
							<DashboardJugadorProvider>
								<DashboardJugador></DashboardJugador>
							</DashboardJugadorProvider>
						}></Route>
					<Route
						exact
						path='/dashboardOrganizador'
						element={
							<DashboardOrganizadorProvider>
								<DashboardOrganizador></DashboardOrganizador>
							</DashboardOrganizadorProvider>
						}></Route>
					<Route
						exact
						path='/verifyEmail/:id/:token'
						element={<VerifyEmail></VerifyEmail>}></Route>
				</Routes>
			</Router>
			{/* <Landing></Landing> */}
			{/* <Register></Register> */}
			{/* <Login></Login> */}
			{/* <DashboardJugadorProvider>
				<DashboardJugador></DashboardJugador>
			</DashboardJugadorProvider> */}
		</ThemeProvider>
	);
}

export default App;
