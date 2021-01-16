/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType("create-block/feature-cards", {
	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,

	/**
	 * This is the display title for your block, which can be translated with `i18n` functions.
	 * The block inserter will show this name.
	 */
	title: __("Feature Cards", "feature-cards"),

	/**
	 * This is a short description for your block, can be translated with `i18n` functions.
	 * It will be shown in the Block Tab in the Settings Sidebar.
	 */
	description: __(
		"Example block written with ESNext standard and JSX support – build step required.",
		"feature-cards"
	),

	/**
	 * Blocks are grouped into categories to help users browse and discover them.
	 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
	 */
	category: "theme-blocks",

	/**
	 * An icon property should be specified to make it easier to identify a block.
	 * These can be any of WordPress’ Dashicons, or a custom svg element.
	 */
	icon: "smiley",

	/**
	 * Optional block extended support features.
	 */
	supports: {
		// Removes support for an HTML mode.
		html: false,
	},

	// Make block wider
	getEditWrapperProps(props) {
		return { ...props, "data-align": "wide" };
	},

	attributes: {
		cards: {
			type: "array",
			default: [
				{
					subheading: "WEBINAR",
					heading: "How to build B2B SaaS landing pages that actually convert",
					paragraph:
						"Well crafted landing pages pay dividends. They’re often made out to be an enigma but don’t need to be complicated.",
					linkUrl: "https://google.com",
					linkText: "Download",
					openInNewTab: true,
					nofollow: false,
				},
				{
					subheading: "WEBINAR",
					heading: "How to build B2B SaaS landing pages that actually convert",
					paragraph:
						"Well crafted landing pages pay dividends. They’re often made out to be an enigma but don’t need to be complicated.",
					linkUrl: "https://google.com",
					linkText: "Download",
					openInNewTab: true,
					nofollow: false,
				},
				{
					subheading: "WEBINAR",
					heading: "How to build B2B SaaS landing pages that actually convert",
					paragraph:
						"Well crafted landing pages pay dividends. They’re often made out to be an enigma but don’t need to be complicated.",
					linkUrl: "https://google.com",
					linkText: "Download",
					openInNewTab: true,
					nofollow: false,
				},
			],
		},

		// source: "query",
		// selector: "section",
		// query: {
		//     subheading: {
		//         type: "string",
		//         source: "text",
		//         selector: "span",
		//         default: "WEBINAR",
		//     },
		//     subheading: {
		//         type: "string",
		//         source: "text",
		//         selector: "span",
		//         default: "WEBINAR",
		//     },
		//     heading: {
		//         type: "string",
		//         source: "text",
		//         selector: "h3",
		//         default: "How to build B2B SaaS landing pages that actually convert",
		//     },
		//     paragraph: {
		//         type: "string",
		//         source: "text",
		//         selector: "p",
		//         default:
		//             "Well crafted landing pages pay dividends. They’re often made out to be an enigma but don’t need to be complicated.",
		//     },
		//     linkUrl: {
		//         type: "string",
		//         selector: "a",
		//         source: "attribute",
		//         attribute: "href",
		//         default: "https://google.com",
		//     },
		//     linkText: {
		//         type: "string",
		//         selector: "a",
		//         source: "text",
		//         default: "Download",
		//     },
		//     openInNewTab: {
		//         type: "boolean",
		//         default: true,
		//     },
		//     nofollow: {
		//         type: "boolean",
		//         default: false,
		//     },
		// },
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
});
