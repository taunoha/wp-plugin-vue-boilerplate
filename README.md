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

### 👉  `npm install`
* Install the dependencies in the local node_modules folder.

### 👉  `npm run rename`
* Rename placeholder strings in files

## Development

### 👉  `npm run dev`
* Use to compile and run the code in development mode.
* Watches for any changes and reports back any errors in your code.
  
### 👉  `npm run lint`
* Check your source code for programmatic and stylistic errors, and format your code.
* Format your source code

### 👉  `npm run build`
* Check your source code for programmatic and stylistic errors, and format your code.
* Will extract translatable strings from your code and generate the `languages/messages.php` file.

## 🌶️ Auto-imports

I have set up auto-imports for components, composables, Vue.js APIs, and your utilities inside the ``utils`` folder. This includes:

- All components in your ``components`` folder
- All composables in your ``composables`` folder
- All utilities in your ``utils`` folder 
- Core Vue.js APIs (ref, computed, watch, etc.)
- VueUse composables (useStorage, useMouse, useWindowSize, etc.)

You can use these in your application without explicitly importing them. For example:

```
components
├─ Icon
│  └─ Arrow.vue
└─ ErrorBoundary.vue
```

You can use these components in your templates as:
```html
<ErrorBoundary />
<IconArrow />
```

Contrary to a classic global declaration, it will preserve typings, IDE completions, and hints and only include what is used in your code.

## &lt;ErrorBoundary&gt; component

This component handles errors happening in its default slot. It will prevent the error from bubbling up to the top level, and will render the #error slot instead.
It uses Vue's [`onErrorCaptured`](https://vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured) hook under the hood.

```html
<script setup>
function handleErrorLog(err) {
  console.log(err);
}
</script>
<template>
  <ErrorBoundary @error="handleErrorLog">
    <!-- --- -->
    <template #error="{ error, clearError }">
      <p>{{ error }}</p>
      <button @click="clearError">Try Again</button>
    </template>
  </ErrorBoundary>
</template>
```

## i18n

Use the `__("Translatable string")` function in your SFC files to make strings translatable.

```html
<script setup>
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

### Translation Plugin Compatibility

This plugin is compatible with popular WordPress translation plugins like WPML, Polylang, or TranslatePress. The translation functions (`__()`, `_n()`, `_x()`, etc.) integrate with WordPress's translation ecosystem, allowing you to:

- Extract translatable strings using the plugins' string scanning features
- Manage translations through the plugins' translation interfaces
- Use the plugins' language switching functionality
- Maintain translations across different language versions of your site
