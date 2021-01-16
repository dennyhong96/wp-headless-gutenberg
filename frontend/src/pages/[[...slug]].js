import { useRouter } from "next/router";
import { nanoid } from "nanoid";

import fetcher from "@/graphql/fetcher";
import { GET_PAGE, LIST_PAGES } from "@/graphql/queries/pages";
import FeatureCards from "@/components/sections/featureCards";
import useInitialSWR from "@/hooks/useInitialSWR";
import CardGallery from "@/components/sections/cardGallery";

const Page = ({ data: initialData }) => {
	const router = useRouter();
	const uri = router.query?.slug?.join("/") ?? "/";
	const { data, error } = useInitialSWR([GET_PAGE, JSON.stringify({ uri })], fetcher, {
		initialData,
	});

	if (router.isFallback || !data) return <p>Loading...</p>;
	if (error) console.error(error);

	return (
		<main>
			{data.getPage.blocks.map((block) => {
				{
					/* Return section based on block types */
				}
				console.log(`#${block.order} -----> ${block.name}`);
				switch (block.__typename) {
					case "CreateBlockFeatureCardsBlock": {
						return <FeatureCards key={nanoid()} block={block} />;
					}

					case "CreateBlockCardGalleryBlock": {
						return <CardGallery key={nanoid()} block={block} />;
					}

					default: {
						return <p key={nanoid()}>Block type "{block.__typename}" not handled.</p>;
					}
				}
			})}
		</main>
	);
};

export const getStaticProps = async ({ params }) => {
	const uri = params?.slug?.join("/") ?? "/";
	console.log(JSON.stringify({ uri }));
	const data = await fetcher(GET_PAGE, JSON.stringify({ uri }));

	return {
		props: { data },
		revalidate: 1,
	};
};

export const getStaticPaths = async () => {
	const data = await fetcher(LIST_PAGES);
	const paths = data.listPages.nodes.map((page) => ({
		params: { slug: page.uri.split("/").filter((part) => !!part) },
	}));

	return {
		paths,
		fallback: true,
	};
};

export default Page;
