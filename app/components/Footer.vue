<template>
  <footer class="border-t border-gold-500/10 py-12 px-6">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-sm text-gold-400/60">
        &copy; {{ new Date().getFullYear() }} Yuki. All rights reserved.
      </p>
      <div class="flex items-center gap-6">
        <a
          v-for="social in socials"
          :key="social.label"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-gold-400/60 hover:text-gold-300 transition-colors"
        >
          {{ social.label }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const socials = [
  { label: 'Github', href: 'https://github.com/uryukim' },
	{ label: 'Instagram', href: 'https://www.instagram.com/uryukim/' }
]
</script>
