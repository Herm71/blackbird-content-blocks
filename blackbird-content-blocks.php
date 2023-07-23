<?php
/**
 * Plugin Name:       Blackbird Content blocks
 * Plugin URI:        https://github.com/Herm71/multiple-blocks
 * Description:       Template plugin for creating multiple blocks.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            @Herm71
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blackbird
 * Domain Path:       content-blocks
 *
 * @package           bb-content-blocks
 */

/**
 * Enqueue theme scripts and styles.
 */
function blackbird_scripts() {

	wp_register_script( 'details-wrapper-script', plugin_dir_url( __FILE__ ) . 'js/detailswrapper.js', array(), wp_get_theme()->get( 'Version' ), true );
	wp_enqueue_script( 'details-wrapper-script' );

}
add_action( 'wp_enqueue_scripts', 'blackbird_scripts' );

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
function bb_multiple_blocks_register_blocks() {

	// Register blocks in the format $dir => $render_callback.
	$blocks = array(
		'details' => '',
		'details-wrapper' => '',
	);

	foreach ( $blocks as $dir => $render_callback ) {
		$args = array();
		if ( ! empty( $render_callback ) ) {
			$args['render_callback'] = $render_callback;
		}
		register_block_type( __DIR__ . '/blocks/build/' . $dir, $args );
	}
}
add_action( 'init', 'bb_multiple_blocks_register_blocks' );

/**
 * Renders the dynamic block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with latest posts added.
 */

