import { SetupCardTaskCta } from '@moderntribe/wme-ui';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';

const LaunchShippingWizard: React.FC<SetupRowButtonInterface> = (props) => {
	const navigate = useNavigate();
	const { wizardHash, title } = props;

	const handleOnClick = () => {
		navigate(wizardHash);
	};

	return <SetupCardTaskCta
		sx={ { marginTop: 3 } }
		fullWidth={ true }
		startIcon={ <AddCircleOutlineIcon /> }
		onClick={ handleOnClick }
	>{ title }</SetupCardTaskCta>;
};

export default LaunchShippingWizard;
