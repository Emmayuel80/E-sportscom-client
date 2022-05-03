import {
	Alert,
	AlertTitle,
	Button,
	Grid,
	IconButton,
	Snackbar,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import MaterialIcon from 'material-icons-react';

const InstallPWALogin = () => {
	const [supportsPWA, setSupportsPWA] = useState(false);
	const [promptInstall, setPromptInstall] = useState(null);
	const [showBanner, setShowBanner] = useState(true);

	useEffect(() => {
		const handler = (e) => {
			e.preventDefault();
			console.log('we are being triggered :D');
			setSupportsPWA(true);
			setPromptInstall(e);
		};
		window.addEventListener('beforeinstallprompt', handler);

		return () => window.removeEventListener('transitionend', handler);
	}, []);

	const onClick = (evt) => {
		evt.preventDefault();
		if (!promptInstall) {
			return;
		}
		promptInstall.prompt();
	};
	if (!supportsPWA) {
		return null;
	}
	return (
		<Snackbar open={showBanner}>
			<Alert
				severity='info'
				action={
					<Grid
						container
						sx={{ m: 'auto' }}
						justifyContent='center'
						spacing={2}>
						<Button
							variant='outlined'
							color='primary'
							disableElevation
							onClick={onClick}>
							Instalar
						</Button>
						<IconButton onClick={() => setShowBanner(false)}>
							<MaterialIcon icon='close' size='small' />
						</IconButton>
					</Grid>
				}>
				<AlertTitle>Instalar</AlertTitle>
				Instalar la aplicacion usa poco espacio y provee una forma rapida de
				volver a la aplicación.
			</Alert>
		</Snackbar>
	);
};

export default InstallPWALogin;
