/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable no-redeclare */
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

export {};

declare module '@stellarwp/wme-ui';

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
    sitebuilder: any;
    wp: any;
    wpApiSettings: any;
  }

  interface SiteBuilderAjaxObject {
    action: string;
    nonce: string;
    url: string;
  }

	interface SetupCardRowInterface {
		id: string;
		type: string;
		variant?: string;
		title?: string;
		intro?: string;
		icon?: React.ReactElement | string;
		taskCta?: string;
		url?: string;
		disabled?: boolean;
		disableText?: string;
	}

	interface SetupCardInterface {
		id: string;
		title: string;
		intro?: string;
		completed: boolean;
		time?: string;
		rows: SetupCardRowInterface[];
		footers?: any;
	}

	interface HandleActionPayloadInterface {
		_wpnonce: string;
		action: string;
		sub_action: string;
	}
}

declare function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong';
declare function uploadImage(file: File, additionalData: { title: string, alt_text: string }): object;
declare function createInput(name: string, value: string, form: HTMLFormElement | null): HTMLInputElement;
