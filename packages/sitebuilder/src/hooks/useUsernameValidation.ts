import { useState } from 'react';
import { useFirstTimeConfiguration } from './useFirstTimeConfiguration';
import { handleActionRequest } from '@sb/utils';
import { FtcStringData } from '@sb/wizards/first-time-configuration/data/constants';

const { usernameValidation } = FtcStringData;

export function useUsernameValidation() {
	const [response, setResponse] = useState<{usernamePermitted: boolean, usernameMessage: string}>({
		usernamePermitted: true,
		usernameMessage: '',
	});
	const [validationError, setValidationError] = useState<boolean>(false);
	const { ftcState, setIsLoading } = useFirstTimeConfiguration();

	const validateUsername = (username: string) => {
		setIsLoading(true);

		const data = {
			_wpnonce: ftcState?.ajax?.nonce ? ftcState.ajax.nonce : '',
			action: ftcState?.ajax?.action ? ftcState.ajax.action : '',
			sub_action: 'validateUsername',
			username,
		};

		handleActionRequest(data).then(() => {
			setResponse({
				usernamePermitted: true,
				usernameMessage: '',
			});
			setValidationError(false);
			setIsLoading(false);
		}).catch((error) => {
			if (error === '0') {
				setValidationError(true);
				setIsLoading(false);
				setResponse({
					usernamePermitted: false,
					usernameMessage: usernameValidation.errorMessage
				});

				return;
			}

			setResponse({
				usernamePermitted: false,
				usernameMessage: error,
			});
			setValidationError(false);
			setIsLoading(false);
		});
	};

	const { usernamePermitted, usernameMessage } = response;

	return {
		validateUsername,
		usernamePermitted,
		usernameMessage,
		validationError
	};
}
