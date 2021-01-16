<?php
/**
 * Plugin Name:     Feature Cards
 * Description:     Example block written with ESNext standard and JSX support – build step required.
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     feature-cards
 *
 * @package         create-block
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function create_block_feature_cards_block_init() {
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "create-block/feature-cards" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'create-block-feature-cards-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'create-block-feature-cards-block-editor', 'feature-cards' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'create-block-feature-cards-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'create-block-feature-cards-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'create-block/feature-cards', array(
		'editor_script' => 'create-block-feature-cards-block-editor',
		'editor_style'  => 'create-block-feature-cards-block-editor',
		'style'         => 'create-block-feature-cards-block',
	) );
}
add_action( 'init', 'create_block_feature_cards_block_init' );

// Creating a block category
function theme_blocks_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'theme-blocks',
				'title' => __( 'Theme Blocks', 'theme-blocks' ),
			),
		)
	);
}
add_filter( 'block_categories', 'theme_blocks_category', 10, 2);
