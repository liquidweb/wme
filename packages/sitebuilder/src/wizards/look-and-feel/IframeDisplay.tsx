import React, { useEffect, useRef } from 'react';
import { useLookAndFeel, useWizard } from '@sb/hooks';

const IframeDisplay = () => {
	const { lookAndFeelState } = useLookAndFeel();
	const { activeTemplate: { url }, font, updateIframe, color } = lookAndFeelState;
	const { wizardState: { activeDevice } } = useWizard();
	const starterTemplateId = 'kadence-starter-preview';
	const starterTemplateTitle = 'kadence-template-preview';
	const refIframe = useRef<HTMLIFrameElement>(null);

	const deviceWidths: { [key: string]: string } = {
		desktop: '100%',
		tablet: '768px',
		mobile: '480px',
	};

	useEffect(() => {
		if (refIframe) {
			refIframe.current?.contentWindow?.postMessage({ font }, '*');
			refIframe.current?.contentWindow?.postMessage({ color }, '*');
		}
	}, [url, font, color]);

	// Use timeout when selecting theme or clicking next to make sure Iframe updates after render.
	useEffect(() => {
		if (refIframe) {
			setTimeout(() => {
				refIframe.current?.contentWindow?.postMessage({ font }, '*');
				refIframe.current?.contentWindow?.postMessage({ color }, '*');
			}, 500);
		}
	}, [updateIframe]);

	return (
		<iframe
			id={ starterTemplateId }
			title={ starterTemplateTitle }
			src={ url }
			style={ {
				display: 'block',
				width: deviceWidths[ activeDevice ],
				height: '100%',
				margin: '0 auto',
				borderRadius: '4px',
			} }
			ref={ refIframe }
		>
		</iframe>
	);
};

export default IframeDisplay;
