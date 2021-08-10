<?php
/**
 * Plugin Name: ld-{plugin-shortcode}
 * Description: Vue-powered WordPress plugin boilerplate
 * Author: Tauno Hanni
 * Version: 1.0
 * Author URI: https://github.com/taunoha/wp-plugin-vue-boilerplate
 */

defined('ABSPATH') or die();

define('LD_{PLUGIN}_DIR', dirname(__FILE__));
define('LD_{PLUGIN}_URL', plugin_dir_url(__FILE__));

function ld_{plugin}_auto_version_file($file)
{
    $file = ltrim($file, '/');

    if( !file_exists(LD_{PLUGIN}_DIR . '/' . $file) ) {
        return $file;
    }

    $mtime = filemtime(LD_{PLUGIN}_DIR . '/' . $file);
    return preg_replace('{\\.([^./]+)$}', ".$mtime.\$1", $file);
}

function ld_{plugin}_log($error, $type = 'log')
{
    if( ! is_string($error) ) {
        $error = wp_json_encode($error);
    }

    $time = wp_date('Y-m-d H:i:s');

    do_action('ld_{plugin}_log', $error, $type, $time);

    error_log("[{$time}] {$type}: {$error}\n", 3, WP_CONTENT_DIR . '/ld-{plugin}.log');
}


function ld_{plugin}_script_data()
{
    $vars = array(
        '_wpnonce' => wp_create_nonce('wp_rest'),
        'nonce' => wp_create_nonce('ld-{plugin-shortcode}'),
        'data' => array(
            'appPermalinkPath' => LD_{PLUGIN}_URL
        ),
        'str' => require(LD_{PLUGIN}_DIR . '/languages/messages.php')
    );

    return 'var ld_{plugin} = ' . wp_json_encode($vars) . ';';
}

function ld_{plugin}_shortcode()
{
    if( is_admin() ) {
        return;
    }

    wp_enqueue_style('ld-{plugin-shortcode}', LD_{PLUGIN}_URL . ld_{plugin}_auto_version_file('dist/ld-{plugin-shortcode}.css'), false, null, 'screen');
    wp_enqueue_script('ld-{plugin-shortcode}', LD_{PLUGIN}_URL . ld_{plugin}_auto_version_file('dist/ld-{plugin-shortcode}.js'), false, null, true);
    wp_script_add_data('ld-{plugin-shortcode}', 'data', ld_{plugin}_script_data());

    return '<div id="ld-{plugin-shortcode}"></div>';
}
add_shortcode('ld-{plugin-shortcode}', 'ld_{plugin}_shortcode');
