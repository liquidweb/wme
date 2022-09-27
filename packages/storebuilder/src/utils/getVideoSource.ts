import { SITEBUILDER_URL, WP_101_URL, WP_101_API_KEY } from '@store/constants';

export const getVideoSource = (source: string): string => {
	const parts = source.split(':');
	const isWp101 = parts[ 0 ] === 'wp101';
	const videoId = isWp101 && parts[ 1 ];

	if (videoId) {
		return `${ WP_101_URL }${ videoId }?embed=1&apiKey=${ WP_101_API_KEY }&host=${ SITEBUILDER_URL }`;
	}

	return source;
};
