import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LinkOrButton = (props: SetupCardFooterMessageInterface) => {
	const {
		title,
		url
	} = props;

	const navigate = useNavigate();

	const onClick = () => {
		navigate('/wizard/look-and-feel');
	};

	return (
		<Link
			sx={ { mr: 2, verticalAlign: 'middle' } }
			variant="body2"
			underline="hover"
			component={ ! url ? 'button' : 'a' }
			href={ url ? url : undefined }
			onClick={ ! url ? onClick : undefined }
		>
			{ title }
		</Link>
	);
};

const LookAndFeelFooter = (props: SetupCardFooterInterface) => {
	const {
		messages = [],
	} = props;

	return <>
		{ messages.map((message, index) => <LinkOrButton key={ index } { ...message } />) }
	</>;
};

export default LookAndFeelFooter;
