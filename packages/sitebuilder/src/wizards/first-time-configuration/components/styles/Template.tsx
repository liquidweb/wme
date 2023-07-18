/* eslint-disable camelcase */
import globalEditorInlineStyles from '../../data/kadence-blocks-global-editor-styles-inline-css';
import { StyleInterface } from '../../data/styles';
import CustomTemplateStyles from './CustomTemplateStyles';
import { KADENCE_DYNAMIC_STYLES } from '@sb/constants';

export interface TemplateProps {
	slug: string;
	theme: StyleInterface;
	fontPairing?: StyleInterface;
	rows_html: any;
}

export default function Template({ slug, theme, fontPairing, rows_html }: TemplateProps) {
	const dynamicStyles = KADENCE_DYNAMIC_STYLES.replace(/:root/g, ':host');

	return (
		<>
			<link rel="stylesheet" id="kadence-blocks-iframe-base" href="https://patterns.startertemplatecloud.com/wp-content/plugins/kadence-blocks/includes/assets/css/live-preview-base.min.css?ver=3.0.34.3" media="all"></link>
			<style type="text/css">{ dynamicStyles }</style>
			<style id="global-editor-inline-styles">{ globalEditorInlineStyles }</style>
			<CustomTemplateStyles theme={ theme } fontPairing={ fontPairing } templateSlug={ slug } />

			<div className="pattern-shadow-wrap editor-styles-wrapper">
				<div style={ { position: 'absolute', width: '100%', height: '100%', zIndex: 10, backgroundColor: 'transparent' } }></div>
				<div className="single-iframe-content single-content" dangerouslySetInnerHTML={ { __html: rows_html } } />
			</div>
		</>
	)
}
