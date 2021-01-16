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

			# BLOCKS
			blocks {
				name
				order
				__typename

				# FEATURE CARDS COMPONENTS
				... on CreateBlockFeatureCardsBlock {
					attributes {
						... on CreateBlockFeatureCardsBlockAttributes {
							cards
						}
					}
				}

				# CARD GALLERY COMPONENT
				... on CreateBlockCardGalleryBlock {
					attributes {
						... on CreateBlockCardGalleryBlockAttributes {
							cardsPerRow
							header
							footer
							backgroundColor
							customBackgroundColor
						}
					}
					innerBlocks {
						__typename

						# CARD GALLERY ITEM
						... on CreateBlockCardGalleryCardBlock {
							name
							order
							attributes {
								... on CreateBlockCardGalleryCardBlockAttributes {
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
`;
