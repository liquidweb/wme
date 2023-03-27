import { useState, Fragment } from 'react';
import { Box, Divider, IconButton, InputAdornment, List, ThemeProvider, createTheme } from '@mui/material';
import { ListItemCheckout, TextInput, WizardSectionTitle } from '@moderntribe/wme-ui';
import { Search } from '@mui/icons-material';
import { IMAGE_DIR } from '@sb/constants';
import { useFindDomain } from '@sb/hooks';
import { GoLiveStringData } from '@sb/wizards/go-live/data/constants';
//import { parseDomainListItem } from '@sb/utils/parseDomainListItem';

import {
	ErrorStatusMessage
} from '@go-live/partials';

const loadingSx = {
	'@keyframes fadeIn': {
		from: {
			opacity: 0.25,
		}
	},
	'@keyframes rotate': {
		from: {
			transform: 'rotate(0deg)',
		},
		to: {
			transform: 'rotate(359deg)',
		},
	},
	animation: 'rotate 1s infinite linear',
};

const FindDomain = () => {
	const { findDomain: {
		title,
		description,
		defaultError
	} } = GoLiveStringData;

	const { search, setSearch, data: domains = [], selectedDomains, toggleSelectedDomain, isFetching, isError, error } = useFindDomain();
	const [internalSearch, setInternalSearch] = useState(search);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setSearch(internalSearch);
	};

	return (
		<Box sx={ { maxWidth: 425 } }>
			<WizardSectionTitle
				heading={ title }
				headingVariant="h2"
				copy={ description }
				copyVariant="body2"
				iconSrc={ `${ IMAGE_DIR }nexcess-logo.png` }
				sx={ {
					marginBottom: 4,

					'& .WmeWizardSectionTitle-iconContainer img': {
						width: '114px',
						height: '30px',
					}
				} }
			/>
			<Box
				component="form"
				onSubmit={ handleSubmit }
			>

				<TextInput
					placeholder="Select"
					disabled={ isFetching }
					sx={ {
						width: '100%',
					} }
					endAdornment={
						<InputAdornment position="end">
							{ isFetching ? (
								<Box component="img" src={ `${ IMAGE_DIR }loading-icon.svg` } sx={ loadingSx } />
							) : (
								<IconButton type="submit" sx={ { position: 'absolute', right: '-12px', padding: '6px' } }>
									<Search />
								</IconButton>
							) }
						</InputAdornment>
					}
					value={ internalSearch }
					onChange={ (event) => setInternalSearch(event.target.value) }
				/>
			</Box>

			<ThemeProvider
				theme={ (theme: any) =>
					createTheme({
						...theme,
						palette: {
							...theme.palette,
							primary: {
								...theme.palette.primary,
								dark: '#0033B8',
							},
						},
					})
				}
			>

				<List sx={ {
					paddingTop: '16px',
					opacity: isFetching ? 0.5 : 1,
					position: 'relative',
				} }>
					{ domains.map((domain, index) => {
						const selected = selectedDomains.some((_) => _.domain === domain.domain);
						const domainListItem = {};
						return (
							<Fragment key={ domain.domain }>
								<ListItemCheckout { ...domainListItem } disableGutters onClick={ () => toggleSelectedDomain(domain) } />
								{ index < domains.length - 1 && (
									<Box sx={ { paddingTop: '8px', paddingBottom: '8px' } }>
										<Divider />
									</Box>
								) }
							</Fragment>
						);
					}) }
					{
						isFetching && (
							<Box sx={ {
								position: 'absolute',
								inset: 0,
								zIndex: 10
							} }
							/>
						)
					}
				</List>
			</ThemeProvider>
			{ isError && <ErrorStatusMessage message={ error[ 0 ]?.message || defaultError } /> }
		</Box>
	);
};

export default FindDomain;
