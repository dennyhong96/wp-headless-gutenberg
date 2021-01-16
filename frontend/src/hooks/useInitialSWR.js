import { useEffect } from "react";
import useSWR from "swr";

const useInitialSWR = (key, fetcher, config = {}) => {
	const { mutate, ...restResponses } = useSWR(key, fetcher, config);
	const initialData = config.initialData;

	useEffect(() => {
		if (initialData) {
			mutate(initialData, false);
		}
	}, [key]);

	return {
		mutate,
		...restResponses,
	};
};

export default useInitialSWR;
