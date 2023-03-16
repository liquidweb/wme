import { useFirstTimeConfiguration } from '@sb/hooks';
import { TemplateSelectGroup, TemplateSelectItem } from '@moderntribe/wme-ui';
import { Box } from '@mui/material';

const templateData = [
	{
		image: 'http://localhost:8888/wp-content/uploads/2023/03/template-preview.png',
		id: '1'
	},
	{
		embed: 'https://tri.be/',
		id: '2'
	},
	{
		image: 'http://localhost:8888/wp-content/uploads/2023/03/template-preview.png',
		id: '3'
	},
	{
		embed: 'https://tri.be/',
		id: '4'
	},
	{
		image: 'http://localhost:8888/wp-content/uploads/2023/03/template-preview.png',
		id: '5'
	},
	{
		embed: 'https://tri.be/',
		id: '6'
	}
];

const StyleSelection = () => {
	const {
		ftcState: { form },
		setFormValue,
		shouldBlockNextStep
	} = useFirstTimeConfiguration();

	const handleTemplateChange = (value: string) => {
		setFormValue('template', value);
		shouldBlockNextStep(false, 4);
	};

	return (
		<Box sx={ { margin: '0px 30px' } }>
			<TemplateSelectGroup>
				{ templateData.map((template) => (
					<TemplateSelectItem
						key={ template.id }
						imageSrc={ template.image }
						imageAlt={ 'Theme preview image' }
						websiteSrc={ template.embed }
						selected={ form.template.value === template.id }
						onClick={ () => handleTemplateChange(template.id) }
					/>
				)) }
			</TemplateSelectGroup>
		</Box>
	);
};

export default StyleSelection;
