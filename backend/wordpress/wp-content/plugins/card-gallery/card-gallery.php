<?php
/**
 * Plugin Name:     Card Gallery
 * Description:     Example block written with ESNext standard and JSX support – build step required.
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     card-gallery
 *
 * @package         create-block
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function create_block_card_gallery_block_init() {
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "create-block/card-gallery" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'create-block-card-gallery-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'create-block-card-gallery-block-editor', 'card-gallery' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'create-block-card-gallery-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'create-block-card-gallery-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'create-block/card-gallery', array(
		'editor_script' => 'create-block-card-gallery-block-editor',
		'editor_style'  => 'create-block-card-gallery-block-editor',
		'style'         => 'create-block-card-gallery-block',
	) );
}
add_action( 'init', 'create_block_card_gallery_block_init' );


// ADD COLOR PALETTE SUPPORT
/**
 * Theme Setup
 *
 */
function block_color_setup() {
	// Disable Custom Colors
	// add_theme_support( 'disable-custom-colors' );

	// Editor Color Palette
	add_theme_support( 'editor-color-palette', array(
    array(
			'name'  => __( 'White', 'block' ),
			'slug'  => 'white',
			'color' => '#ffffff',
		),
		array(
			'name'  => __( 'Light Blue', 'block' ),
			'slug'  => 'light_blue',
			'color'	=> '#f1f4f9',
		),
		array(
			'name'  => __( 'Light Brown', 'block' ),
			'slug'  => 'light_brown',
			'color' => '#f8f5f0',
		),
	) );
}
add_action( 'after_setup_theme', 'block_color_setup' );
