/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import root from 'react-shadow';
import { styled, Box, IconProps, Typography } from '@mui/material';
import { StyleInterface } from '../../data/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Template from './Template';

const embedWidth = 1280;
const shadowRootStyles = {
	width: embedWidth,
	transform: 'scale(0.2)',
	transformOrigin: '0 0',
	border: 0,
	overflow: 'hidden'
};

export interface TemplateSelectItemProps {
	buttonLabel?: string;
	buttonSelectedLabel?: string;
	selected: boolean;
	slug: string;
	rows_html: string;
	style: StyleInterface;
	page_styles: Record<string, string>;
	onClick: (slug: string) => void;
	defaultStyleIndex?: number;
}

const TemplateItemContainer = styled(Box)(({ theme }) => ({
	position: 'relative',
	width: '100%',
	height: 0,
	paddingBottom: '135%',
	overflow: 'hidden',
	borderRadius: 2,
	border: '1px solid #ebebeb',
	transition: 'all 0.3s ease-in-out',
	cursor: 'pointer',
	'&:hover, &:focus': {
		borderColor: theme.palette.text.primary,
		'& > .MuiBox-root': {
			transform: 'translateY(0)',
			opacity: 1,
		},
		'.is-hovered &': {
			opacity: 1,
		},
	},
	'&.is-selected': {
		borderColor: theme.palette.success.main,
		'& > .MuiBox-root': {
			transform: 'translateY(0)',
			opacity: 1,
		},
		'.is-hovered &': {
			opacity: 1,
		},
	},
	'.is-hovered &': {
		opacity: 0.5,
	},
}));

const TemplateItemButton = styled(Box)(({ theme }) => ({
	position: 'absolute',
	bottom: 0,
	left: 0,
	width: '100%',
	zIndex: 2,
	textAlign: 'center',
	fontSize: theme.typography.pxToRem(13),
	padding: '12px 0',
	backgroundColor: theme.palette.common.black,
	color: theme.palette.common.white,
	transition: 'all 0.3s ease-in-out',
	opacity: 0,
	'.is-selected &': {
		backgroundColor: theme.palette.success.main,
	},
}));

const TemplateItemCheck = styled(CheckCircleIcon)<IconProps>(({ theme }) => ({
	position: 'absolute',
	right: 20,
	top: '50%',
	transform: 'translateY(-50%)',
	fontSize: theme.typography.htmlFontSize,
}));

export default function KadenceTemplateItem(props: TemplateSelectItemProps) {
	const {
		buttonLabel = 'Start With This Template',
		buttonSelectedLabel = 'Selected',
		selected,
		rows_html,
		slug,
		style,
		onClick,
	} = props;

	const [embedScale, setEmbedScale] = useState(0.2);

	const containerRef = useRef<HTMLElement>();

	useEffect(() => {
		if (containerRef && containerRef.current) {
			setEmbedScale(containerRef.current.clientWidth / embedWidth);
		}
	}, [containerRef?.current?.clientWidth]);

	return (
		<TemplateItemContainer
			className={ selected ? 'is-selected' : '' }
			id={ slug }
			onClick={ () => onClick(slug) }
			ref={ containerRef }
		>
			{ /* @ts-ignore */ }
			<root.div style={ { ...shadowRootStyles, transform: `scale(${ embedScale })` } }>
				<Template slug={ slug } rows_html={ rows_html } theme={ style } />
			</root.div>
			<TemplateItemButton>
				<Typography color="common.white">
					{ selected ? buttonSelectedLabel : buttonLabel }
					{ selected && <TemplateItemCheck /> }
				</Typography>
			</TemplateItemButton>
		</TemplateItemContainer>
	);
}
