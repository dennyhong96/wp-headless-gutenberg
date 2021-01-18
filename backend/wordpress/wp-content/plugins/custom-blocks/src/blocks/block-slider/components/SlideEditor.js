import { RichText, URLInput, MediaUpload } from "@wordpress/block-editor";
import {
	Button,
	IconButton,
	PanelBody,
	ToggleControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const SlideEditor = ({
	editingIdx,
	enableSliderHeader,
	slides,
	handleDeleteImage,
	handleSelectImage,
	setCard,
	handleRemoveCard,
	handleAddCard,
	setLink,
	setEditingIdx,
}) => {
	return (
		(!!editingIdx || editingIdx === 0) && (
			<div
				style={{
					border: "1px solid #ddd",
					padding: "1rem",
					backgroundColor: "#fff",
					marginBottom: "2rem",
				}}
			>
				<div style={{ marginBottom: "1rem" }}>
					Editing slide #{editingIdx + 1}:
				</div>

				{/* HEADER LOGO SETTINGS */}
				{enableSliderHeader && (
					<div
						style={{
							borderLeft: "1px solid #f0f0f0",
							borderRight: "1px solid #f0f0f0",
							marginBottom: "0.5rem",
						}}
					>
						<PanelBody title="Header logo settings" initialOpen={false}>
							{slides[editingIdx].header.logo.url ? (
								<div>
									<img
										src={slides[editingIdx].header.logo.url}
										alt={slides[editingIdx].header.logo.alt}
										width={100}
										height="auto"
									/>
									<IconButton
										isDestructive
										label="Delete Image"
										icon="trash"
										onClick={handleDeleteImage}
									/>
								</div>
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
									<MediaUpload
										allowedTypes={["image"]}
										onSelect={handleSelectImage}
										render={({ open }) => (
											<Button icon="format-image" onClick={open}>
												Add logo
											</Button>
										)}
									/>
								</div>
							)}
						</PanelBody>
					</div>
				)}

				{/* HEADER LINK SETTINGS */}
				{enableSliderHeader && (
					<div
						style={{
							borderLeft: "1px solid #f0f0f0",
							borderRight: "1px solid #f0f0f0",
							marginBottom: "0.5rem",
						}}
					>
						<PanelBody title="Header link settings" initialOpen={false}>
							<RichText
								tagName="span"
								placeholder="Link Text"
								onChange={setLink("text")}
								value={slides[editingIdx].header.link.text}
								allowedFormats={[]}
							/>
							<URLInput
								isFullWidth
								hasBorder
								value={slides[editingIdx].header.link.url}
								onChange={setLink("url")}
							/>
							<ToggleControl
								label={__("Open in new tab")}
								onChange={setLink("targetBlank")}
								checked={slides[editingIdx].header.link.targetBlank}
							/>
							<ToggleControl
								label={__("Hide from search engine")}
								onChange={setLink("noFollow")}
								checked={slides[editingIdx].header.link.noFollow}
							/>
						</PanelBody>
					</div>
				)}

				{/* BODY CARDS SETTINGS */}
				<div
					style={{
						borderLeft: "1px solid #f0f0f0",
						borderRight: "1px solid #f0f0f0",
						marginBottom: "0.5rem",
					}}
				>
					<PanelBody title="Body cards settings" initialOpen={false}>
						<div style={{ marginBottom: "1rem" }}>
							Add to 3 cards with a title and text content on each of them.
						</div>

						<div
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(3,1fr)",
								gap: "1rem",
							}}
						>
							{slides[editingIdx].children.map((card, cardIdx) => (
								<div style={{ border: "1px solid #ddd", padding: "1rem" }}>
									<RichText
										tagName="span"
										placeholder="Card title"
										onChange={setCard(cardIdx, "title")}
										value={card.title}
										allowedFormats={[]}
									/>
									<RichText
										tagName="div"
										placeholder="Card content"
										onChange={setCard(cardIdx, "text")}
										value={card.text}
									/>
									{slides[editingIdx].children.length > 1 && (
										<IconButton
											icon="trash"
											isDestructive
											label="Remove this card"
											onClick={handleRemoveCard(cardIdx)}
										/>
									)}
								</div>
							))}
						</div>
						{slides[editingIdx].children.length < 3 && (
							<IconButton
								icon="plus"
								label="Add a card"
								onClick={handleAddCard}
							/>
						)}
					</PanelBody>
				</div>
				<Button isPrimary onClick={setEditingIdx.bind(this, null)}>
					Confirm
				</Button>
			</div>
		)
	);
};

export default SlideEditor;
