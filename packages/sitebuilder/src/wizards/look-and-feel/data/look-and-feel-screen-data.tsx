import React from 'react';
import { __ } from '@wordpress/i18n';
import { lookAndFeelConsts } from './constants';

import { TemplateSelection, FontSelection, ColorSelection, Preview } from '../screens';
import { LOOK_AND_FEEL_PROPS } from '@sb/constants';

export interface LookAndFeelInterface {
    isLoading: boolean;
    values: object;
    steps: Array<StepInterface>;
	template: {
		name: string,
		url: string,
		slug: string;
	},
	font: string;
	color: string;
	activeTemplate: string;
	updateIframe: boolean;
	isImporting: boolean;
	importingError: boolean;
	importDone: boolean;
	lastStep: number;
	showDeleteWarning: boolean;
	deleteValue: string;
}

const LookAndFeelScreenData = (): LookAndFeelInterface => ({
	isLoading: false,
	values: {
		isFirstTimeConfiguration: true,
	},
	template: {
		name: '',
		url: '',
		slug: '',
	},
	font: '',
	color: '',
	activeTemplate: LOOK_AND_FEEL_PROPS?.template?.slug || '', // activeTemplate refers to previously selected template, not what is saved in state.
	updateIframe: false,
	isImporting: false,
	importingError: false,
	importDone: false,
	lastStep: 4,
	showDeleteWarning: false,
	deleteValue: '',
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
		}
	],
});

export default LookAndFeelScreenData;
