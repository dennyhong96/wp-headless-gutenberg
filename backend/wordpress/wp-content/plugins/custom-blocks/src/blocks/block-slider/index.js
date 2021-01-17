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

//
import Slider from "react-slick";
import { useState } from "@wordpress/element";
//

registerBlockType("create-block/block-slider", {
	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,

	title: __("Slider", "block-slider"),

	description: __("A slider module.", "block-slider"),

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

	// edit: Edit,
	edit() {
		return (
			<div>
				<h2> Single Item</h2>
				<Slider
					dots={true}
					infinite={true}
					speed={500}
					slidesToShow={1}
					slidesToScroll={1}
				>
					<div>
						<h3>1</h3>
					</div>
					<div>
						<h3>2</h3>
					</div>
					<div>
						<h3>3</h3>
					</div>
					<div>
						<h3>4</h3>
					</div>
					<div>
						<h3>5</h3>
					</div>
					<div>
						<h3>6</h3>
					</div>
				</Slider>
			</div>
		);
	},

	save,
});
