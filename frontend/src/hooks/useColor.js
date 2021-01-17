const COLOR_MAP = {
	white: "#fff",
	light_blue: "#f1f4f9",
	light_brown: "#f8f5f0",
};

const useColor = ({ backgroundColor, customBackgroundColor }) => {
	const color =
		backgroundColor && !customBackgroundColor
			? COLOR_MAP[backgroundColor]
			: !backgroundColor && customBackgroundColor
			? customBackgroundColor
			: undefined;

	return { color };
};

export default useColor;
