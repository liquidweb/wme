/* eslint-disable no-console */
/* eslint-disable no-alert */
import { objToFormData } from '@moderntribe/wme-utils';
import { AJAX_URL } from '@sb/constants';
import { __ } from '@wordpress/i18n';

export const kadenceImport = async (data: HandleKadencePayloadInterface) => {
	try {
		const response = await jQuery.ajax(
			{
				method: 'POST',
				url: AJAX_URL,
				data: objToFormData(data),
				contentType: false,
				processData: false,
			});
		return response;
	} catch (err:any) {
		alert(__('Something went wrong with importing this template. Please refresh and try again.', 'moderntribe-sitebuilder'));
		console.error('Kadence API request failed with status: ' + err?.status + ' Status Text: ' + err?.statusText + ' ' + err?.responseText);
	}
};
