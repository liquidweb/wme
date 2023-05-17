import { StyleInterface } from '../data/styles';

export interface CustomTemplateStylesProps {
	style: StyleInterface;
	templateSlug: string;
}

export default function CustomTemplateStyles(props: CustomTemplateStylesProps) {
	const {
		style,
		templateSlug
	} = props;

	const globalColors = `
		:host {
			--global-heading-font-family: '${ style.headingFont }', sans-serif;
			--global-body-font-family: '${ style.baseFont }', sans-serif;

			--global-palette1: ${ style.accent1 };
			--global-palette2: ${ style.accent2 };
			--global-palette3: ${ style.contrast1 };
			--global-palette4: ${ style.contrast2 };
			--global-palette5: ${ style.contrast3 };
			--global-palette6: ${ style.contrast4 };
			--global-palette7: ${ style.base1 };
			--global-palette8: ${ style.base2 };
			--global-palette9: ${ style.base3 };
			--global-content-edge-padding: 3rem;

			--global-kb-font-size-sm: clamp(0.8rem, ${ style.baseFontStyles.size } - 3px, 0.9rem);
			--global-kb-font-size-md: clamp(1.125rem, ${ style.baseFontStyles.size }, 1.5rem);
			--global-kb-font-size-lg: clamp(1.75rem,  ${ style.h4.size }, 2.5rem);
			--global-kb-font-size-xl: clamp(2.25rem, ${ style.h3.size }, 3rem);
			--global-kb-font-size-xxl: clamp(2.5rem, ${ style.h2.size }, 4rem);
			--global-kb-font-size-xxxl: clamp( 2.7rem, ${ style.h1.size }, 10rem );
		}
		.single-iframe-content.single-content {
			font-size: ${ style.baseFontStyles.size };
			line-height: ${ style.baseFontStyles.lineHeight };
			letter-spacing: ${ style.baseFontStyles.letterSpacing };
			font-weight: ${ style.baseFontStyles.fontWeight };
		}
		.single-iframe-content.single-content h1 {
			line-height: ${ style.h1.lineHeight } !important;
			letter-spacing: ${ style.h1.letterSpacing };
			text-transform: ${ style.textTransform || 'normal' };
			font-weight: ${ style.h1.fontWeight };

		}
		.single-iframe-content.single-content h2 {
			line-height: ${ style.h2.lineHeight } !important;
			letter-spacing: ${ style.h2.letterSpacing };
			text-transform: ${ style.textTransform || 'normal' };
			font-weight: ${ style.h2.fontWeight };
		}
		.single-iframe-content.single-content h3 {
			line-height: ${ style.h3.lineHeight } !important;
			letter-spacing: ${ style.h3.letterSpacing };
			text-transform: ${ style.textTransform || 'normal' };
			font-weight: ${ style.h3.fontWeight };
		}
		.single-iframe-content.single-content h4 {
			line-height: ${ style.h4.lineHeight } !important;
			letter-spacing: ${ style.h4.letterSpacing };
			text-transform: ${ style.textTransform || 'normal' };
			font-weight: ${ style.h4.fontWeight };
		}
		.single-iframe-content.single-content h5 {
			line-height: ${ style.h5.lineHeight } !important;
			letter-spacing: ${ style.h5.letterSpacing };
			text-transform: ${ style.textTransform || 'normal' };
			font-weight: ${ style.h5.fontWeight };
		}
		.single-iframe-content.single-content h6 {
			line-height: ${ style.h6.lineHeight } !important;
			letter-spacing: ${ style.h6.letterSpacing };
			text-transform: ${ style.textTransform || 'normal' };
			font-weight: ${ style.h6.fontWeight } !important;
		}
		.wp-block-kadence-advancedbtn span.button.kb-button {
			border-radius: ${ style.buttonStyles.borderRadius };
			border: ${ style.buttonStyles.border && ! style.buttonStyles.borderBottom ? `${ style.buttonStyles.border } solid ${ style.accent1 }` : 0 };
			${ style.buttonStyles.borderBottom ? `border-bottom: ${ style.buttonStyles.border } solid ${ style.accent1 }` : null };
			background-color: ${ style.buttonStyles.isOutline ? 'transparent' : style.accent1 };
			color: ${ style.buttonStyles.border ? style.accent1 : '#fff' };
			padding: ${ style.buttonStyles.padding };
			font-size: ${ style.buttonStyles.fontSize };
			text-transform: ${ style.textTransform || 'none' };
			font-weight: ${ style.buttonStyles.fontWeight || style.baseFontStyles.fontWeight };
		}
	`;

	return <style id={ `${ templateSlug }-style-tag` } type="text/css">{ globalColors }</style>;
}
