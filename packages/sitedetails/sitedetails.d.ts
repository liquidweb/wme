/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable no-redeclare */
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

export {};

declare module '*.gif' {
	const src: string;
	export default src;
}

declare module '*.jpg' {
	const src: string;
	export default src;
}

declare module '*.jpeg' {
	const src: string;
	export default src;
}

declare module '*.png' {
	const src: string;
	export default src;
}

declare module '*.webp' {
	const src: string;
	export default src;
}

declare module '*.svg' {
	import * as React from 'react';

	export const ReactComponent: React.FunctionComponent<React.SVGProps<
		SVGSVGElement
	> & { title?: string }>;

	const src: string;
	export default src;
}

declare global {
	interface Window {
		site_details: any;
		wp: any;
		wpApiSettings: any;
	}

	interface SetupCardAccordionInterface {
		id: string;
		header: string;
		subHeader?: string;
		chipBackground?: ChipProps['color'];
		chipText?: string;
		expanded?: boolean;
	}

	interface PasswordStatusItemInterface {
		label: string;
		color: string;
	}

	type PasswordStrengthTypes = 'weak' | 'medium' | 'strong' | '';

	type PasswordStrengthColorTypes = 'success' | 'warning' | 'error' | '';
}
