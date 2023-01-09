/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable no-redeclare */
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

import { ColumnLinkInterface, ColumnLinkListInterface } from '@store/components';

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
    sitebuilder_store_details: any;
    wp: any;
    wpApiSettings: any;
		ppcp_onboarding_productionCallback: (authCode: string, sharedId: string) => void;
		PayPal?: any;
  }

  interface StoreBuilderAjaxObject {
    action: string;
    nonce: string;
    url: string;
  }

  interface SetupCardInterface {
		id: string;
		title: string;
		intro?: string;
		completed: boolean;
		chipText?: string;
		rows: (SetupCardRowInterface | SetupRowColumnsInterface | SetupRowButtonInterface | SetupRowLearnProductsInterface)[];
		footer?: SetupCardFooter;
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
		wizardHash?: string;
        button?: SetupRowTaskButtonInterface;
	}

	interface SetupRowColumnsInterface extends SetupCardRowInterface {
		type: 'columns';
		columns: ColumnLinkListInterface[];
	}

	interface SetupRowButtonInterface extends SetupCardRowInterface {
		type: 'button';
		wizardHash: string;
		title: string;
	}

	interface SetupRowLearnProductsInterface extends SetupCardRowInterface {
		type: 'learn-product-types';
		exampleProducts?: {
			title?: string;
			products: ColumnLinkInterface[];
		};
		videoData: {
			placeholderImage: string;
			ariaLabel: string;
			src: string;
			description: string;
		};
		overline: string;
		headline: string;
		wp101?: {
			header: string;
			links: {
				title: string;
				modalTitle: string;
				url: string;
			}[];
		}
	}

	interface SetupRowTaskButtonInterface {
		label: string;
		href?: string;
		backgroundColor?: string;
	}

	interface SetupCardFooter {
		collapsible: boolean;
		collapsibleLabel?: string;
		rows: (SetupCardFooterRowColumns | SetupCardFooterRowLinks | SetupCardFooterRowColumns | SetupCardRowLearnProductsInterface)[]
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

	interface SetupCardFooterColumn {
		heading?: string;
		paragraph?: string;
		list: ListProps[];
		image: string;
	}

	interface HandleActionPayloadInterface {
		_wpnonce: string;
		action: string;
		sub_action: string;
	}

	type DomainVerificationTypes = 'general' | 'registration' | 'pointed' | 'success';

	interface DomainVerificationInterface {
		type: DomainVerificationTypes;
		message: string;
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
		nextText?: string;
		loadingText?: string;
		backText?: string;
		screen?: React.ReactNode;
		disableNext?: boolean;
		disableAll?: boolean;
		disable?: boolean;
		completed?: boolean;
		hidePagination?: boolean;
	}
}
