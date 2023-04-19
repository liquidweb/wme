import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export interface IframeProps {
	src: string;
	id: string;
	width?: string;
}

const wpAdminBarHeight = 46;

const iframeStyles = {
	border: 0,
	overflow: 'hidden',
	transition: '.2s width ease-in-out',
	margin: 'auto'
};

const IframeEmbed = (props: IframeProps) => {
	const { src, id, width } = props;
	const frameRef = useRef<HTMLIFrameElement>(null);
	const [height, setHeight] = useState(0);

	const getHeight = () => {
		if (frameRef.current?.contentWindow?.document.body.clientHeight) {
			setHeight(
				frameRef.current?.contentWindow?.document.body.scrollHeight +
					wpAdminBarHeight
			);
		}
	};

	useEffect(() => {
		if (frameRef.current && frameRef.current.contentWindow) {
			setTimeout(() => {
				getHeight();
			}, 200);
		}
	}, [frameRef, width]);

	return (
		<Box
			sx={ {
				backgroundColor: '#ededed',
				transition: '.2s opacity',
				opacity: height > 0 ? 1 : 0,
				borderRadius: '4px',
				overflow: 'hidden',
				display: 'flex'
			} }
		>
			<iframe
				id={ id }
				title={ id }
				src={ src }
				style={ iframeStyles }
				height={ `${ height }px` }
				width={ width ? width : '100%' }
				ref={ frameRef }
				onLoad={ getHeight }
			/>
		</Box>
	);
};

export default IframeEmbed;
