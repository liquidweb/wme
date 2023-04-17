import { useEffect, useState } from 'react';
import { StyleInterface } from '../data/styles';
// import './KadenceTemplate.scss';

export interface KadenceBlockInterface {
	attrs: { uniqueID: string };
	blockName: string;
	innerBlocks: InnerBlocksType;
	innerContent: InnerContentType;
	innerHTML: string;
}
export type InnerBlocksType = KadenceBlockInterface[];
export type InnerContentType = (string | null)[];

export interface KadenceTemplatePreviewProps {
	slug: string;
	name: string;
	rows: KadenceBlockInterface[];
	style: StyleInterface;
}

const KadenceTemplatePreview = (props: KadenceTemplatePreviewProps) => {
	const { slug, rows, name, style } = props;
	const [domString, setDomString] = useState('');

	useEffect(() => {
		const parseBlockContent = (
			content: InnerContentType,
			blocks: InnerBlocksType
		): string[] => {
			let currentBlock = 0;
			const temp = content.map((item) => {
				if (item === null) {
					const subBlocks = parseBlockContent(
						blocks[ currentBlock ].innerContent,
						blocks[ currentBlock ].innerBlocks
					);
					currentBlock++;
					return subBlocks;
				}

				return item;
			});
			return temp.flat();
		};

		const domArray = parseBlockContent(
			rows[ 0 ].innerContent,
			rows[ 0 ].innerBlocks
		);
		setDomString(domArray.join(''));
	}, []);

	const getCustomStyles = () => {
		const darkStyles = `.kb-pattern-preview-dark {
			--global-palette1:${ style.accent1 };
			--global-palette2:${ style.accent2 };
			--global-palette3:${ style.contrast1 };
			--global-palette4:${ style.contrast2 };
			--global-palette5:${ style.contrast3 };
			--global-palette6:${ style.contrast4 };
			--global-palette7:${ style.base1 };
			--global-palette8:${ style.base2 };
			--global-palette9:${ style.base3 };
		}
		.kb-pattern-preview-dark .kb-btns-outer-wrap {--global-palette9:${ style.base3 }} .kb-pattern-preview-dark .kb-btn-custom-colors .kb-btns-outer-wrap {--global-palette9:${ style.contrast1 }} .kb-pattern-preview-dark img[src^="https://patterns.startertemplatecloud.com/wp-content/uploads/2023/02/Logo-ploaceholder"] {filter: invert(1);} .kb-pattern-preview-dark .wp-block-kadence-tabs.kb-pattern-active-tab-highlight .kt-tabs-title-list li.kt-tab-title-active .kt-tab-title{ color:${ style.base3 } !important} .kb-pattern-preview-dark .kb-pattern-light-color{--global-palette9:${ style.base3 }}`;
		const highlightStyles = `.kb-pattern-preview-highlight {
			--global-palette1:${ style.base1 };
			--global-palette2:${ style.base2 };
			--global-palette3:${ style.base1 };
			--global-palette4:${ style.contrast4 };
			--global-palette5:${ style.contrast3 };
			--global-palette6:${ style.contrast2 };
			--global-palette7:${ style.contrast1 };
			--global-palette8:${ style.accent2 };
			--global-palette9:${ style.accent1 };
		}
		.kb-pattern-preview-highlight .kb-submit-field .kb-forms-submit, .kb-pattern-preview-highlight .kb-btns-outer-wrap .wp-block-button__link {color:${ style.base3 };background:${ style.contrast1 };}.kb-pattern-preview-highlight .kb-btn-custom-colors .kb-btns-outer-wrap {--global-palette9:${ kadence_blocks_params.global_colors[ '--global-palette1' ] }} .kb-pattern-preview-highlight img[src^="https://patterns.startertemplatecloud.com/wp-content/uploads/2023/02/Logo-ploaceholder"] {filter: invert(1);}}`;

		const normalizeStyles = '--global-content-edge-padding: 3rem;padding:0px !important;';
		return [
			{
				css: `body { ${ normalizeStyles } }.kb-pattern-preview-dark, .kb-pattern-preview-light, .kb-pattern-preview-highlight {margin-bottom: -1px;}.kb-pattern-delete-block {display: none;}.block-editor-block-list__layout.is-root-container>.wp-block[data-align=full] {margin-left: 0 !important;margin-right: 0 !important;}${ darkStyles }${ highlightStyles }`
			}
		];
	};

	if (! domString) {
		return <div />;
	}

	return (
		<div
			id={ slug }
			dangerouslySetInnerHTML={ { __html: domString } }
			aria-label={ name }
		/>
	);
};
export default KadenceTemplatePreview;
