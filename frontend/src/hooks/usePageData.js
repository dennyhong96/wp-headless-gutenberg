import { useRouter } from "next/router";

import useInitialSWR from "./useInitialSWR";
import fetcher from "@/graphql/fetcher";

const usePageData = ({ key: providedKey, config = {} }) => {
  const router = useRouter();
  const key = providedKey ?? router?.query?.slug?.join("/") ?? "/";

  const { ...responses } = useInitialSWR(key, fetcher, config);
  return { ...responses };
};

export default usePageData;
