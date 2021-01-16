import Image from "next/image";
import { nanoid } from "nanoid";
import stripTags from "striptags";

import sanitize from "@/utils/sanitize";

const CardGallery = ({ block }) => {
	return (
		<section className="card-gallery">
			<div className="card-gallery__inner">
				{block?.innerBlocks?.flatMap((columnsBlock) =>
					columnsBlock?.innerBlocks?.map((columnBlock) => {
						const card = columnBlock.innerBlocks[0].attributes;
						let { mediaType, image, video, content } = card;

						{
							/* EMPTY CARD */
						}
						if (!(mediaType && content)) return null;

						{
							/* PARSE CONTENT */
						}
						image = mediaType === "image" && image ? JSON.parse(image) : null;
						video = mediaType === "video" && video ? JSON.parse(video) : null;
						content = JSON.parse(content);

						return (
							<div className="card-gallery__item" key={nanoid()}>
								{/* CARD MEDIA */}
								<div className="card-gallery__media">
									{mediaType === "image" && (
										<Image
											className="card-gallery__image"
											src={image.url}
											alt={image.alt}
											layout="fill"
										/>
									)}

									{mediaType === "video" && (
										<video
											className="card-gallery__video"
											src={video.url}
											muted
											autoPlay
											loop
										/>
									)}
								</div>

								{/* CARD CONTENT */}
								<div className="card-gallery__content">
									{content.subtitle && <span>{stripTags(content.subtitle)}</span>}
									{content.title && <h3>{stripTags(content.title)}</h3>}
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
					})
				)}
			</div>
		</section>
	);
};

export default CardGallery;
