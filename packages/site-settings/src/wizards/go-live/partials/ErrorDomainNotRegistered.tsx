import { Typography, Link } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ErrorStatusMessage } from '.';
import { useDomainConnect, useSiteSettings } from '@site/hooks';
import { sprintf } from '@wordpress/i18n';
import { NEXCESS_DOMAIN_SEARCH_URL } from '@site/constants';
import { GoLiveStringData } from '@go-live/data/constants';

const ErrorDomainNotRegistered = () => {
	const {
		goLiveState: { verificationMessage }
	} = useDomainConnect();

	const {
		siteSettingsState: { capturedDomain = '' }
	} = useSiteSettings();

	const {
		errorDomainNotRegistered: {
			registerDomainContent,
			registerDomainCtaPart1,
			registerDomainCtaPart2
		}
	} = GoLiveStringData;

	const capitalizedDomainName = `${ capturedDomain[ 0 ].toUpperCase() }${ capturedDomain.slice(1) }`;

	return (
		<>
			<ErrorStatusMessage message={ verificationMessage } />
			<Typography variant="body2" mb={ 3 }>{ registerDomainContent }</Typography>
			<Typography variant="body2">
				<Link
					href={ `${ NEXCESS_DOMAIN_SEARCH_URL }?domain=${ capturedDomain }` }
					target="_blank"
					underline="hover"
					sx={ { display: 'flex', alignItems: 'center' } }
				>
					{
						sprintf('%1$s %2$s %3$s',
							registerDomainCtaPart1,
							capitalizedDomainName,
							registerDomainCtaPart2
						)
					}
					<OpenInNewIcon sx={ { fontSize: '1.125rem', marginLeft: 1 } } />
				</Link>
			</Typography>
		</>
	);
};

export default ErrorDomainNotRegistered;
