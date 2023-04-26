/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import root from 'react-shadow';
import { styled, Box, BoxProps, IconProps, Typography } from '@mui/material';
import { StyleInterface } from '../data/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import editorStyles from './KadenceEditorStyles';

const embedWidth = 1280;
const shadowRootStyles = {
	position: 'absolute',
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
	name: string;
	rows_html: string;
	style: StyleInterface;
	onClick: (slug: string) => void;
}

const TemplateItemContainer = styled(Box)<BoxProps>(({ theme }) => ({
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
		style,
	} = props;
	const [embedScale, setEmbedScale] = useState(0.2);
	const containerRef = useRef<HTMLElement>();

	const globalColors = `:host {
			--global-palette1: ${ style.accent1 };
			--global-palette2: ${ style.accent2 };
			--global-palette3: ${ style.contrast1 };
			--global-palette4: ${ style.contrast2 };
			--global-palette5: ${ style.contrast3 };
			--global-palette6: ${ style.contrast4 };
			--global-palette7: ${ style.base1 };
			--global-palette8: ${ style.base2 };
			--global-palette9: ${ style.base3 };
		}
		.has-theme-palette-1-color { color: var(--global-palette1); }
		.has-theme-palette-2-color { color: var(--global-palette2); }
		.has-theme-palette-3-color { color: var(--global-palette3); }
		.has-theme-palette-4-color { color: var(--global-palette4); }
		.has-theme-palette-5-color { color: var(--global-palette5); }
		.has-theme-palette-6-color { color: var(--global-palette6); }
		.has-theme-palette-7-color { color: var(--global-palette7); }
		.has-theme-palette-8-color { color: var(--global-palette8); }
		.has-theme-palette-9-color { color: var(--global-palette9); }
		.has-theme-palette1-color { color: var(--global-palette1); }
		.has-theme-palette2-color { color: var(--global-palette2); }
		.has-theme-palette3-color { color: var(--global-palette3); }
		.has-theme-palette4-color { color: var(--global-palette4); }
		.has-theme-palette5-color { color: var(--global-palette5); }
		.has-theme-palette6-color { color: var(--global-palette6); }
		.has-theme-palette7-color { color: var(--global-palette7); }
		.has-theme-palette8-color { color: var(--global-palette8); }
		.has-theme-palette9-color { color: var(--global-palette9); }
		.has-theme-palette1-background-color { background-color: var(--global-palette1); }
		.has-theme-palette2-background-color { background-color: var(--global-palette2); }
		.has-theme-palette3-background-color { background-color: var(--global-palette3); }
		.has-theme-palette4-background-color { background-color: var(--global-palette4); }
		.has-theme-palette5-background-color { background-color: var(--global-palette5); }
		.has-theme-palette6-background-color { background-color: var(--global-palette6); }
		.has-theme-palette7-background-color { background-color: var(--global-palette7); }
		.has-theme-palette8-background-color { background-color: var(--global-palette8); }
		.has-theme-palette9-background-color { background-color: var(--global-palette9); }
		.wp-block-kadence-advancedbtn span.button.kb-button {
			border-top-left-radius: ${ style.borderRadius };
			border-top-right-radius: ${ style.borderRadius };
			border-bottom-right-radius: ${ style.borderRadius };
			border-bottom-left-radius: ${ style.borderRadius };
		}
	`;

	useEffect(() => {
		if (containerRef && containerRef.current) {
			setEmbedScale(containerRef.current.clientWidth / embedWidth);
		}
	}, [containerRef?.current?.clientWidth]);

	return (
		<TemplateItemContainer className={ selected ? 'is-selected' : '' } id={ slug } aria-label={ name } ref={ containerRef }>
			{ /* @ts-ignore */ }
			<root.div style={ { ...shadowRootStyles, transform: `scale(${ embedScale })` } }>
				<style id={ `${ slug }-style-tag` } type="text/css">{ globalColors }</style>
				<style type="text/css">{ editorStyles }</style>
				<div dangerouslySetInnerHTML={ { __html: rows_html } } />
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
