<template>
  <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gold-950/80 border-b border-gold-500/10">
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <NuxtLink
        to="/"
        class="font-display text-xl text-gold-300 hover:text-gold-500 transition-colors"
      >
        Yuki.
      </NuxtLink>

      <div class="flex items-center gap-8">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm text-gold-400 hover:text-gold-300 transition-colors tracking-wide uppercase"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const links = [
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
]
</script>
