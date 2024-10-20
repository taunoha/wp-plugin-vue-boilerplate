<script setup>
defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits(["error"]);
const slots = useSlots();

const error = ref();
const key = ref("init");

function clearError() {
  error.value = undefined;
  key.value = Math.random().toString(16).slice(-4);
}

function ErrorBoundarySlotComp() {
  return error.value ? slots.error?.({ error, clearError }) : slots.default?.();
}

onErrorCaptured((err) => {
  emit("error", err);
  error.value = err;
  return false;
});
</script>

<template>
  <component :is="ErrorBoundarySlotComp" :key="key" />
</template>
