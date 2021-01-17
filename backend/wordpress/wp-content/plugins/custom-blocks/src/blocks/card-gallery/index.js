/**
 * Registers a new block provided a unique name and an object defining its behavior.
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Retrieves the translation of text.
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./styles/style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import "./innerBlocks/child";

registerBlockType("create-block/card-gallery", {
	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,

	title: __("Card Gallery", "card-gallery"),

	description: __(
		"Cards with image / video in 3 column or 4 column layout.",
		"card-gallery"
	),

	category: "theme-blocks",

	icon: "smiley",

	supports: {
		// Removes support for an HTML mode.
		html: false,
	},

	attributes: {
		// BACKGROUND COLOR
		backgroundColor: { type: "string" },
		customBackgroundColor: { type: "string" },

		// BLOCK HEADER
		header: {
			type: "object",
			default: {
				enableHeader: true,
				heading: "",
				content: "",
			},
		},

		// BLOCK BODY
		cardsPerRow: {
			type: "number",
			default: 3,
		},

		// BLOCK FOOTER
		footer: {
			type: "object",
			default: {
				enableFooter: true,
				footerText: "",
				callToAction: {
					text: "",
					url: "",
					targetBlank: true,
					noFollow: false,
					style: "filled",
				},
			},
		},
	},

	// RESTRICT TO WIDE ALIGNMENT
	getEditWrapperProps(props) {
		return { ...props, "data-align": "wide" };
	},

	edit: Edit,

	save,
});
