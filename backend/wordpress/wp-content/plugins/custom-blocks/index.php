<?php
/**
 * Plugin Name:     Custom blocks
 * Description:     Custom built blocks.
 * Version:         0.1.0
 * Author:          Denny Hong
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     custom-blocks
 *
 * @package         create-block
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function custom_block_init() {
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` from the plugin root dir first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'custom-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'custom-block-editor', 'card-gallery' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'custom-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'custom-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'create-block/card-gallery', array(
		'editor_script' => 'custom-block-editor',
		'editor_style'  => 'custom-block-editor',
		'style'         => 'custom-block',
	) );
}
add_action( 'init', 'custom_block_init' );

//
// ADD A BLOCK CATEGORY
/**
 * Creating a block category
 *
 */
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

register_block_pattern(
  'Homepage Pattern',
  array(
      'title'       => __( 'Homepage Pattern', 'custom-blocks' ),
      'description' => _x( 'Two horizontal buttons, the left button is filled in, and the right button is outlined.', 'Block pattern description', 'my-plugin' ),
      'content'     => '<!-- wp:create-block/card-gallery {"backgroundColor":"light_blue","header":{"enableHeader":true,"heading":"Card Gallery","content":"This is card gallery block"},"cardsPerRow":4,"footer":{"enableFooter":true,"footerText":"This is a section footer.","callToAction":{"text":"Request Demo","url":"http://localhost:8020/hello-world/","targetBlank":true,"noFollow":false,"style":"filled"}}} -->
      <section class="wp-block-create-block-card-gallery"><!-- wp:create-block/card-gallery-card {"mediaType":"image","image":{"url":"http://localhost:8020/wp-content/uploads/2021/01/evan-wise-D99y38Na5Xo-unsplash-300x200.jpg","alt":"bbq","height":200,"width":300},"content":{"subtitle":"BBQ","title":"Nice BBQ","body":"This BBQ is nice!"}} -->
      <div class="wp-block-create-block-card-gallery-card core/paragraph"></div>
      <!-- /wp:create-block/card-gallery-card -->

      <!-- wp:create-block/card-gallery-card {"mediaType":"video","video":{"url":"http://localhost:8020/wp-content/uploads/2021/01/Windsurfer-2-1.mp4","thumb":{"src":"http://localhost:8020/wp-includes/images/media/video.png","width":48,"height":64},"height":1080,"width":1920},"content":{"subtitle":"Ocean","title":"Nice Ocean","body":"This ocean is nice\u003cbr\u003eLook at that, wow!"}} -->
      <div class="wp-block-create-block-card-gallery-card core/paragraph"></div>
      <!-- /wp:create-block/card-gallery-card -->

      <!-- wp:create-block/card-gallery-card {"mediaType":"image","image":{"url":"http://localhost:8020/wp-content/uploads/2021/01/wright-brand-bacon-Vs7xQTZG-Bk-unsplash-2-300x200.jpg","alt":"","height":200,"width":300},"content":{"subtitle":"","title":"Nice muffin","body":"This has a link.\u003cbr\u003e\u003ca href=\u0022http://localhost:8020/hello-world/\u0022 target=\u0022_blank\u0022 rel=\u0022noreferrer noopener nofollow\u0022\u003eHello world!\u003c/a\u003e"}} -->
      <div class="wp-block-create-block-card-gallery-card core/paragraph"></div>
      <!-- /wp:create-block/card-gallery-card -->

      <!-- wp:create-block/card-gallery-card {"mediaType":"video","video":{"url":"http://localhost:8020/wp-content/uploads/2021/01/Paragliding-Into-The-Sunset-On-Muriwai-Beach-1.mp4","thumb":{"src":"http://localhost:8020/wp-includes/images/media/video.png","width":48,"height":64},"height":1080,"width":1920},"content":{"subtitle":"Gliding","title":"Look!","body":"Super dope!"}} -->
      <div class="wp-block-create-block-card-gallery-card core/paragraph"></div>
      <!-- /wp:create-block/card-gallery-card --></section>
      <!-- /wp:create-block/card-gallery -->

      <!-- wp:create-block/block-slider {"backgroundColor":"light_brown","slides":[{"header":{"logo":{"url":"http://localhost:8020/wp-content/uploads/2021/01/wright-brand-bacon-Vs7xQTZG-Bk-unsplash-2.jpg","alt":""},"link":{"url":"http://localhost:8020/hello-world/","text":"Slide header link","targetBlank":true}},"children":[{"title":"A card title","text":"Some text content..."},{"title":"Another One","text":"Hey"}]},{"header":{"logo":{},"link":{"url":"","text":""}},"children":[{"title":"","text":""}]}]} -->
      <section class="wp-block-create-block-block-slider wp-block-create-block-card-gallery"></section>
      <!-- /wp:create-block/block-slider -->',
  )
);
