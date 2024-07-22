<script setup>
import { __ } from "@/utils/i18n";
const message = __("This is a message from i18n!");
</script>

<template>
  <article>
    <h1>{{ __("Hello, World!") }}</h1>
    <p>{{ message }}</p>
  </article>
</template>
