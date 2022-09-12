import React from 'react';
import { __ } from '@wordpress/i18n';
import { lookAndFeelConsts } from './constants';

import { TemplateSelection, FontSelection, ColorSelection, Preview, Import } from '../screens';

export interface LookAndFeelStep {
  id: number;
  hideBack?: boolean;
  hideSkip?: boolean;
  hideNext?: boolean;
  label?: string;
  nextText?: string;
  hidePagination?: boolean;
  screen?: React.ReactNode;
  disableNext?: boolean;
  disableAll?: boolean;
  disable?: boolean;
}

export interface LookAndFeelInterface {
    isLoading: boolean;
    values: object;
    steps: Array<LookAndFeelStep>;
	activeTemplate: {
		name: string,
		url: string,
		slug: string;
	},
	font: string;
	color: string;
	updateIframe: boolean;
	isImporting: boolean;
	importingError: boolean;
	importDone: boolean;
}

const LookAndFeelScreenData = (): LookAndFeelInterface => ({
	isLoading: false,
	values: {
		isFirstTimeConfiguration: true,
	},
	activeTemplate: {
		name: '',
		url: '',
		slug: '',
	},
	font: '',
	color: '',
	updateIframe: false,
	isImporting: false,
	importingError: false,
	importDone: false,
	steps: [
		{
			id: 0,
			label: lookAndFeelConsts.templateSelection.label,
			hideSkip: true,
			nextText: __('Next', 'nexcess-mapps'),
			hideBack: true,
			screen: <TemplateSelection />,
		},
		{
			id: 1,
			label: __('Fonts', 'nexcess-mapps'),
			nextText: __('Next', 'nexcess-mapps'),
			screen: <FontSelection />,
		},
		{
			id: 2,
			label: __('Colors', 'nexcess-mapps'),
			nextText: __('Next', 'nexcess-mapps'),
			screen: <ColorSelection />,
		},
		{
			id: 3,
			nextText: __('Save & Continue', 'nexcess-mapps'),
			hidePagination: true,
			hideSkip: true,
			screen: <Preview />,
		},
		{
			id: 4,
			label: __('Import', 'nexcess-mapps'),
			hideSkip: true,
			hidePagination: true,
			nextText: __('Save & Continue', 'nexcess-mapps'),
			screen: <Import />
		},
	],
});

export default LookAndFeelScreenData;
