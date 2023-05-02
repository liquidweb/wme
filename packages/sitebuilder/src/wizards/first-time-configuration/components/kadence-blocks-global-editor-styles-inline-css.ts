export default `
.pattern-shadow-wrap {
	--global-kb-font-size-sm: clamp(0.8rem, 0.719rem + 0.233vw, 0.9rem);
	--global-kb-font-size-md: clamp(1.125rem, 0.82rem + 0.872vw, 1.5rem);
	--global-kb-font-size-lg: clamp(1.75rem, 1.14rem + 1.744vw, 2.5rem);
	--global-kb-font-size-xl: clamp(2.25rem, 1.728rem + 1.63vw, 3rem);
	--global-kb-font-size-xxl: clamp(2.5rem, 1.456rem + 3.26vw, 4rem);
	--global-kb-font-size-xxxl: clamp(
		2.7rem,
		1.4833333333333336rem + 6.083333333333333vw,
		10rem
	);
}
.editor-styles-wrapper {
	--kb-global-content-width: 1202px;
}
.wp-block-kadence-rowlayout > .kb-theme-content-width {
	max-width: 1202px;
}
.pattern-shadow-wrap {
	--global-kb-spacing-xxs: 0.5rem;
	--global-kb-spacing-xs: 1rem;
	--global-kb-spacing-sm: 1.5rem;
	--global-kb-spacing-md: 2rem;
	--global-kb-spacing-lg: 3rem;
	--global-kb-spacing-xl: 4rem;
	--global-kb-spacing-xxl: 5rem;
	--global-kb-spacing-3xl: 6.5rem;
	--global-kb-spacing-4xl: 8rem;
	--global-kb-spacing-5xl: 10rem;
	--global-row-edge-sm: 15px;
	--global-row-edge-theme: var(--global-content-edge-padding);
	--global-kb-gutter-sm: 1rem;
	--global-kb-gutter-md: 2rem;
	--global-kb-gutter-lg: 3rem;
	--global-kb-gutter-xl: 5rem;
	--global-kb-editor-sidebar: 0px;
	--global-kb-editor-sidebar-secondary: 0px;
	--global-kb-editor-full-width: calc(
		100vw -
			(
				var(--global-kb-editor-sidebar) +
					var(--global-kb-editor-sidebar-secondary)
			)
	);
}
.is-sidebar-opened.interface-interface-skeleton
	.interface-interface-skeleton__content {
	--global-kb-editor-sidebar: 281px;
	--global-kb-editor-sidebar-secondary: 0px;
	--global-kb-editor-full-width: calc(
		100vw -
			(
				var(--global-kb-editor-sidebar) +
					var(--global-kb-editor-sidebar-secondary)
			)
	);
}
.interface-interface-skeleton:not(.is-sidebar-opened)
	.interface-interface-skeleton__secondary-sidebar
	~ .interface-interface-skeleton__content {
	--global-kb-editor-sidebar: 0px;
	--global-kb-editor-sidebar-secondary: 351px;
	--global-kb-editor-full-width: calc(
		100vw -
			(
				var(--global-kb-editor-sidebar) +
					var(--global-kb-editor-sidebar-secondary)
			)
	);
}
.interface-interface-skeleton.is-sidebar-opened
	.interface-interface-skeleton__secondary-sidebar
	~ .interface-interface-skeleton__content {
	--global-kb-editor-sidebar: 281px;
	--global-kb-editor-sidebar-secondary: 351px;
	--global-kb-editor-full-width: calc(
		100vw -
			(
				var(--global-kb-editor-sidebar) +
					var(--global-kb-editor-sidebar-secondary)
			)
	);
}
.pattern-shadow-wrap .post-content-style-boxed {
	--global-row-edge-theme: calc(var(--global-content-edge-padding) + 2rem);
}
.wp-block-button__link {
	color: var(--global-palette9);
	background-color: var(--global-palette2);
	box-shadow: none;
	text-decoration: none;
	padding: calc(.667em + 2px) calc(1.333em + 2px);
	font-size: 1.125em
}
.pattern-shadow-wrap {
	--global-gray-400: #CBD5E0;
	--global-gray-500: #A0AEC0;
	--global-xs-spacing: 1em;
	--global-sm-spacing: 1.5rem;
	--global-md-spacing: 2rem;
	--global-lg-spacing: 2.5em;
	--global-xl-spacing: 3.5em;
	--global-xxl-spacing: 5rem;
	--global-edge-spacing: 1.5rem;
	--global-boxed-spacing: 2rem
}
.pattern-shadow-wrap.editor-styles-wrapper h1,
.pattern-shadow-wrap.editor-styles-wrapper h2,
.pattern-shadow-wrap.editor-styles-wrapper h3,
.pattern-shadow-wrap.editor-styles-wrapper h4,
.pattern-shadow-wrap.editor-styles-wrapper h5,
.pattern-shadow-wrap.editor-styles-wrapper h6 {
	font-family: var(--global-heading-font-family);
}`;
