/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import { styled, Box, BoxProps, IconProps, Typography } from '@mui/material';
import { StyleInterface } from '../data/styles';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const embedWidth = 1280;

export interface TemplateSelectItemProps {
	buttonLabel?: string;
	buttonSelectedLabel?: string;
	selected: boolean;
	slug: string;
	name: string;
	rows_html: string;
	style: StyleInterface;
}

const TemplateItemContainer = styled(Box)<BoxProps>(({ theme }) => ({
	position: 'relative',
	width: '100%',
	height: 0,
	paddingBottom: '135%',
	overflow: 'hidden',
	borderRadius: 2,
	border: '1px solid #f4f4f4',
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

const TemplateItemEmbed = styled('div')(() => ({
	position: 'absolute',
	width: embedWidth,
	// height: 2000,
	transform: 'scale(0.2)',
	transformOrigin: '0 0',
	border: 0,
	overflow: 'hidden',
}));

const TemplateItemButton = styled(Box)<BoxProps>(({ theme }) => ({
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
		buttonLabel = 'Start With This Style',
		buttonSelectedLabel = 'Selected',
		selected,
		rows_html,
		slug,
		name,
		// style,
	} = props;
	const [embedScale, setEmbedScale] = useState(0.2);
	const containerRef = useRef<HTMLElement>();

	// const globalColors = `
	// 	--global-palette1:${ style.base1 };
	// 	--global-palette2:${ style.base2 };
	// 	--global-palette3:${ style.base3 };
	// 	--global-palette4:${ style.accent1 };
	// 	--global-palette5:${ style.accent2 };
	// 	--global-palette6:${ style.contrast1 };
	// 	--global-palette7:${ style.contrast2 };
	// 	--global-palette8:${ style.contrast3 };
	// 	--global-palette9:${ style.contrast4 };
	// `;

	useEffect(() => {
		if (containerRef && containerRef.current) {
			setEmbedScale(containerRef.current.clientWidth / embedWidth);
		}
	}, [containerRef?.current?.clientWidth]);

	return (
		<TemplateItemContainer className={ selected ? 'is-selected' : '' } id={ slug } aria-label={ name } ref={ containerRef }>
			<TemplateItemEmbed
				style={ { transform: `scale(${ embedScale })` } }
				dangerouslySetInnerHTML={ { __html: rows_html } }
			/>
			<TemplateItemButton>
				<Typography color="common.white">
					{ selected ? buttonSelectedLabel : buttonLabel }
					{ selected && <TemplateItemCheck /> }
				</Typography>
			</TemplateItemButton>
		</TemplateItemContainer>
	);
}
