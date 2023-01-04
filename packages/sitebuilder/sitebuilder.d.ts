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
		id: string;
		type: 'task' | 'action';
		variant?: string;
		title?: string;
		intro?: string;
		icon?: React.ReactElement | string;
		taskCta?: string;
		url?: string;
		disabled?: boolean;
		disableText?: string;
		wizardHash?: string;
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

	interface SetupCardFooterInterface {
		id: string;
		title?: string;
		messages?: FooterMessageInterface[];
	}

	interface SetupCardFooterMessageInterface {
		title: string;
		url: string;
		target?: string;
		dashicon?: string;
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
		hidePagination?: boolean;
	}
	export interface Domain {
		domain: string
		is_available: boolean
		package: {
			id: number
			identity: string
			metadata: DomainMetadata
			addons: DomainAddon[]
			auto_renew: boolean
			bandwidth: number
			billing_type: string
			environment_type: string
			is_wildcard: boolean
			label: string
			name: string
			orderable_terms: DomainOrderableTerms
			term_fees: DomainTermFees
			tld: DomainTld
			trial_period: number
			type: string
		}
		pricing: any[]
		tld: DomainTld
	}
	interface DomainAddon {
		id: number
		identity: string
		metadata: DomainMetadata
		description: string
		monthly_fee: string
		name: string
		term_fees: DomainTermFees
		type: string
	}
	interface DomainTermFees {
		[key: string]: string
	}

	interface DomainOrderableTerms {
		[key: string]: string
	}

	interface DomainTld {
		id: number
		identity: string
		metadata: DomainMetadata
	}

	interface DomainMetadata {
		scope: string
		uri: string
	}

	interface Window {
		ppcp_onboarding_productionCallback: (authCode: string, sharedId: string) => void;
		PayPal?: any;
	}

	export interface GoLiveInterface {
		isLoading: boolean;
		verifyingUrl: string;
		lastStep: number;
		hasDomain: string | null;
		selectedDomains: Domain[];
		searchDomain: string;
		skipDnsVerification: boolean;
		verificationStatus: string;
		verificationErrorType: boolean | string;
		verificationMessage: string;
		showLogoutButton: boolean;
		steps: Array<StepInterface>;
	}

	export interface GoLiveProviderContextInterface {
		goLiveState: GoLiveInterface;
		setGoLiveState: React.Dispatch<React.SetStateAction<GoLiveInterface>>;
		submitGoLiveForm: () => void;
		submitDomainVerification: () => void;
		handleDomainVerificationRequest: () => void;
		setIsLoading: (loading: boolean) => void;
		setShowPurchaseNavigation: (show: boolean) => void;
	}

	export interface DomainVerificationSuccessInterface {
		domain: string;
		is_registered: boolean;
		is_pointed: boolean;
		uses_local_nameservers: boolean;
		can_setup: boolean;
		nameservers: string[];
	}

	export interface DomainVerificationErrorInterface {
		code: string;
		message: string;
	}
}

declare function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong';
declare function uploadImage(file: File, additionalData: { title: string, alt_text: string }): object;
declare function getDomainVerificationError(response: any): DomainVerificationInterface | boolean;
