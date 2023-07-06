import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import getTemplateStyles from '@ftc/data/styles';
import { useFirstTimeConfiguration } from '@sb/hooks';

const FontSelection = () => {
	const {
		ftcState: { form },
		setFormValue,
	} = useFirstTimeConfiguration();
	const styles = getTemplateStyles();
	const [font, setFontValue] = useState(form.fontPairing.value);

	useEffect(() => {
		setFormValue('fontPairing', font);
	}, [font]);

	return (

		<Box sx={ {
			display: 'grid',
			gridTemplateColumns: '1fr 1fr 1fr',
			gap: '10px',
		} }>
			{ styles?.map((theme) => (
				<Box
					key={ theme.id }
					sx={ {
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						'&:hover': {
							cursor: 'pointer',
						},
						gap: '4px',
						border: '2px solid',
						borderColor: font === theme.id ? 'success.main' : 'background.disabled',
						borderRadius: '4px',
						backgroundColor: 'background.primary',
						color: 'text.primary',
						padding: '4px 0px'
					} }
					onClick={ () => setFontValue(theme.id) }
				>
					<FontBlock fontFamily={ theme.headingFont } />
					<Box sx={ { height: '1px', backgroundColor: 'border.ui', width: '100%' } } />
					<FontBlock fontFamily={ theme.baseFont } />
				</Box>
			)) }
		</Box>
	);
};

const FontBlock = ({ fontFamily } : { fontFamily: string }) => {
	return (
		<Box sx={ {
			fontSize: '24px',
			lineHeight: '27px',
			textTransform: 'capitalize',
			fontWeight: 400,
			fontFamily
		} } id={ fontFamily }>
			Aa
		</Box>
	)
}

export default FontSelection;
