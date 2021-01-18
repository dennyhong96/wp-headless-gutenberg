import Image from "next/image";

import { nanoid } from "nanoid";
import stripTags from "striptags";
import classNames from "classnames";

import useColor from "@/hooks/useColor";
import sanitize from "@/utils/sanitize";
import SectionHeader from "../common/sectionHeader";
import SectionFooter from "../common/sectionFooter";

const CardGallery = ({ block }) => {
	let {
		name,
		attributes: { cardsPerRow, header, footer, backgroundColor, customBackgroundColor },
		innerBlocks,
	} = block;

	header = header ? JSON.parse(header) : null;
	footer = footer ? JSON.parse(footer) : null;

	const { color: bgColor } = useColor({ backgroundColor, customBackgroundColor });

	return (
		<section
			className={classNames("card-gallery", {
				"card-gallery--3": cardsPerRow === 3,
				"card-gallery--4": cardsPerRow === 4,
			})}
			style={{ backgroundColor: bgColor }}
		>
			<div className="card-gallery__inner">
				{/* SECTION HEADER */}
				<SectionHeader header={header} />

				{/* SECTION BODY */}
				<div className="card-gallery__body">
					{innerBlocks.map((innerBlock) => {
						switch (innerBlock.__typename) {
							case "CreateBlockCardGalleryCardBlock":
								{
									let {
										attributes: { mediaType, image, video, content },
									} = innerBlock;

									image = mediaType === "image" ? JSON.parse(image) : null;
									video = mediaType === "video" ? JSON.parse(video) : null;
									content = content ? JSON.parse(content) : null;

									if (!(mediaType && content)) return null;

									return (
										<div className="card-gallery__item" key={nanoid()}>
											{/* CARD MEDIA */}
											<div className="card-gallery__media">
												{/* CARD IMAGE */}
												{mediaType === "image" && (
													<Image
														className="card-gallery__image"
														src={image.url}
														alt={image.alt}
														layout="fill"
													/>
												)}

												{/* CARD VIDEO */}
												{mediaType === "video" && (
													<video
														className="card-gallery__video"
														src={video.url}
														muted
														autoPlay
														loop
														playsInline
													/>
												)}
											</div>

											{/* CARD CONTENT */}
											<div className="card-gallery__content">
												{content.subtitle && (
													<span>{stripTags(content.subtitle)}</span>
												)}
												{content.title && (
													<h3>{stripTags(content.title)}</h3>
												)}
												{content.body && (
													<div
														dangerouslySetInnerHTML={{
															__html: sanitize(content.body),
														}}
													/>
												)}
											</div>
										</div>
									);
								}

								{
									/* HANDLE INNER BLOCK TYPE NOT HANDED */
								}
							default: {
								return (
									<div>{`Block: ${name} --> ${innerBlock.name} not handed!`}</div>
								);
							}
						}
					})}
				</div>

				{/* SECTION FOOTER */}
				<SectionFooter footer={footer} />
			</div>
		</section>
	);
};

export default CardGallery;
