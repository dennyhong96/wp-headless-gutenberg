import {
	TextControl,
	IconButton,
	Button,
	ToggleControl,
	ToolbarGroup,
	ToolbarButton,
	Toolbar,
	PanelBody,
} from "@wordpress/components";
import { Fragment, useState } from "@wordpress/element";
import { keyboardReturn } from "@wordpress/icons";

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
	URLPopover,
	URLInput,
} from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./styles/editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const { attributes, setAttributes, className, isSelected } = props;
	const { cards } = attributes;
	const [isVisible, setIsVisible] = useState(
		Array.from({ length: cards.length }, () => false)
	);

	const handleChange = (attr, currIdx) => (val) =>
		setAttributes({
			cards: cards.map((card, idx) =>
				idx === currIdx ? { ...card, [attr]: val } : card
			),
		});

	return (
		<section
			className={className}
			style={{
				border: "1px solid #ddd",
				padding: "1rem",
			}}
		>
			<h3 style={{ marginBottom: "1rem" }}>Feature Cards Block</h3>
			{cards.map(
				(
					{
						subheading,
						heading,
						paragraph,
						linkUrl,
						linkText,
						openInNewTab,
						nofollow,
					},
					idx
				) => (
					<div
						key={idx}
						style={{
							marginBottom: "2rem",
							border: "1px solid #ddd",
							padding: "1rem",
						}}
					>
						<RichText
							label={__("Subheading", "feature-cards")}
							tagName="span"
							value={subheading}
							onChange={handleChange("subheading", idx)}
							formattingControls={[]}
						/>

						<RichText
							label={__("Heading", "feature-cards")}
							tagName="h3"
							value={heading}
							onChange={handleChange("heading", idx)}
							formattingControls={[]}
						/>

						<RichText
							label={__("Paragraph", "feature-cards")}
							tagName="p"
							value={paragraph}
							onChange={handleChange("paragraph", idx)}
							formattingControls={[]}
						/>
						<RichText
							label={__("Link text", "feature-cards")}
							tagName="a"
							value={linkText}
							onChange={handleChange("linkText", idx)}
							formattingControls={[]}
						/>

						<br />
						{/* TOOLBAR */}
						{isSelected && (
							<Toolbar>
								<ToolbarGroup>
									<ToolbarButton
										icon="admin-links"
										onClick={() =>
											setIsVisible((prev) =>
												prev.map((entry, i) => (i === idx ? true : entry))
											)
										}
									/>

									{linkUrl && (
										<ToolbarButton
											icon="trash"
											onClick={setAttributes.bind(this, {
												cards: cards.map((card, i) =>
													i === idx
														? {
																...card,
																linkUrl: "",
																openInNewTab: true,
																nofollow: false,
														  }
														: card
												),
											})}
										/>
									)}
								</ToolbarGroup>

								{isVisible[idx] && (
									<URLPopover
										onClose={() =>
											setIsVisible((prev) =>
												prev.map((entry, i) => (i === idx ? false : entry))
											)
										}
										renderSettings={() => (
											<Fragment>
												<ToggleControl
													label={__("Open in new tab")}
													checked={openInNewTab}
													onChange={handleChange("openInNewTab", idx)}
												/>
												<ToggleControl
													label={__("Hide from search engine?")}
													checked={nofollow}
													onChange={handleChange("nofollow", idx)}
												/>
											</Fragment>
										)}
									>
										<form
											onSubmit={() =>
												setIsVisible((prev) =>
													prev.map((entry, i) => (i === idx ? false : entry))
												)
											}
										>
											<URLInput
												value={linkUrl}
												onChange={handleChange("linkUrl", idx)}
											/>

											<Button
												icon={keyboardReturn}
												label={__("Apply")}
												type="submit"
											/>
										</form>
									</URLPopover>
								)}
							</Toolbar>
						)}

						{/* DELETE CARD BUTTON */}
						{isSelected && (
							<Button
								icon="trash"
								onClick={setAttributes.bind(this, {
									cards: cards.filter((_, i) => i !== idx),
								})}
							>
								Delete this card
							</Button>
						)}
					</div>
				)
			)}

			{/* ADD NEW CARD BUTTON */}
			{isSelected && (
				<Button
					icon="plus"
					onClick={setAttributes.bind(this, {
						cards: [
							...cards,
							{
								subheading: "WEBINAR",
								heading:
									"How to build B2B SaaS landing pages that actually convert",
								paragraph:
									"Well crafted landing pages pay dividends. They’re often made out to be an enigma but don’t need to be complicated.",
								linkUrl: "https://google.com",
								linkText: "Download",
								openInNewTab: true,
								nofollow: false,
							},
						],
					})}
				>
					Add a card
				</Button>
			)}
		</section>
	);
}
