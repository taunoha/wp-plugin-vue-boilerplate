# wp-vue-plugin-boilerplate

This plugin introduces a shortcode that you can use in your WordPress theme. WordPress replaces this shortcode with a Vue-powered UI. 
It allows you to use a Vue-based stateful and reactive application on your WordPress site with minimal configuration.

```php
<?php
   echo apply_shortcodes('[{plugin-shortcode}]');
?>
```
It is also possible to use the `Shortcode block` in your WordPress editor to add the shortcode to any page or post.

## Before you start

**Remove:**
* .git folder

## 👉  `npm install`
* Install the dependencies in the local node_modules folder.

## 👉  `npm run rename`
* Rename placeholder strings in files

The plugin will automatically version JS and CSS files. The `ld_{plugin}_auto_version_file` function does it. This feature needs `.htaccess`. But you are free to remove it.

```shell
<IfModule mod_rewrite.c>
   RewriteEngine On
   RewriteRule ^(.*)\.[\d]{10}\.(css|js)$ $1.$2 [L]
</IfModule>
```
## Development

## 👉  `npm run dev`
* Use to compile and run the code in development mode.
* Watches for any changes and reports back any errors in your code.
  
## 👉  `npm run lint`
* Check your source code for programmatic and stylistic errors. 
* Format your source code

## 👉  `npm run build`
- Builds production code inside `dist` folder.
- Will extract translatable strings from your code and generates the `languages/messages.php` file.

## i18n

To make strings translatable use the `__("Translatable string")` function in your SFC files.

```html
<script setup>
import { __ } from "@/plugins/i18n";
const message = __("This is a message from i18n!");
</script>

<template>
  <article>
    <h1>{{ __("Hello, World!") }}</h1>
    <p>{{ message }}</p>
  </article>
</template>
```
