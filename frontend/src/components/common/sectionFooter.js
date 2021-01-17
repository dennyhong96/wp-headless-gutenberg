import Link from "next/link";

import classNames from "classnames";

const SectionFooter = ({ footer }) => {
	const {
		enableFooter,
		footerText,
		callToAction: { url, text, style, targetBlank, noFollow },
	} = footer;

	return enableFooter ? (
		<div className="section-footer">
			{footerText && <div>{footerText}</div>}

			{/* CTA BUTTON */}
			{url && text && (
				<Link href={url} passHref>
					<a
						className={classNames("cta-btn", {
							"cta-btn--filled": style === "filled",
							"cta-btn--outlined": style === "outlined",
						})}
						target={classNames("", {
							_blank: targetBlank,
						})}
						rel={classNames("", {
							"noopener noreferrer": targetBlank,
							nofollow: noFollow,
						})}
					>
						{text}
					</a>
				</Link>
			)}
		</div>
	) : null;
};

export default SectionFooter;
