import { request } from "graphql-request";

const fetcher = (query, variables) =>
	request(
		`${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/graphql`,
		query,
		variables ? JSON.parse(variables) : {}
	);

export default fetcher;
