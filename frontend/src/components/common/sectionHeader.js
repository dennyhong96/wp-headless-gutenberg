const SectionHeader = ({ header }) => {
	const { heading, content, enableHeader } = header;

	return enableHeader ? (
		<div className="section-header">
			{heading && <h2>{heading}</h2>}
			{content && <div>{content}</div>}
		</div>
	) : null;
};

export default SectionHeader;
