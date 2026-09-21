<template>
  <button
    @click="toggle"
    class="text-gold-400 hover:text-gold-300 transition-colors cursor-pointer"
    :title="musicPlaying ? 'Mute music' : 'Play music'"
  >
    <Icon
      :name="musicPlaying ? 'lucide:volume-2' : 'lucide:volume-x'"
      class="w-4 h-4"
    />
  </button>
</template>

<script setup lang="ts">
const { musicPlaying } = useBackgroundMedia()
const toggle = inject<() => void>('toggleMusic', () => {})
</script>
