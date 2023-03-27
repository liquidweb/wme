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
		site_settings: any;
		wp: any;
		wpApiSettings: any;
	}

	interface SetupCardAccordionInterface {
		id: string;
		title: string;
		intro?: string;
		completed: boolean;
		navTitle: string;
		rows: (SetupCardRowInterface | SetupCardRowGoLIveInterface)[];
		footer?: SetupCardFooter;
	}

	interface SetupCardInterface {
		id: string;
		title: string;
		intro?: string;
		completed: boolean;
		navTitle: string;
		rows: (SetupCardRowInterface | SetupCardRowGoLIveInterface)[];
		footer?: SetupCardFooter;
	}

	interface SetupCardFooter {
		collapsible: boolean;
		collapsibleLabel?: string;
		rows: (SetupCardFooterRowColumns | SetupCardFooterRowLinks | SetupCardRowGoLIveInterface)[]
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

	interface PasswordStrengthType {
		label: 'weak' | 'medium' | 'strong';
		color: 'error' | 'warning' | 'success';
	}

	type DomainVerificationTypes = 'general' | 'registration' | 'pointed' | 'success';

	interface DomainVerificationInterface {
		type: DomainVerificationTypes;
		message: string;
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

	interface DomainTld {
		id: number
		identity: string
		metadata: DomainMetadata
	}

	interface DomainMetadata {
		scope: string
		uri: string
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

	interface DomainVerificationSuccessInterface {
		domain: string;
		is_registered: boolean;
		is_pointed: boolean;
		uses_local_nameservers: boolean;
		can_setup: boolean;
		nameservers: string[];
	}

	interface DomainVerificationErrorInterface {
		code: string;
		message: string;
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

}
