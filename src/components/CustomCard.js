import React from 'react';
import cx from 'clsx';
import Color from 'color';
// import GoogleFontLoader from 'react-google-font-loader';
// import NoSsr from '@mui/material/NoSsr';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
// import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
// import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import PropTypes from 'prop-types';
import COLORS from '../constants/Colors.json';
import { Typography } from '@mui/material';

const useStyles = makeStyles(({ palette }) => ({
	color: ({ color }) => ({
		'&:before': {
			backgroundColor: Color(color).darken(0.3).desaturate(0.2).toString(),
		},
	}),
	root: {
		userSelect: 'none',
		cursor: 'pointer',
		position: 'relative',
		borderRadius: '1rem',
		minWidth: 320,
		'&:before': {
			display: 'none',
		},
		'&:hover': {
			// '&:before': {
			// 	bottom: -6,
			// },
			'& $logo': {
				transform: 'scale(1.1)',
				boxShadow: '0 6px 20px 0 rgba(0,0,0,0.38)',
			},
		},
	},
	cover: {
		borderRadius: '1rem',
	},
	content: ({ color }) => ({
		position: 'relative',
		zIndex: 1,
		borderRadius: '1rem',
		boxShadow: `0 6px 16px 0 ${Color(color).fade(0.5)}`,
		'&:before': {
			content: '""',
			display: 'block',
			position: 'absolute',
			left: 0,
			top: 0,
			zIndex: 0,
			width: '100%',
			height: '100%',
			clipPath:
				// 'polygon(0% 100%, 0% 35%, 0.3% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%,95% 0%,100% 0%, 100% 100%)',
				'polygon(0% 100%, 0% 35%, 0.3% 33%, 1% 31%, 1.5% 30%, 2% 29%, 2.5% 28.4%, 3% 27.9%, 3.3% 27.6%, 5% 27%,95% 0%,100% 0%, 100% 100%)',
			borderRadius: '1rem',
			background: `linear-gradient(to top, ${color}, ${Color(color)
				.rotate(24)
				.lighten(0.12)})`,
		},
	}),
	title: {
		fontSize: '1.25rem',
		color: COLORS.primary.contrastText,
		margin: 0,
	},
	logo: {
		transition: '0.3s',
		width: 100,
		height: 100,
		boxShadow: '0 4px 12px 0 rgba(0,0,0,0.24)',
		borderRadius: '1rem',
	},
	desc: {
		color: '#fff',
		backgroundColor: palette.text.hint,
		opacity: 0.72,
		fontSize: '1rem',
		borderRadius: 12,
		overflowWrap: 'break-word',
		inlineSize: '300px',
	},
}));

const CustomCard = ({ logo, title, desc }) => {
	// const mediaStyles = useCoverCardMediaStyles();
	const styles = useStyles({ color: COLORS.primary.main });
	return (
		<Box
			onClick={(e) => alert('as')}
			className={cx(styles.root, styles.color)}
			pt={4}>
			<Box className={styles.content} p={2}>
				<Box position={'relative'} zIndex={1}>
					<Grid gap={2}>
						<Grid item>
							<Avatar className={styles.logo} src={logo} />
						</Grid>
						<Grid item sx={{ pt: 3 }} position={'bottom'}>
							<Typography className={styles.title}>{title}</Typography>
						</Grid>
					</Grid>
					<Grid container pt={2} alignItems='center'>
						<Grid item position={'right'}>
							<Typography className={styles.desc}>{desc}</Typography>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Box>
	);
};

export default CustomCard;
CustomCard.propTypes = {
	styles: PropTypes.any,
	cover: PropTypes.any,
	logo: PropTypes.any,
	title: PropTypes.any,
	desc: PropTypes.any,
};
