import SlickSlider from "react-slick";
import { nanoid } from "nanoid";
import Link from "next/link";

import useColor from "@/hooks/useColor";
import SectionFooter from "../common/sectionFooter";
import SectionHeader from "../common/sectionHeader";
import sanitize from "@/utils/sanitize";
import { ArrowRight, SliderArrowLeft, SliderArrowRight } from "../icons";

const Slider = ({ block }) => {
	// SLICK SLIDER CONFIG
	const sliderConfig = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		prevArrow: (
			<button>
				<div>
					<SliderArrowLeft />
				</div>
			</button>
		),
		nextArrow: (
			<button>
				<div>
					<SliderArrowRight />
				</div>
			</button>
		),
	};

	console.log(block);
	const { __typename, name, order, attributes } = block;

	let {
		backgroundColor,
		customBackgroundColor,
		enableSliderHeader,
		footer,
		header,
		slides,
	} = attributes;

	header = header ? JSON.parse(header) : null;
	footer = footer ? JSON.parse(footer) : null;
	slides = slides ? JSON.parse(slides) : null;

	const { color: bgColor } = useColor({ backgroundColor, customBackgroundColor });

	console.log({ slides });

	return (
		<section className="slider" style={{ backgroundColor: bgColor }}>
			<div className="slider__inner">
				{/* SECTION HEADER */}
				<SectionHeader header={header} />

				{/* SECTION BODY */}
				<div className="slider__body">
					{/* SLIDER */}
					<SlickSlider {...sliderConfig}>
						{slides.map((slide) => (
							<div key={nanoid()} className="slider__item">
								<div className="slider__item-inner">
									{/* SLIDER ITEM HEADER */}
									{enableSliderHeader && (
										<div className="slider__item-header">
											{/* LOGO */}
											<img
												src={slide.header.logo.url}
												alt={slide.header.logo.url}
												width={100}
											/>

											{/* LINK */}
											<Link href={slide.header.link.url} passHref>
												<a>
													{slide.header.link.text} <ArrowRight />
												</a>
											</Link>
										</div>
									)}

									{/* SLIDER ITEM BODY */}
									<div className="slider__item-body">
										{slide.children.map((card) => (
											<div className="slider__item-body__card">
												{/* TITLE */}
												<span className="slider__item-body__title">
													{card.title}
												</span>

												{/* TEXT CONTENT */}
												<div
													className="slider__item-body__text"
													dangerouslySetInnerHTML={{
														__html: sanitize(card.text),
													}}
												/>
											</div>
										))}
									</div>
								</div>
							</div>
						))}
					</SlickSlider>
				</div>

				{/* SECTION FOOTER */}
				<SectionFooter footer={footer} />
			</div>
		</section>
	);
};

export default Slider;
