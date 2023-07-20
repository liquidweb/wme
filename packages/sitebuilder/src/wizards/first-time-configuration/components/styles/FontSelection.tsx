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
	const [font, setFontValue] = useState(form.fontPairing?.value || form.colorPalette?.value);

	useEffect(() => {
		setFormValue('fontPairing', font);
	}, [font]);

	return (

		<Box sx={ {
			display: 'grid',
			gridTemplateColumns: '1fr 1fr 1fr',
			gap: '4px',
		} }>
			{ styles?.map((theme) => (
				<Box
					key={ theme.id }
					sx={ {
						'&:hover': {
							cursor: 'pointer',
						},
						border: '2px solid',
						borderColor: font === theme.id ? 'primary.main' : 'background.dark',
						borderRadius: '4px',
						backgroundColor: 'background.dark',
						display: 'flex',
						width: '100%',
						height: '100%',
						flexDirection: 'column'
					} }
					onClick={ () => setFontValue(theme.id) }
				>
					<Box sx={ {
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: '2px',
						margin: '4px',
						color: 'text.primary',
						gap: '4px',
						height: '100%',
						backgroundColor: 'background.primary',
						padding: '4px 0'
					} }>
						<FontBlock fontFamily={ theme.headingFont } />
						<Box sx={ { height: '1px', backgroundColor: 'border.ui', width: '100%' } } />
						<FontBlock fontFamily={ theme.baseFont } />
					</Box>
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
	);
};

export default FontSelection;
