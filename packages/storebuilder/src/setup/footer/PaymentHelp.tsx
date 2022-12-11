import { Typography } from '@mui/material';
import { VideoLink } from '@store/components';

export interface PaymentHelpMessageInterface {
	title: string;
	url: string;
	target?: string;
	dashicon?: string;
}

export interface PaymentHelpInterface {
	id: string;
	type: 'gateway-help';
	title?: string;
	messages: PaymentHelpMessageInterface[];
}

const PaymentHelp = (props: PaymentHelpInterface) => {
	const {
		title,
		messages
	} = props;

	return (
		<>
			{ title && <Typography
				component="span"
				variant="body2"
				sx={ {
					fontWeight: 600,
				} }
			>{ title }</Typography> }
			{
				messages && messages.map((message, index) => (
					<VideoLink
						key={ index }
						title={ message.title }
						url={ message.url }
						target={ message.target ? message.target : '_self' }
						sx={ { ml: 2, cursor: 'pointer' } }
					/>
				))
			}
		</>
	);
};

export default PaymentHelp;
