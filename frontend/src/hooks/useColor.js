const COLOR_MAP = {
	white: "#fff",
	light_blue: "#f1f4f9",
	light_brown: "#f8f5f0",
};

const useColor = ({ color, customColor }) => {
	const hex =
		color && !customColor ? COLOR_MAP[color] : !color && customColor ? customColor : undefined;

	return { color: hex };
};

export default useColor;
