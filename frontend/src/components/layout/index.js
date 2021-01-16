import { Fragment } from "react";
import Head from "next/head";

import Footer from "./footer";
import Header from "./header";
import usePageData from "@/hooks/usePageData";
import SEO from "@/components/seo";
import sanitize from "@/utils/sanitize";

const Layout = ({ children }) => {
  const { data } = usePageData({ config: { revalidateOnMount: false } });

  return (
    <Fragment>
      <SEO {...data?.getPage?.seo} />

      <Head>
        <link rel="shortcut icon" href={data?.header?.favicon} />
        <script
          type="application/ld+json"
          className="yoast-schema-graph"
          key="yoastSchema"
          dangerouslySetInnerHTML={{ __html: sanitize(data?.getPage?.seo?.schemaDetails) }}
        />
      </Head>

      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

export default Layout;
