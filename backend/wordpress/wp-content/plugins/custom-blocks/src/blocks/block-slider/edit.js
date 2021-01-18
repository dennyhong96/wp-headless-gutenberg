import { useState, Fragment } from "@wordpress/element";
import { createBlock, getBlockDefaultClassName } from "@wordpress/blocks";
import { useDispatch, useSelect } from "@wordpress/data";
import {
	useBlockProps, // @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
	RichText,
	URLInput,
	URLPopover,
	InnerBlocks,
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	withColors,
	getColorClassName,
	MediaUpload,
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
import Slider from "react-slick";

/**
 * Contain any CSS code that gets applied to the editor.
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./styles/editor.scss";
import SlideEditor from "./components/SlideEditor";

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
	const { slides, enableSliderHeader, header, footer } = attributes;
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
	// console.log({ attrs });
	// console.log({ block });
	// console.log({ blocks });
	// console.log({ inner_blocks });

	const [isUrlPopupOpen, setIsUrlPopupOpen] = useState(slides.map(() => false));
	const [editingIdx, setEditingIdx] = useState(null);

	const handleAddSlide = () => {
		setAttributes({
			slides: [
				...slides,
				{
					header: { logo: {}, link: { url: "" } },
					children: [{ title: "", text: "" }],
				},
			],
		});
	};

	const handleDeleteSlide = (idx) => () => {
		setAttributes({
			slides: slides.filter((_, i) => i !== idx),
		});
	};

	const handleSelectImage = (img) => {
		setAttributes({
			slides: slides.map((slide, i) =>
				i === editingIdx
					? {
							...slide,
							header: {
								...slide.header,
								logo: {
									url: img.url,
									alt: img.alt,
								},
							},
					  }
					: slide
			),
		});
	};

	const handleDeleteImage = () => {
		setAttributes({
			slides: slides.map((slide, i) =>
				i === editingIdx
					? {
							...slide,
							header: {
								...slide.header,
								logo: {
									url: "",
									alt: "",
								},
							},
					  }
					: slide
			),
		});
	};

	const setLink = (attr) => (val) => {
		setAttributes({
			slides: slides.map((slide, i) =>
				i === editingIdx
					? {
							...slide,
							header: {
								...slide.header,
								link: {
									...slide.header.link,
									[attr]: val,
								},
							},
					  }
					: slide
			),
		});
	};

	const setCard = (cardIdx, attr) => (val) => {
		setAttributes({
			slides: slides.map((slide, i) =>
				i === editingIdx
					? {
							...slide,
							children: slide.children.map((child, childIdx) =>
								childIdx === cardIdx ? { ...child, [attr]: val } : child
							),
					  }
					: slide
			),
		});
	};

	const handleAddCard = () => {
		setAttributes({
			slides: slides.map((slide, i) =>
				i === editingIdx
					? {
							...slide,
							children: [...slide.children, { title: "", text: "" }],
					  }
					: slide
			),
		});
	};

	const handleRemoveCard = (cardIdx) => () => {
		setAttributes({
			slides: slides.map((slide, i) =>
				i === editingIdx
					? {
							...slide,
							children: slide.children.filter(
								(_, childIdx) => childIdx !== cardIdx
							),
					  }
					: slide
			),
		});
	};

	return (
		<Fragment>
			<section
				className={classNames(className, {
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

				<IconButton
					icon="plus"
					label="Add a slide at the end"
					onClick={handleAddSlide}
					style={{ display: "block", margin: "0 auto" }}
				/>

				{/* SLIDER ***************************************************************************************** */}
				<div className={`${className}__body`}>
					<Slider
						beforeChange={(_, next) =>
							(editingIdx || editingIdx === 0) && setEditingIdx(next)
						}
						dots={true}
						infinite={true}
						speed={500}
						slidesToShow={1}
						slidesToScroll={1}
						nextArrow={<IconButton isSecondary icon="arrow-right-alt" />}
						prevArrow={<IconButton isSecondary icon="arrow-left-alt" />}
					>
						{slides.map((slide, idx) => {
							const {
								header: { logo, link },
								children,
							} = slide;

							return (
								<div key={idx}>
									{/* EDIT / DELETE BUTTON */}

									<div style={{ margin: "0.25rem", display: "flex" }}>
										<Button
											style={{ marginRight: "1rem" }}
											icon="edit"
											onClick={
												editingIdx || editingIdx === 0
													? setEditingIdx.bind(this, null)
													: setEditingIdx.bind(this, idx)
											}
										>
											Edit slide
										</Button>

										{!(editingIdx || editingIdx === 0) && (
											<Button
												isDestructive
												icon="trash"
												onClick={handleDeleteSlide(idx)}
											>
												Delete slide
											</Button>
										)}
									</div>

									{/* HEADER */}
									{enableSliderHeader && (
										<div
											style={{
												display: "flex",
												alignItems: "center",
												border: "1px solid #ddd",
												padding: "1rem",
												marginBottom: "1rem",
											}}
										>
											{/* CARD MEDIA PREVIEW */}
											{logo.url ? (
												<img
													src={logo.url}
													alt={logo.alt}
													width={100}
													height="auto"
												/>
											) : (
												<div
													style={{
														width: 100,
														height: 75,
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
														border: "1px solid #ddd",
													}}
												>
													<small>Slide Logo</small>
												</div>
											)}

											{/* Link */}
											<a style={{ marginLeft: "2rem" }}>{link.text}</a>
										</div>
									)}

									{/* BODY */}
									<div
										style={{
											border: "1px solid #ddd",
											padding: "1rem",
											display: "grid",
											gridTemplateColumns: "repeat(3,1fr)",
											gap: "1rem",
											marginBottom: "1rem",
										}}
									>
										{children.map((child, idx) => (
											<div
												key={idx}
												style={{ border: "1px solid #ddd", padding: "1rem" }}
											>
												<span>{child.title}</span>
												<div dangerouslySetInnerHTML={{ __html: child.text }} />
											</div>
										))}
									</div>
								</div>
							);
						})}
					</Slider>
				</div>

				{/* SLIDE EDITOR */}
				<SlideEditor
					editingIdx={editingIdx}
					enableSliderHeader={enableSliderHeader}
					handleAddCard={handleAddCard}
					handleDeleteImage={handleDeleteImage}
					handleRemoveCard={handleRemoveCard}
					handleSelectImage={handleSelectImage}
					setCard={setCard}
					setLink={setLink}
					slides={slides}
					setEditingIdx={setEditingIdx}
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
					<ToggleControl
						label="Show Slide Header?"
						checked={enableSliderHeader}
						onChange={(val) => setAttributes({ enableSliderHeader: val })}
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
