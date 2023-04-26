/**
 * #.# Editor Styles
 *
 * CSS for just Backend enqueued after style.scss
 * which makes it higher in priority.
 */

export default `
 .components-button-group.kb-button-global-styles.kt-style-btn-group {
    width: 100%;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}

.components-button-group.kb-button-global-styles.kt-style-btn-group button.components-button.kt-style-btn {
    border: 2px solid #eeeeee;
    color: #555;
    width: auto;
    text-align: center;
    justify-content: center;
    border-radius: 3px;
}
.components-button-group.kb-button-global-styles.kt-style-btn-group button.components-button.kt-style-btn:hover {
    border: 2px solid #ddd;
    color: #555;
}
.components-button-group.kb-button-global-styles.kt-style-btn-group button.components-button.kt-style-btn.is-primary {
    border: 2px solid #777;
    color: #333;
}

.kt-button-text.is-selected {
    min-width: 5px;
}
.components-base-control.block-editor-url-input.kt-btn-link-input {
    margin-bottom: 0;
}
.block-editor-rich-text__editable.kt-button-text [data-rich-text-placeholder]:after {
    display:inline-block;
}
.block-editor-rich-text__editable.kt-button-text.is-selected:focus [data-rich-text-placeholder]:after {
    display:none;
}
 .kt-block-defaults-modal h2.kt-beside-btn-group, .kt-block-defaults-modal h2.kt-beside-color-label {
    font-size: 14px;
    color: #555d66;
}
.kt-block-defaults-modal h2.kt-tab-wrap-title.kt-color-settings-title {
    text-align: center;
    background: #f2f2f2;
    margin-bottom: 0;
	font-size: 14px;
    color: #555d66;
}

.kt-button {
	padding: 0.4em 1em;
    cursor: pointer;
    transition: all .3s ease-in-out;
	border-width: 2px;
}
.kt-button.kb-btn-global-fill {
    border: 0px solid transparent;
	border-radius: 3px;
    background: var(--global-palette-btn-bg, #3633E1);
    color: var(--global-palette-btn, #FFFFFF);
}
.kt-button.kb-btn-global-fill:hover {
	color: var(--global-palette-btn-hover, #FFFFFF);
}

.kt-button.kb-btn-global-outline {
    border: 2px solid var(--global-palette-btn-bg, #3633E1);
	background:transparent;
	color: var(--global-palette-btn-bg, #3633E1);
}
.kt-button.kb-btn-global-outline:hover {
	border-color: var(--global-palette-btn-bg-hover, #2F2FFC);
	background: transparent;
	color: var(--global-palette-btn-bg-hover, #2F2FFC);
}

.kt-button::before {
    position: absolute;
	content: "";
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: -1;
	opacity: 0;
	background:transparent;
	transition: all .3s ease-in-out;
}
.kt-button.kb-btn-global-fill::before {
    background: var(--global-palette-btn-bg-hover, #2F2FFC);
}
.editor-styles-wrapper .wp-block-kadence-advancedbtn .kt-button:not(.kb-btn-global-inherit):hover {
    box-shadow: none;
}
.kt-button:hover::before {
	opacity: 1;
}
.kt-btn-width-type-fixed .kt-button {
    width: 100%;
}
.editor-styles-wrapper .wp-block-kadence-advancedbtn .kt-button.kt-btn-size-small{
    font-size: 0.9rem;
}
.editor-styles-wrapper .wp-block-kadence-advancedbtn .kt-button.kt-btn-size-large {
    font-size: 1.35rem;
}
.editor-styles-wrapper .wp-block-kadence-advancedbtn .kt-button.kt-btn-size-xlarge {
    font-size: 1.65rem;
}
.kt-button.kb-btn-global-outline.kt-btn-size-xlarge {
    border-width: 4px;
}
.kt-button.kb-btn-global-outline.kt-btn-size-large {
    border-width: 3px;
}
.kt-button.kb-btn-global-outline.kt-btn-size-small {
    border-width: 1px;
}

.wp-block[data-type="kadence/advancedbtn"], .wp-block[data-type="kadence/singlebtn"] {
    margin-top: 0;
    margin-bottom: 0;
}
.wp-block-kadence-advancedbtn .kb-btns-outer-wrap {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
}
.wp-block-kadence-advancedbtn .kb-btns-outer-wrap .wp-block-kadence-singlebtn {
	display: inline-flex;
	margin-left: 0;
	margin-right: 0;
}
.wp-block-kadence-advancedbtn .kb-btns-outer-wrap .wp-block-kadence-singlebtn.kt-btn-width-type-full {
	flex: 1 0 fit-content;
	width: 100%;
}
.wp-block-kadence-advancedbtn .kb-btns-outer-wrap .wp-block-kadence-singlebtn.kt-btn-width-type-full .kt-button {
	width: 100%;
}

.wp-block-kadence-advancedbtn .kt-btn-align-center {
    justify-content: center;
}
.wp-block-kadence-advancedbtn .kt-btn-align-left {
    justify-content: flex-start;
}
.wp-block-kadence-advancedbtn .kt-btn-align-right {
    justify-content: flex-end;
}
.wp-block-kadence-advancedbtn .kt-btn-align-space-between {
    justify-content: space-between;
}
.wp-block-kadence-advancedbtn .kt-btn-align-center.kb-direction-columns {
    align-items: center;
}
.wp-block-kadence-advancedbtn .kt-btn-align-left.kb-direction-columns {
    align-items: flex-start;
}
.wp-block-kadence-advancedbtn .kt-btn-align-right.kb-direction-columns {
    align-items: flex-end;
}
.wp-block-kadence-advancedbtn .kt-btn-align-space-between.kb-direction-columns {
    align-items: center;
}
.wp-block-kadence-advancedbtn .kt-btn-valign-center {
    align-items: center;
}
.wp-block-kadence-advancedbtn .kt-btn-valign-top {
   align-items: flex-start;
}
.wp-block-kadence-advancedbtn .kt-btn-valign-bottom {
   align-items: flex-end;
}
.wp-block-kadence-advancedbtn .kt-btn-valign-center.kb-direction-columns {
    justify-content: center;
}
.wp-block-kadence-advancedbtn .kt-btn-valign-top.kb-direction-columns {
    justify-content: flex-start;
}
.wp-block-kadence-advancedbtn .kt-btn-valign-bottom.kb-direction-columns {
    justify-content: flex-end;
}
.btn-inner-wrap {
    display: flex;
    width: 100%;
}

.kb-btn-has-icon {
    gap: 0.5em;
}
.kb-btn-only-icon .kt-button-text {
    display:none;
}
`;
