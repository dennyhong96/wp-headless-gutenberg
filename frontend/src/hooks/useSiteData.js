import useInitialSWR from "@/hooks/useInitialSWR";
import fetcher from "@/graphql/fetcher";
import { LAYOUT } from "@/graphql/queries/layout";

const useSiteData = (config = {}) => {
  const { ...responses } = useInitialSWR(LAYOUT, fetcher, config);
  return { ...responses };
};

export default useSiteData;
