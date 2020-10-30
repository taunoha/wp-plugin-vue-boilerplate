# wp-vue-plugin-boilerplate

This plugin will introduce a shortcode that you can use in your WordPress theme. WordPress will replace this shortcode with Vue-powered UI.

```php
<?php
   echo apply_shortcodes('[ld-{plugin-shortcode}]');
?>
```

## Before you start

**Remove:**
* .git folder

**Rename files:**
* ld-{plugin-shortcode}.php => ld-form-quote.php

**Find in files and replace:**
* ld_{plugin} => ld_form_quote
* ld-{plugin-shortcode} => ld-form-quote
* LD_{PLUGIN}_DIR => LD_FORM_QUOTE_DIR

**Automatic versioning files**

The plugin will automatically version JS and CSS files. The `ld _{plugin}_auto_version_file` does this. This feature needs `.htaccess` update. But you are free to remove it.

```shell
<IfModule mod_rewrite.c>
   RewriteEngine On

   RewriteRule ^(.*)\.[\d]{10}\.(css|js)$ $1.$2 [L]

</IfModule>
```
## Development

## 👉  `npm install`
* Install the dependencies in the local node_modules folder.

## 👉  `npm run dev`
* Use to compile and run the code in development mode.
* Watches for any changes and reports back any errors in your code.

## 👉  `npm run build`
- Use to build production code inside `dist` folder.
- Will extract translatable strings from your code and generates the `languages/messages.php` file.

## i18n

To make strings translatable use the `__('Translatable string')` function in your SFC files.

```html
<template>
   <article>
      <h1>{{ __('Hello World!') }}</h1>
   </article>
</template>

<script>
export default {
   name : 'App',
   computed: {
      someString() {
         return this.__('Some string');
      }
   }
}
</script>
```
