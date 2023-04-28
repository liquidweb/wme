/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import root from 'react-shadow';
import { styled, Box, BoxProps, IconProps, Typography } from '@mui/material';
import { StyleInterface } from '../data/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import globalEditorInlineStyles from './kadence-blocks-global-editor-styles-inline-css';
import { KADENCE_DYNAMIC_STYLES } from '@sb/constants';

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
		onClick
	} = props;
	const [embedScale, setEmbedScale] = useState(0.2);
	const containerRef = useRef<HTMLElement>();
	const dynamicStyles = KADENCE_DYNAMIC_STYLES.replace(/:root/g, ':host');

	const headingFontName = style.headingFont.replace(/ /g, '+');
	const baseFontName = style.baseFont.replace(/ /g, '+');
	const fontStyles = `//fonts.googleapis.com/css2?family=${ headingFontName }&family=${ baseFontName }&display=swap`;

	const globalColors = `
		:host {
			--global-heading-font-family: '${ style.headingFont }', cursive;
			--global-body-font-family: '${ style.baseFont }', cursive;

			--global-palette1: ${ style.accent1 };
			--global-palette2: ${ style.accent2 };
			--global-palette3: ${ style.contrast1 };
			--global-palette4: ${ style.contrast2 };
			--global-palette5: ${ style.contrast3 };
			--global-palette6: ${ style.contrast4 };
			--global-palette7: ${ style.base1 };
			--global-palette8: ${ style.base2 };
			--global-palette9: ${ style.base3 };
			--global-content-edge-padding: 3rem;
		}
		.wp-block-kadence-advancedbtn span.button.kb-button {
			border-top-left-radius: ${ style.borderRadius };
			border-top-right-radius: ${ style.borderRadius };
			border-bottom-right-radius: ${ style.borderRadius };
			border-bottom-left-radius: ${ style.borderRadius };
			border: 0;
		}
	`;

	useEffect(() => {
		if (containerRef && containerRef.current) {
			setEmbedScale(containerRef.current.clientWidth / embedWidth);
		}
	}, [containerRef?.current?.clientWidth]);

	return (
		<TemplateItemContainer className={ selected ? 'is-selected' : '' } id={ slug } aria-label={ name } ref={ containerRef } onClick={ () => onClick(slug) }>
			<link href={ fontStyles } rel="stylesheet" type="text/css"></link>
			{ /* @ts-ignore */ }
			<root.div style={ { ...shadowRootStyles, transform: `scale(${ embedScale })` } }>
				<link rel="stylesheet" id="kadence-blocks-iframe-base" href="https://patterns.startertemplatecloud.com/wp-content/plugins/kadence-blocks/includes/assets/css/live-preview-base.min.css?ver=3.0.34.3" media="all"></link>
				<style type="text/css">{ dynamicStyles }</style>
				<style id="global-editor-inline-styles">{ globalEditorInlineStyles }</style>
				<style id={ `${ slug }-style-tag` } type="text/css">{ globalColors }</style>

				<div className="pattern-shadow-wrap editor-styles-wrapper">
					<div className="single-iframe-content single-content" dangerouslySetInnerHTML={ { __html: rows_html } } />
				</div>
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
