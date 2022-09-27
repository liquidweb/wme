import React, { FC } from 'react';
import { SetupCardList } from '@stellarwp/wme-ui';
import { ColumnLink, ColumnLinkInterface } from '@store/components';

export interface ColumnLinkListInterface {
	title?: string;
	links: ColumnLinkInterface[];
}

const ColumnLinkList: FC<ColumnLinkListInterface> = (props) => {
	const {
		links = []
	} = props;

	return (
		<SetupCardList sx={ {
			'& li': {
				marginBottom: '8px',
			},
			'& li a': {
				fontSize: '14px',
				lineHeight: '1.714',
				'&:hover': {
					color: 'text.link',
					cursor: 'pointer'
				}
			},
			'.WmeSetupCardListItem-wmeIconWrapper': {
				marginTop: '5px',
				alignSelf: 'flex-start'
			},
			'.WmeSetupCardListItem-wmeIconWrapper svg': {
				color: 'primary.light'
			}
		} }>
			{ links && links.map((link, index) => <ColumnLink key={ index } { ...link } />) }
		</SetupCardList>
	);
};

export default ColumnLinkList;
