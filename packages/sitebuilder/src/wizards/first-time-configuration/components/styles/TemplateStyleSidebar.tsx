import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import ColorSelection from './ColorSelection';
import FontSelection from './FontSelection';

const TemplateStyleSidebar = () => {
	const [value, setValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		// Setting minHeight to make the sidebar component stop shrinking and growing based on the tab contents
		<Box sx={ { width: '100%', minHeight: '416px' } }>
			<Tabs value={ value }
				onChange={ handleChange }
				variant="fullWidth"
				sx={ {
					'.MuiTab-root': {
						color: '#fff',
						fontWeight: '400',
						textTransform: 'capitalize',
						borderBottom: '1px solid',
						borderColor: 'border.ui',
						'&.Mui-selected': {
							color: '#fff'
						},
					},
					'.MuiTabs-indicator': {
						height: '3px'
					}
				} }
			>
				<Tab label="Colors" />
				<Tab label="Fonts" />
			</Tabs>
			<TabPanel value={ value } index={ 0 }>
				<ColorSelection />
			</TabPanel>
			<TabPanel value={ value } index={ 1 }>
				<FontSelection />
			</TabPanel>
		</Box>
	);
};

function TabPanel({ value, index, children }: { value: number, index: number, children: React.ReactNode }) {
	return (
		<div
			role="tabpanel"
			hidden={ value !== index }
			id={ `simple-tabpanel-${ index }` }
			aria-labelledby={ `simple-tab-${ index }` }
		>
			{ value === index && (
				<Box sx={ { pt: 3 } }>
					{ children }
				</Box>
			) }
		</div>
	);
}

export default TemplateStyleSidebar;
