import { useEffect, useRef, useState } from 'react';

export interface IframeProps {
	src: string;
}

const wpAdminBarHeight = 29;

const IframeEmbed = (props: IframeProps) => {
	const { src } = props;
	const frameRef = useRef<HTMLIFrameElement>(null);
	const [height, setHeight] = useState(400);

	const getHeight = () => {
		if (frameRef.current?.contentWindow?.document.body.clientHeight) {
			setHeight(
				frameRef.current?.contentWindow?.document.body.clientHeight +
					wpAdminBarHeight
			);
		} else {
			setHeight(200);
		}
	};

	const iframeStyles = {
		width: '100%',
		border: 0,
		overflow: 'hidden'
	};

	return (
		<iframe
			src={src}
			style={iframeStyles}
			height={`${height}px`}
			ref={frameRef}
			onLoad={getHeight}
		/>
	);
};

export default IframeEmbed;
