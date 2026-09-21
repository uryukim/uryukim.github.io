<template>
  <Transition name="gate">
    <div
      v-if="!entered"
      class="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gold-950 px-6"
    >
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center max-w-md"
      >
        <!-- Decorative accent -->
        <div class="w-16 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-8" />

        <p class="text-xs uppercase tracking-[0.3em] text-gold-500 mb-4">
          Heads up
        </p>
        <h2 class="font-display text-2xl md:text-3xl text-gold-300 mb-6">
          Disclaimer
        </h2>
        <p class="text-gold-400/80 leading-relaxed mb-10">
          This is a fictional portfolio created for
          <span class="text-gold-300">roleplaying</span> and
          <span class="text-gold-300">learning purposes</span>.
          All names, images, and content are used in a fictional context
          and do not represent real services or individuals.
        </p>

        <button
          class="btn-gold-solid inline-flex items-center px-10 py-3.5 rounded-lg text-base font-medium transition-all cursor-pointer group"
          @click="enter"
        >
          <span class="mr-2">Enter World</span>
          <Icon name="lucide:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <p class="text-xs text-gold-500/30 mt-6">
          🎵 Audio will play upon entering
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  enter: []
}>()

const { entered } = useBackgroundMedia()

function enter() {
  entered.value = true
  emit('enter')
}
</script>

<style scoped>
.gate-leave-active {
  transition: opacity 0.8s ease;
}
.gate-leave-to {
  opacity: 0;
}
</style>
