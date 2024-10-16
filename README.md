# A starter plugin to use Vue in your custom WordPress shortcode

This plugin introduces a shortcode for your WordPress theme. WordPress replaces this shortcode with a Vue-powered UI. 
It allows you to use a Vue-based stateful and reactive application on your WordPress site with minimal configuration.

```php
<?php
   echo apply_shortcodes('[{plugin-shortcode}]');
?>
```
You can also use the `Shortcode block` in your WordPress editor to add the shortcode to any page or post.

## Before you start

> [!NOTE]
> Prerequisites
> * Familiarity with the command line
> * Install [Node.js](https://nodejs.org/en) version 20.0 (LTS) or higher LTS

**Remove:**
* .git folder

## 👉  `npm install`
* Install the dependencies in the local node_modules folder.

## 👉  `npm run rename`
* Rename placeholder strings in files

## Development

## 👉  `npm run dev`
* Use to compile and run the code in development mode.
* Watches for any changes and reports back any errors in your code.
  
## 👉  `npm run lint`
* Check your source code for programmatic and stylistic errors. 
* Format your source code

## 👉  `npm run build`
- Builds production code inside `dist` folder.
- Will extract translatable strings from your code and generate the `languages/messages.php` file.

## i18n

Use the `__("Translatable string")` function in your SFC files to make strings translatable.

```html
<script setup>
import { __, _x, _n, _nx } from "@/utils/i18n";
const message = __("This is a message from i18n!");
</script>

<template>
  <article>
    <h1>{{ __("Hello, World!") }}</h1>
    <p>{{ message }}</p>
    <p>{{ _n("%d person", "%d people", 2) }}</p>
    <p>{{ _nx("%d person", "%d people", 2, "different context") }}</p>
    <p>{{ _x("This is a message from i18n!", "different context") }}</p>
  </article>
</template>
```
