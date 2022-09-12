import React from 'react';
import { __ } from '@wordpress/i18n';
import { Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { SetupData } from '../data/constants';

export interface LookAndFeelFooterInterface {
	id: string;
	title?: string;
	message?: string;
}

const { lookAndFeelFooter } = SetupData;

const LookAndFeelFooter = (props: LookAndFeelFooterInterface) => {
	const {
		title,
		message,
	} = props;

	const navigate = useNavigate();

	return (
		<>
			{ title && <Typography
				component="span"
				variant="body2"
				sx={ {
					mr: 2,
					fontWeight: 600,
				} }
			>{ title }</Typography> }
			{ message && <Typography
				component="span"
				variant="body2"
				sx={ {
					mr: 2,
				} }
			>{ message }</Typography> }
			<Link
				component="button"
				variant="body2"
				onClick={ () => navigate('/wizard/look-and-feel') }
			>{ lookAndFeelFooter.change }</Link>
		</>
	);
};

export default LookAndFeelFooter;
