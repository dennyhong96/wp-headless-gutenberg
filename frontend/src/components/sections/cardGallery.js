import Image from "next/image";
import { nanoid } from "nanoid";
import stripTags from "striptags";
import classNames from "classnames";

import sanitize from "@/utils/sanitize";
import Link from "next/link";

const CardGallery = ({ block }) => {
	let {
		name,
		attributes: { cardsPerRow, header, footer, backgroundColor, customBackgroundColor },
		innerBlocks,
	} = block;

	header = header ? JSON.parse(header) : null;
	footer = footer ? JSON.parse(footer) : null;

	const colorMap = {
		white: "#fff",
		light_blue: "#f1f4f9",
		light_brown: "#f8f5f0",
	};

	const bgColor =
		backgroundColor && !customBackgroundColor
			? colorMap[backgroundColor]
			: !backgroundColor && customBackgroundColor
			? customBackgroundColor
			: undefined;

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
				{header.enableHeader && (
					<div className="card-gallery__header">
						<h2>{header.heading}</h2>
						<div>{header.content}</div>
					</div>
				)}

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
				{footer.enableFooter && (
					<div className="card-gallery__footer">
						<div>{footer.footerText}</div>
						{footer.callToAction.text && footer.callToAction.url && (
							<Link href={footer.callToAction.url} passHref>
								<a
									className={classNames("cta-btn", {
										"cta-btn--filled": footer.callToAction.style === "filled",
										"cta-btn--outlined":
											footer.callToAction.style === "outlined",
									})}
									target={classNames("", {
										_blank: footer.callToAction.targetBlank,
									})}
									rel={classNames("", {
										"noopener noreferrer": footer.callToAction.targetBlank,
										nofollow: footer.callToAction.noFollow,
									})}
								>
									{footer.callToAction.text}
								</a>
							</Link>
						)}
					</div>
				)}
			</div>
		</section>
	);
};

export default CardGallery;
