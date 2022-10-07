import React from 'react';
import {
	SetupCardAccordion as WmeSetupCardAccordion
} from '@stellarwp/wme-ui';
import {
	Columns,
	ColumnsInterface,
	LearnShipping,
	LearnShippingInterface
} from '../layouts';

export interface AccordionInterface {
	id: string;
	type: 'accordion';
	title: string;
	rows: Array<ColumnsInterface | LearnShippingInterface>;
}

const Accordion = (props: AccordionInterface): React.ReactElement => {
	const {
		id,
		title,
		rows
	} = props;

	return (
		<WmeSetupCardAccordion
			id={ id }
			title={ title }
		>
			{
				rows?.map((row) => {
					switch (row.type) {
					case 'columns':
						return <Columns key={ row.id } { ...row } />;
					case 'learn-shipping':
						return <LearnShipping key={ row.id } { ...row } />;
					default:
						return <></>;
					}
				})
			}
		</WmeSetupCardAccordion>
	);
};

export default Accordion;
