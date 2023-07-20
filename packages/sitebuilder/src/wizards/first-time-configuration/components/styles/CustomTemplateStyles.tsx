import { StyleInterface } from '../../data/styles';

export interface CustomTemplateStylesProps {
	theme: StyleInterface;
	fontPairing?: StyleInterface;
	templateSlug: string;
}

export default function CustomTemplateStyles(props: CustomTemplateStylesProps) {
	const {
		theme,
		fontPairing,
		templateSlug
	} = props;

	const fonts = fontPairing || theme;

	const globalColors = `
		:host {
			--global-heading-font-family: '${ fonts.headingFont }', sans-serif;
			--global-body-font-family: '${ fonts.baseFont }', sans-serif;

			--global-palette1: ${ theme.accent1 };
			--global-palette2: ${ theme.accent2 };
			--global-palette3: ${ theme.contrast1 };
			--global-palette4: ${ theme.contrast2 };
			--global-palette5: ${ theme.contrast3 };
			--global-palette6: ${ theme.contrast4 };
			--global-palette7: ${ theme.base1 };
			--global-palette8: ${ theme.base2 };
			--global-palette9: ${ theme.base3 };
			--global-content-edge-padding: 3rem;

			--global-kb-font-size-sm: clamp(0.8rem, ${ fonts.baseFontStyles.size } - 3px, 0.9rem);
			--global-kb-font-size-md: clamp(1.125rem, ${ fonts.baseFontStyles.size }, 1.5rem);
			--global-kb-font-size-lg: clamp(1.75rem,  ${ fonts.h4.size }, 2.5rem);
			--global-kb-font-size-xl: clamp(2.25rem, ${ fonts.h3.size }, 3rem);
			--global-kb-font-size-xxl: clamp(2.5rem, ${ fonts.h2.size }, 4rem);
			--global-kb-font-size-xxxl: clamp( 2.7rem, ${ fonts.h1.size }, 10rem );
		}
		.single-iframe-content.single-content {
			font-size: ${ fonts.baseFontStyles.size };
			line-height: ${ fonts.baseFontStyles.lineHeight };
			letter-spacing: ${ fonts.baseFontStyles.letterSpacing };
			font-weight: ${ fonts.baseFontStyles.fontWeight };
		}
		.single-iframe-content.single-content h1 {
			line-height: ${ fonts.h1.lineHeight } !important;
			letter-spacing: ${ fonts.h1.letterSpacing };
			text-transform: ${ fonts.textTransform || 'normal' };
			font-weight: ${ fonts.h1.fontWeight };

		}
		.single-iframe-content.single-content h2 {
			line-height: ${ fonts.h2.lineHeight } !important;
			letter-spacing: ${ fonts.h2.letterSpacing };
			text-transform: ${ fonts.textTransform || 'normal' };
			font-weight: ${ fonts.h2.fontWeight };
		}
		.single-iframe-content.single-content h3 {
			line-height: ${ fonts.h3.lineHeight } !important;
			letter-spacing: ${ fonts.h3.letterSpacing };
			text-transform: ${ fonts.textTransform || 'normal' };
			font-weight: ${ fonts.h3.fontWeight };
		}
		.single-iframe-content.single-content h4 {
			line-height: ${ fonts.h4.lineHeight } !important;
			letter-spacing: ${ fonts.h4.letterSpacing };
			text-transform: ${ fonts.textTransform || 'normal' };
			font-weight: ${ fonts.h4.fontWeight };
		}
		.single-iframe-content.single-content h5 {
			line-height: ${ fonts.h5.lineHeight } !important;
			letter-spacing: ${ fonts.h5.letterSpacing };
			text-transform: ${ fonts.textTransform || 'normal' };
			font-weight: ${ fonts.h5.fontWeight };
		}
		.single-iframe-content.single-content h6 {
			line-height: ${ fonts.h6.lineHeight } !important;
			letter-spacing: ${ fonts.h6.letterSpacing };
			text-transform: ${ fonts.textTransform || 'normal' };
			font-weight: ${ fonts.h6.fontWeight } !important;
		}
		.wp-block-kadence-advancedbtn span.button.kb-button {
			border-radius: ${ theme.buttonStyles.borderRadius };
			border: ${ theme.buttonStyles.border && ! theme.buttonStyles.borderBottom ? `${ theme.buttonStyles.border } solid ${ theme.accent1 }` : 0 };
			${ theme.buttonStyles.borderBottom ? `border-bottom: ${ theme.buttonStyles.border } solid ${ theme.accent1 }` : null };
			background-color: ${ theme.buttonStyles.isOutline ? 'transparent' : theme.accent1 };
			color: ${ theme.buttonStyles.border ? theme.accent1 : '#fff' };
			padding: ${ theme.buttonStyles.padding };
			font-size: ${ theme.buttonStyles.fontSize };
			text-transform: ${ fonts.textTransform || 'none' };
			font-weight: ${ theme.buttonStyles.fontWeight || fonts.baseFontStyles.fontWeight };
		}
	`;

	return <style id={ `${ templateSlug }-style-tag` } type="text/css">{ globalColors }</style>;
}
