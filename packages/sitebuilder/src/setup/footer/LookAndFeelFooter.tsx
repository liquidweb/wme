import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface FooterMessageInterface {
	title: string;
	url: string;
	target?: string;
	dashicon?: string;
}
export interface LookAndFeelFooterInterface {
	id: string;
	title?: string;
	messages?: FooterMessageInterface[];
}

const LinkOrButton = (props: FooterMessageInterface) => {
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

const LookAndFeelFooter = (props: LookAndFeelFooterInterface) => {
	const {
		messages = [],
	} = props;

	return <>
		{ messages.map((message, index) => <LinkOrButton key={ index } { ...message } />) }
	</>;
};

export default LookAndFeelFooter;
