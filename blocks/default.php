<?php

defined('ABSPATH') or die();

wp_interactivity_config('{plugin-shortcode}', array(
  'translations' => require(LD_{PLUGIN}_DIR . '/languages/messages.php'),
  'attributes' => $args,
));

?>
<div id="{plugin-shortcode}"></div>
