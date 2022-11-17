import React from 'react';
import { __ } from '@wordpress/i18n';
import { lookAndFeelConsts } from './constants';

import {
	TemplateSelection,
	FontSelection,
	ColorSelection,
	Preview,
	Import,
	Complete
} from '../screens';
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
		name: LOOK_AND_FEEL_PROPS?.template?.name || '',
		url: LOOK_AND_FEEL_PROPS?.template?.url || '',
		slug: LOOK_AND_FEEL_PROPS?.template?.slug || '',
	},
	font: '',
	color: '',
	activeTemplate: LOOK_AND_FEEL_PROPS?.template?.slug || '', // activeTemplate refers to previously selected template, not what is saved in state.
	updateIframe: false,
	isImporting: false,
	importingError: false,
	importDone: false,
	lastStep: 6,
	showDeleteWarning: false,
	deleteValue: '',
	steps: [
		{
			id: 0,
			label: lookAndFeelConsts.templateSelection.label,
			hideSkip: true,
			nextText: __('Next', 'moderntribe-sitebuilder'),
			hideBack: true,
			screen: <TemplateSelection />
		},
		{
			id: 1,
			label: __('Fonts', 'moderntribe-sitebuilder'),
			nextText: __('Next', 'moderntribe-sitebuilder'),
			screen: <FontSelection />
		},
		{
			id: 2,
			label: __('Colors', 'moderntribe-sitebuilder'),
			nextText: __('Next', 'moderntribe-sitebuilder'),
			screen: <ColorSelection />
		},
		{
			id: 3,
			nextText: __('Save & Continue', 'moderntribe-sitebuilder'),
			hidePagination: true,
			hideSkip: true,
			screen: <Preview />
		},
		{
			id: 4,
			nextText: __('Saving…', 'moderntribe-sitebuilder'),
			hidePagination: true,
			hideSkip: true,
			disableNext: true,
			screen: <Import />
		},
		{
			id: 5,
			nextText: __('Exit To Setup', 'moderntribe-sitebuilder'),
			hidePagination: true,
			hideSkip: true,
			screen: <Complete />
		}
	],
});

export default LookAndFeelScreenData;
