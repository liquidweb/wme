
// import { useEffect, useState } from '@wordpress/element';
// TODO: replace with data from server
import { templatesVar } from '../wizards/look-and-feel/data/templates';

export function useLookAndFeelTemplates() {
	// const [templateData, setTemplateData] = useState([]);

	// const handleError = (err:string) => {
	// 	// eslint-disable-next-line no-alert
	// 	window.alert(err);
	// 	throw new Error(err);
	// };

	// TODO: update to use actual API for getting templates
	// useEffect(() => {
	// 	ajaxTemplateData(
	// 		LOOK_AND_FEEL_PROPS.ajaxUrl,
	// 		handleError
	// 	).then((data) => {
	// 		setTemplateData(Object.values(JSON.parse(data)).filter(((template) => template.ecommerce)));
	// 	});
	// }, []);

	return templatesVar;
}
