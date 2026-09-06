<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    class="mb-12"
  >
    <p class="text-sm uppercase tracking-[0.3em] text-gold-500 mb-2">
      {{ label }}
    </p>
    <h2 class="font-display text-3xl md:text-4xl text-gold-300">
      <slot />
    </h2>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>
