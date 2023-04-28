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
		completed?: boolean;
		id: string;
		type: 'task';
		title?: string;
		intro?: string;
		icon?: React.ReactElement | string;
		taskCta?: string;
		url?: string;
		target?: '_blank' | '_self';
		wizardHash?: string;
	}

	interface SetupCardInterface {
		id: string;
		title: string;
		intro?: string;
		completed: boolean;
		navTitle: string;
		rows: (SetupCardRowInterface)[];
		footer?: SetupCardFooter;
	}

	interface SetupCardFooter {
		collapsible: boolean;
		collapsibleLabel?: string;
		rows: (SetupCardFooterRowColumns | SetupCardFooterRowLinks)[]
	}

	interface SetupCardFooterRowColumns {
		type: 'columns';
		gridColumns: number,
		columns: SetupCardFooterColumn[];
	}

	interface SetupCardFooterRowLinks {
		type: 'links';
		title: string;
		links: SetupCardLink[];
	}

	interface SetupCardFooterRowText{
		type: 'text';
		text: string;
	}

	interface SetupCardLink {
		href: string;
		label: string;
		target: string;
	}

	interface SetupCardFooterColumn {
		heading?: string;
		paragraph?: string;
		list: ListProps[];
		image: string;
	}

	interface SetupCardRowGoLIveInterface {
		completed: boolean;
		id: string;
		type: 'launch-domain-status';
	}

	interface HandleActionPayloadInterface {
		_wpnonce: string;
		action: string;
		sub_action: string;
	}

	interface HandleKadencePayloadInterface {
		action: string;
		security: string;
		wp_customize?: string;
		builder?: string;
		font?: string;
		palette?: string;
		selected?: string;
	}

	interface StepInterface {
		id: number;
		hideBack?: boolean;
		hideSkip?: boolean;
		hideNext?: boolean;
		label?: string;
		title?: string;
		description?: string;
		footerHelpText?: string;
		icon?: React.ReactNode;
		nextText?: string;
		loadingText?: string;
		backText?: string;
		screen?: React.ReactNode;
		disableNext?: boolean;
		disableAll?: boolean;
		disable?: boolean;
		hidePagination?: boolean;
		hideExit?: boolean;
		hideSidebar?: boolean;
		hideFooter?: boolean;
	}

	interface Window {
		ppcp_onboarding_productionCallback: (authCode: string, sharedId: string) => void;
		PayPal?: any;
	}
}

declare function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong';
declare function uploadImage(file: File, additionalData: { title: string, alt_text: string }): object;
declare function getDomainVerificationError(response: any): DomainVerificationInterface | boolean;
