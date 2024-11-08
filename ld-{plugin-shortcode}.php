<?php

/**
 * Plugin Name: {plugin-name}
 * Description: 
 * Author: 
 * Version: 1.0
 */

defined('ABSPATH') or die();

define('LD_{PLUGIN}_DIR', dirname(__FILE__));
define('LD_{PLUGIN}_URL', plugin_dir_url(__FILE__));

function ld_{plugin}_script_attribute($tag, $handle, $src)
{
  if ('{plugin-shortcode}' !== $handle) {
    return $tag;
  }

  $tag = '<script type="module" src="' . esc_url($src) . '"></script>';

  return $tag;
}
add_filter('script_loader_tag', 'ld_{plugin}_script_attribute', 10, 3);

function ld_{plugin}_shortcode($atts)
{
  if (is_admin()) {
    return;
  }

  $attributes = shortcode_atts(array(), $atts);
  $hmrUrl = "";
  
  if( !empty($hmrUrl) ) {
    wp_enqueue_script('{plugin-shortcode}', esc_url($hmrUrl), false, null, true);
  } else {
    $filemtime = filemtime(LD_{PLUGIN}_DIR . '/dist/{plugin-shortcode}.js'); 
    wp_enqueue_script('{plugin-shortcode}', LD_{PLUGIN}_URL . 'dist/{plugin-shortcode}.js', false, $filemtime, true);
    wp_enqueue_style('{plugin-shortcode}', LD_{PLUGIN}_URL . 'dist/{plugin-shortcode}.css', false, $filemtime, 'screen');
  }

  ob_start();
  load_template(LD_{PLUGIN}_DIR . '/blocks/default.php', false, $attributes);
  return ob_get_clean();
}
add_shortcode('{plugin-shortcode}', 'ld_{plugin}_shortcode');
