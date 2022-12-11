import {
	Box,
	Link,
	Dialog,
	DialogContent,
	Typography,
	Radio,
	FormLabel
} from '@mui/material';
import { IMAGE_DIR } from '@sb/constants';
import { RadioGroup, FormControlLabel, Button } from '@moderntribe/wme-ui';
import { useLookAndFeel } from '@sb/hooks';
import { lookAndFeelConsts } from './data/constants';

const DeleteContentWarning = (props:any) => {
	const { open } = props;
	const { lookAndFeelState: { deleteValue }, handleImport, setShowDeleteWarning, setDeleteValue } = useLookAndFeel();
	const { deleteContentWarning: {
		warningHeadline,
		message,
		deleteOption,
		keepOption,
		importOptions,
		importButton,
		nevermind,
		eyesAlt
	} } = lookAndFeelConsts;

	const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setDeleteValue(event.target.value);
	};

	const handleClose = () => {
		setShowDeleteWarning(false);
	};

	const handleSubmit = () => {
		handleImport(deleteValue);
	};

	return (
		<Dialog
			open={ open }
			fullScreen
			sx={ { zIndex: 100000, opacity: '98%' } }
		>
			<DialogContent sx={ {
				maxWidth: '425px',
				width: '100%',
				mx: 'auto',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
				overflow: 'hidden',
			} }>
				<Box
					component="img"
					sx={ { width: '44px', height: '44px' } }
					src={ `${ IMAGE_DIR }/eyes-emoji.png` }
					alt={ eyesAlt }
				/>
				<Typography variant="body1" sx={ { fontWeight: 600, pb: '8px' } }>{ warningHeadline }</Typography>
				<Typography sx={ { mb: '36px' } }>{ message }</Typography>
				<Box sx={ {
					mb: '47px',
					border: '1px solid #D3D3D3',
					p: '25px'
				} }>
					{
						<RadioGroup
							ariaLabelledby="delete-content-options"
							name="delete-content-radio-buttons-group"
							value={ deleteValue }
							onChange={ handleChange }
						>
							<FormLabel id="delete-content-options">
								{ importOptions }
							</FormLabel>
							<FormControlLabel
								value="delete"
								control={ <Radio sx={ { pb: '25px' } } /> }
								label={ deleteOption }
							/>
							<FormControlLabel
								value="keep"
								control={ <Radio /> }
								label={ keepOption }
							/>
						</RadioGroup>
					}
				</Box>
				<Button
					onClick={ handleSubmit }
					variant="contained"
					color="primary"
					disableElevation
					sx={ { mb: 1.5 } }
				>
					{ importButton }
				</Button>
				<Link
					component="button"
					variant="body2"
					onClick={ handleClose }
					underline="always"
					sx={ { color: 'primary.dark' } }
				>
					{ nevermind }
				</Link>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteContentWarning;
