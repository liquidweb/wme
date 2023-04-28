import { handleActionRequest } from '@moderntribe/wme-utils';
import { useEffect, useState } from 'react';
import { WIZARDS } from '@sb/constants';

export function useKadencePages() {
	const [data, setData] = useState<any>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<any>();
	const ajax = WIZARDS.look_and_feel?.ajax;

	useEffect(() => {
		const request = {
			_wpnonce: ajax?.nonce ? ajax.nonce : '',
			action: ajax.action,
			sub_action: 'kadence_cloud_section_data',
		};
		handleActionRequest(request)
			.then(setData)
			.catch(setError)
			.finally(() => setLoading(false));
	}, []);
	return {
		loading,
		error,
		data
	};
}
