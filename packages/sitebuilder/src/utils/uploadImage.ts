export function uploadImage(file: File, additionalData = { title: 'Logo', alt_text: 'Logo' }) {
	const data = new window.FormData();
	data.append('file', file, file.name || file.type.replace('/', '.'));

	Object.entries(additionalData || {}).forEach(([key, value]) => {
		data.append(key, value);
	});

	return window.wp.apiRequest({
		path: '/wp/v2/media',
		data,
		contentType: false,
		processData: false,
		method: 'POST',
	});
}
