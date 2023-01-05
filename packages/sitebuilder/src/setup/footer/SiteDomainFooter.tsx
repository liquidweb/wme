import { Link, Typography } from '@mui/material';

const LinkOrButton = (props: SetupCardFooterMessageInterface) => {
	const {
		title,
		url,
		target,
	} = props;

	return (
		<Link
			sx={ { mr: 2, verticalAlign: 'middle' } }
			variant="body2"
			underline="hover"
			component={ ! url ? 'button' : 'a' }
			href={ url ? url : undefined }
			target={ target ? target : undefined }
		>
			{ title }
		</Link>
	);
};

const SiteDomainFooter = (props: SetupCardFooterInterface) => {
	const {
		title,
		messages = [],
	} = props;

	return (
		<>
			{ title && <Typography
				component="span"
				variant="body2"
				sx={ {
					fontWeight: 600,
					mr: 2,
				} }
			>{ title }</Typography> }
			{ messages.map((message, index) => <LinkOrButton key={ index } { ...message } />) }
		</>
	);
};

export default SiteDomainFooter;
