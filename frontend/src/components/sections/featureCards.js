import { Fragment } from "react";
import Link from "next/link";
import classNames from "classnames";
import striptags from "striptags";

import SvgArrowRight from "../icons/ArrowRight";

const hideBody = (idx) => !!idx % 3 !== 0;

const FeatureCards = ({ block }) => {
	return (
		<section className="feature-cards">
			<div className="feature-cards__inner">
				{JSON.parse(block.attributes.cards).map((card, idx) => (
					<Link key={idx} href={card.linkUrl} passHref>
						<a
							className={classNames("feature-cards__item", {
								"feature-cards__item--sm": hideBody(idx),
							})}
							key={idx}
							target={classNames(("", { _blank: card.openInNewTab }))}
							rel={classNames("", {
								"noreferrer noopener": card.openInNewTab,
								nofollow: card.nofollow,
							})}
						>
							{/* SUBHEADING */}
							<span className="feature-cards__item__subheading">
								{striptags(card.subheading)}
							</span>

							{/* HEADING & PARAGRAPH */}
							{!hideBody(idx) ? (
								<Fragment>
									<h3>{striptags(card.heading)}</h3>
									<p>{striptags(card.paragraph)}</p>
								</Fragment>
							) : (
								<h4>{striptags(card.heading)}</h4>
							)}

							{/* CARD LINK */}
							<span
								className="feature-cards__item__link"
								target={classNames(("", { _blank: card.openInNewTab }))}
								rel={classNames("", {
									"noreferrer noopener": card.openInNewTab,
									nofollow: card.nofollow,
								})}
							>
								{striptags(card.linkText)} <SvgArrowRight />
							</span>
						</a>
					</Link>
				))}
			</div>
		</section>
	);
};

export default FeatureCards;
