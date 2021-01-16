import { useState, Fragment } from "@wordpress/element";
import { createBlock, getBlockDefaultClassName } from "@wordpress/blocks";
import { useDispatch, useSelect } from "@wordpress/data";
import {
	useBlockProps, // @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
	RichText,
	URLInput,
	InnerBlocks,
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	withColors,
	getColorClassName,
} from "@wordpress/block-editor";
import {
	Button,
	IconButton,
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
	PanelBody,
	RangeControl,
	ToggleControl,
	RadioControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import classNames from "classnames";

/**
 * Contain any CSS code that gets applied to the editor.
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 */
function Edit(props) {
	console.log("----->", props);
	const {
		attributes,
		setAttributes,
		clientId,
		className,
		backgroundColor,
		setBackgroundColor,
	} = props;
	const { cardsPerRow, header, footer } = attributes;
	const { enableHeader, heading, content } = header;
	const { enableFooter, footerText, callToAction } = footer;

	// REDUX
	const { replaceInnerBlocks } = useDispatch("core/block-editor");
	const { inner_blocks, blocks, block, attrs } = useSelect((select) => ({
		inner_blocks: select("core/block-editor").getBlocks(clientId),
		blocks: select("core/block-editor").getBlocksByClientId(clientId),
		block: select("core/block-editor").getBlock(clientId),
		attrs: select("core/block-editor").getBlockAttributes(clientId),
	}));
	console.log({ attrs });
	console.log({ block });
	console.log({ blocks });
	console.log({ inner_blocks });

	return (
		<Fragment>
			<section
				className={classNames(className, {
					[`${className}--3`]: cardsPerRow === 3,
					[`${className}--4`]: cardsPerRow === 4,
					[backgroundColor.class]: !!backgroundColor.class,
				})}
				style={{
					backgroundColor: backgroundColor.class
						? undefined
						: backgroundColor.color,
				}}
			>
				{/* BLOCK HEADER */}
				{enableHeader && (
					<div className={`${className}__header`}>
						{/* HEADER TITLE */}
						<RichText
							tagName="h2"
							placeholder="Header title"
							allowedFormats={[]}
							value={heading}
							onChange={(val) =>
								setAttributes({ header: { ...header, heading: val } })
							}
						/>

						{/* HEADER RICHTEXT */}
						<RichText
							tagName="div"
							placeholder="Header richtext content"
							value={content}
							onChange={(val) =>
								setAttributes({ header: { ...header, content: val } })
							}
						/>
					</div>
				)}

				{/* CARDS */}
				<InnerBlocks
					allowedBlocks={["create-block/card-gallery-card"]}
					template={[
						["create-block/card-gallery-card", {}, []],
						["create-block/card-gallery-card", {}, []],
						["create-block/card-gallery-card", {}, []],
					]}
				/>

				{/* Block Footer */}
				{enableFooter && (
					<div className={`${className}__footer`}>
						<RichText
							tagName="div"
							placeholder="Footer richtext content"
							value={footerText}
							onChange={(val) =>
								setAttributes({ footer: { ...footer, footerText: val } })
							}
						/>
						<a>
							<RichText
								tagName="span"
								placeholder="Call to action"
								value={callToAction.text}
								onChange={(val) =>
									setAttributes({
										footer: {
											...footer,
											callToAction: { ...callToAction, text: val },
										},
									})
								}
							/>
						</a>
					</div>
				)}
			</section>

			{/* SIDEBAR */}
			<InspectorControls>
				{/* BACKGROUND COLOR */}
				<PanelColorSettings
					title="Color Settings"
					colorSettings={[
						{
							value: backgroundColor.color,
							label: "Background Color",
							onChange: setBackgroundColor,
							disableCustomColors: false,
							clearable: true,
						},
					]}
				/>

				{/* HEADER SETTINGS */}
				<PanelBody title="Block Header">
					<ToggleControl
						label="Enable header?"
						checked={enableHeader}
						onChange={(val) =>
							setAttributes({ header: { ...header, enableHeader: val } })
						}
					/>
				</PanelBody>

				{/* BODY SETTINGS */}
				<PanelBody title="Block Body">
					<RangeControl
						label="Number of cards per row?"
						value={cardsPerRow}
						min={3}
						max={4}
						onChange={(val) => setAttributes({ cardsPerRow: val })}
					/>
				</PanelBody>

				{/* FOOTER SETTINGS */}
				<PanelBody title="Block Footer">
					<ToggleControl
						label="Enable footer?"
						checked={enableFooter}
						onChange={(val) =>
							setAttributes({ footer: { ...footer, enableFooter: val } })
						}
					/>

					{/* CALL TO ACTION */}
					{enableFooter && (
						<div style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
							<span style={{ marginBottom: "1rem", display: "block" }}>
								Call to action settings:
							</span>

							{/* CTA URL */}
							<URLInput
								hasBorder
								isFullWidth
								value={callToAction.url}
								onChange={(val) =>
									setAttributes({
										footer: {
											...footer,
											callToAction: { ...callToAction, url: val },
										},
									})
								}
							/>

							{/* CTA TARGET BLANK */}
							<ToggleControl
								label="Open in new tab?"
								checked={callToAction.targetBlank}
								onChange={(val) =>
									setAttributes({
										footer: {
											...footer,
											callToAction: { ...callToAction, targetBlank: val },
										},
									})
								}
							/>

							{/* CTA NO FOLLOW */}
							<ToggleControl
								label="Hide from search engines?"
								checked={callToAction.noFollow}
								onChange={(val) =>
									setAttributes({
										footer: {
											...footer,
											callToAction: { ...callToAction, noFollow: val },
										},
									})
								}
							/>

							<RadioControl
								label="Style"
								options={[
									{ label: "Filled", value: "filled" },
									{ label: "Outlined", value: "outlined" },
								]}
								selected={callToAction.style}
								onChange={(val) =>
									setAttributes({
										footer: {
											...footer,
											callToAction: { ...callToAction, style: val },
										},
									})
								}
							/>
						</div>
					)}
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}

export default withColors("backgroundColor")(Edit);
