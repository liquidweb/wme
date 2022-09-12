export const generateNewPassword = async () => {
	return new Promise((resolve, reject) => {
		window.wp.ajax.post('generate-password').done((password: string) => {
			resolve(password);
		}).catch((error: any) => {
			reject(error);
		});
	});
};
