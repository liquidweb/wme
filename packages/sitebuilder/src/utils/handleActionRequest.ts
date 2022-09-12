export const handleActionRequest = <T extends HandleActionPayloadInterface>(payload: T) => {
	return new Promise((resolve, reject) => {
		window.wp.ajax.post(payload).done((response: any) => {
			resolve(response ? response : 'success');
		}).catch((response: JQueryXHR) => {
			if (response) {
				reject(response?.responseJSON ? response.responseJSON.data : response.responseText);
			}
			reject('error');
		});
	});
};
