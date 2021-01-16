import { NextSeo } from "next-seo";

const SEO = ({
  breadcrumbs,
  title,
  metaDesc,
  metaRobotsNoindex,
  metaRobotsNofollow,
  opengraphAuthor,
  opengraphDescription,
  opengraphTitle,
  schemaDetails,
  opengraphImage,
  opengraphSiteName,
  opengraphModifiedTime,
  opengraphPublishedTime,
  twitterTitle,
  twitterDescription,
  twitterImage,
}) => {
  const currentLocation = process.browser && window.location.origin;
  const opengraphUrl = process.env.NEXT_PUBLIC_SITE_URL ?? currentLocation;

  return (
    <NextSeo
      title={title}
      description={opengraphDescription ?? metaDesc}
      canonical={opengraphUrl}
      noindex={metaRobotsNoindex}
      nofollow={metaRobotsNofollow}
      openGraph={{
        type: "website",
        locale: "en_US",
        url: opengraphUrl,
        title: opengraphTitle,
        description: opengraphDescription,
        site_name: opengraphSiteName,
        images: [
          {
            url: opengraphImage?.sourceUrl,
            width: 1280,
            height: 720,
          },
        ],
      }}
      twitter={{
        cardType: "summary_large_image",
      }}
    />
  );
};

export default SEO;
