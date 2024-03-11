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

function ld_{plugin}_script_data()
{
  $vars = array(
    'str' => require(LD_{PLUGIN}_DIR . '/languages/messages.php')
  );

  return 'var {plugin} = ' . wp_json_encode($vars) . ';';
}

function ld_{plugin}_shortcode()
{
  if (is_admin()) {
    return;
  }

  wp_enqueue_style('{plugin-shortcode}', LD_{PLUGIN}_URL . 'dist/{plugin-shortcode}.css', false, null, 'screen');
  wp_enqueue_script('{plugin-shortcode}', LD_{PLUGIN}_URL . 'dist/{plugin-shortcode}.js', false, null, true);
  wp_script_add_data('{plugin-shortcode}', 'data', ld_{plugin}_script_data());

  return '<div id="{plugin-shortcode}"></div>';
}
add_shortcode('{plugin-shortcode}', 'ld_{plugin}_shortcode');
