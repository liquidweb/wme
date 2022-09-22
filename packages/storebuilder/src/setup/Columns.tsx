import React, { useState, FC } from 'react';
import {
	SetupCardList,
	SetupCardListItem,
	VideoEmbed,
	Wizard,
	WizardHeader,
	Logo,
	ExitButton
} from '@stellarwp/wme-ui';
import { Grid, Typography } from '@mui/material';
import * as Icons from '@mui/icons-material';
import WizardContent from '@store/wizards/WizardContent';
import { SiteBuilderLogo } from '@store/logos';

export interface ColumnLinkInterface {
	title: string;
	url: string;
	target?: string;
	icon?: string;
}

export interface ColumnInterface {
	title?: string;
	links: ColumnLinkInterface[];
}

export interface ColumnsInterface {
	id: string;
	type: 'columns';
	title?: string;
	intro?: string;
	columns: ColumnInterface[];
}

const ColumnLink: FC<ColumnLinkInterface> = (props) => {
	const {
		title,
		url,
		target,
		icon
	} = props;

	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const urlParts = url.split(':');
	const isVideo = urlParts[ 0 ].indexOf('wp101') === 0;
	const videoId = isVideo && urlParts[ 1 ];

	const IconComponent = icon && Icons[ icon as keyof typeof Icons ] ? Icons[ icon as keyof typeof Icons ] : null;

	const handleOnClick = (e: React.SyntheticEvent, id: string) => {
		setModalOpen(true);
	};

	return (
		<>
			<SetupCardListItem
				title={ title }
				href={ url && ! videoId ? url : undefined }
				icon={ IconComponent ? <IconComponent /> : null }
				linkProps={ {
					target: target ? target : '_self',
					onClick: (e) => videoId ? handleOnClick(e, videoId) : null
				} }
			/>
			{
				videoId && (
					<Wizard
						open={ modalOpen }
						sx={ {
							zIndex: 99999,
							'& .WmeWizard-dialogContent': {
								paddingBottom: (theme) => theme.spacing(4),
							},
						} }
					>
						<WizardHeader>
							<>
								<Logo
									width="100"
									logoSrc={ <SiteBuilderLogo /> }
								/>
								<ExitButton onClick={ () => setModalOpen(false) }>
									<span>Temp Exit Text</span>
								</ExitButton>
							</>
						</WizardHeader>
						<WizardContent>
							<VideoEmbed src="https://www.youtube.com/embed/YwjYtoE5UMQ" />
						</WizardContent>
					</Wizard>
				)
			}
		</>
	);
};

const Column: FC<ColumnInterface> = (props) => {
	const {
		title,
		links = []
	} = props;

	return (
		<Grid item xs={ 12 } sm={ 6 } md={ 4 }>
			{ title && <Typography variant="h4" component="h3" mb={ 2 }>{ title }</Typography> }
			<SetupCardList sx={ {
				'& li a': {
					fontSize: '14px'
				},
				'.WmeSetupCardListItem-wmeIconWrapper svg': {
					color: 'primary.light'
				}
			} }>
				{ links && links.map((link, index) => <ColumnLink key={ index } { ...link } /> ) }
			</SetupCardList>
		</Grid>
	);
}

const Columns: FC<ColumnsInterface> = (props) => {
	const {
		title = '',
		intro = '',
		columns = [],
	} = props;

	return (
		<Grid container columnSpacing={ 6 } rowSpacing={ 4 }>
			{
				(title || intro) && (
					<Grid item xs={ 12 }>
						{ title && <Typography variant="h4" mb={ 1 }>{ title }</Typography> }
						{ intro && <Typography variant="body2">{ intro }</Typography> }
					</Grid>
				)
			}
			{
				columns && columns.map((column, index) => <Column key={ index } { ...column } /> )
			}
		</Grid>
	);
};

export default Columns;
