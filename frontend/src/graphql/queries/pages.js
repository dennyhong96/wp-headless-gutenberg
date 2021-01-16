import { gql } from "graphql-request";

export const LIST_PAGES = gql`
	query ListPages {
		listPages: pages {
			nodes {
				uri
				link
				id
				title
			}
		}
	}
`;

export const GET_PAGE = gql`
	query GetPage($uri: String!) {
		getPage: pageBy(uri: $uri) {
			uri
			link
			id
			title
			blocks {
				name
				order
				__typename

				# Feature Cards Block
				... on CreateBlockFeatureCardsBlock {
					attributes {
						... on CreateBlockFeatureCardsBlockAttributes {
							cards
						}
					}
				}

				# Card Gallery Block
				... on CreateBlockCardGalleryBlock {
					innerBlocks {
						__typename
						... on CoreColumnsBlock {
							innerBlocks {
								__typename
								... on CoreColumnBlock {
									innerBlocks {
										__typename
										... on CreateBlockCardGalleryCardBlock {
											attributes {
												... on CreateBlockCardGalleryCardBlockAttributes {
													className
													mediaType
													image
													video
													content
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;
