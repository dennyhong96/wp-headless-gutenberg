import { Fragment } from "@wordpress/element";
import { getDefaultBlockName, registerBlockType } from "@wordpress/blocks";
import { useSelect, useDispatch } from "@wordpress/data";
import {
	RichText,
	MediaUpload,
	MediaPlaceholder,
	BlockControls,
} from "@wordpress/block-editor";
import {
	Button,
	Toolbar,
	ToolbarGroup,
	ToolbarButton,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import "./style.scss";

registerBlockType("create-block/card-gallery-card", {
	apiVersion: 2,

	title: __("Card Gallery Card", "card-gallery"),

	description: __("A card that contains image or video.", "card-gallery"),

	category: "theme-blocks",

	icon: "smiley",

	parent: ["create-block/card-gallery"],

	supports: {
		// Removes support for an HTML mode.
		html: false,
	},

	attributes: {
		mediaType: {
			type: "string",
		},

		// IMAGE
		image: {
			type: "object",
			default: {
				url: "",
				alt: "",
				height: 0,
				width: 0,
			},
		},

		// IMAGE
		video: {
			type: "object",
			default: {
				url: "",
				thumb: {},
				height: 0,
				width: 0,
			},
		},

		// CONTENT
		content: {
			type: "object",
			default: {
				subtitle: "",
				title: "",
				body: "",
			},
		},
	},

	edit(props) {
		const { removeBlock } = useDispatch("core/block-editor");
		const { attributes, setAttributes, className, clientId } = props;
		const { image, content, video, mediaType } = attributes;
		const { subtitle, title, body } = content;

		const handleChange = (attr) => (val) =>
			setAttributes({ content: { ...content, [attr]: val } });

		const handleSelectMedia = (media) =>
			setAttributes(
				media.type === "image"
					? {
							mediaType: "image",
							image: {
								...image,
								url: media.sizes?.medium?.url ?? media.url,
								alt: media.alt,
								height: media.sizes?.medium?.height ?? media.height,
								width: media.sizes?.medium?.width ?? media.width,
							},
					  }
					: {
							mediaType: "video",
							video: {
								...video,
								url: media.url,
								thumb: media.thumb,
								height: media.height,
								width: media.width,
							},
					  }
			);

		const handleDeleteMedia = () =>
			setAttributes({
				...(mediaType === "image"
					? { url: "", alt: "", height: 0, width: 0 }
					: { url: "", thumb: {}, height: 0, width: 0 }),
				mediaType: "",
			});

		return (
			<Fragment>
				<div className={className}>
					{/* CARD MEDIA PREVIEW */}
					{mediaType === "image" ? (
						<img src={image.url} alt={image.alt} width="100%" height="auto" />
					) : mediaType === "video" ? (
						<video
							src={video.url}
							width="100%"
							height="auto"
							muted
							autoPlay
							loop
						/>
					) : (
						<div
							style={{
								width: "100%",
								height: 200,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								border: "1px solid #ddd",
							}}
						>
							{/* CARD MEDIA UPLOAD */}
							<MediaUpload
								onSelect={handleSelectMedia}
								render={({ open }) => (
									<Button icon="format-image" onClick={open}>
										Add an image or video
									</Button>
								)}
							/>
						</div>
					)}

					<br />

					{/* CARD CONTENT INPUT */}
					<RichText
						tagName="span"
						allowedFormats={[]}
						placeholder="Subtitle"
						value={subtitle}
						onChange={handleChange("subtitle")}
					/>
					<RichText
						tagName="h3"
						allowedFormats={[]}
						placeholder="Title"
						value={title}
						onChange={handleChange("title")}
					/>
					<RichText
						tagName="div"
						placeholder="Body Content"
						value={body}
						onChange={handleChange("body")}
					/>
				</div>

				{/* DELETE MEDIA BUTTON */}
				<BlockControls>
					{!!mediaType && (
						<Toolbar>
							<ToolbarGroup>
								<ToolbarButton
									title={`Delete ${mediaType}`}
									icon={<DeleteMediaIcon />}
									onClick={handleDeleteMedia}
								/>
							</ToolbarGroup>
						</Toolbar>
					)}

					{/* DELETE CARD BUTTON */}
					<Toolbar>
						<ToolbarGroup>
							<ToolbarButton
								title="Remove this card"
								icon={<DeleteCardIcon />}
								onClick={removeBlock.bind(this, clientId)}
							/>
						</ToolbarGroup>
					</Toolbar>
				</BlockControls>
			</Fragment>
		);
	},

	save({ attributes }) {
		const className = getDefaultBlockName("create-block/card-gallery-card");
		return <div className={className}></div>;
	},
});

// CUSTOM ICONS
function DeleteMediaIcon(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			id="prefix__Icons"
			x={0}
			y={0}
			viewBox="0 0 32 32"
			xmlSpace="preserve"
			{...props}
		>
			<style>
				{
					".prefix__st0{fill:none;stroke:#000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}"
				}
			</style>
			<path
				className="prefix__st0"
				d="M17 22H1M1 10h30M6 27v-5M11 27v-5M6 10V5M11 10V5M16 10V5M21 10V5M26 10V5"
			/>
			<circle className="prefix__st0" cx={24} cy={24} r={7} />
			<path
				className="prefix__st0"
				d="M21.9 21.9l4.2 4.2M21.9 26.1l4.2-4.2M17.7 27H1V5h30v19"
			/>
		</svg>
	);
}

function DeleteCardIcon(props) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 58.67" {...props}>
			<defs>
				<style>{".prefix__cls-1{fill:#35353d}"}</style>
			</defs>
			<title>{"Asset 25"}</title>
			<g id="prefix__Layer_2" data-name="Layer 2">
				<g id="prefix__Layer_1-2" data-name="Layer 1">
					<path
						className="prefix__cls-1"
						d="M61.33 5.33H48V2.67A2.66 2.66 0 0045.33 0H18.67A2.66 2.66 0 0016 2.67v2.66H2.67a2.67 2.67 0 000 5.34H8v40a8 8 0 008 8h32a8 8 0 008-8v-40h5.33a2.67 2.67 0 100-5.34zM50.67 50.67A2.67 2.67 0 0148 53.33H16a2.67 2.67 0 01-2.67-2.66v-40h37.34z"
					/>
					<path
						className="prefix__cls-1"
						d="M24 45.33a2.67 2.67 0 002.67-2.66V21.33a2.67 2.67 0 00-5.34 0v21.34A2.67 2.67 0 0024 45.33zM40 45.33a2.67 2.67 0 002.67-2.66V21.33a2.67 2.67 0 00-5.34 0v21.34A2.67 2.67 0 0040 45.33z"
					/>
				</g>
			</g>
		</svg>
	);
}
