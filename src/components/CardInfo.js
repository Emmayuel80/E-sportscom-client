import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';

const cardExtraStyles = {
	maxWidth: 250,
	minHeight: 270,
	backgroundColor: 'white',
	mx: 5,
	my: 3,
};

const cardHeaderExtraStyles = {
	pb: 1,
};

const CardEquipos = ({ data, children }) => {
	return (
		<Card sx={cardExtraStyles}>
			<CardHeader sx={cardHeaderExtraStyles} title={data.title}></CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
};
CardEquipos.propTypes = {
	data: { title: '' },
	children: null,
};

export default CardEquipos;
