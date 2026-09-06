<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-[100] flex items-center justify-center px-6"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-gold-950/90 backdrop-blur-sm"
          @click="dismiss"
        />

        <!-- Modal -->
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.95, y: 20 }"
          :enter="{ opacity: 1, scale: 1, y: 0, transition: { duration: 400, ease: 'easeOut' } }"
          class="relative max-w-lg w-full bg-gold-950 border border-gold-500/20 rounded-2xl p-8 md:p-10 shadow-2xl shadow-gold-500/5"
        >
          <!-- Decorative accent -->
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

          <div class="text-center">
            <p class="text-xs uppercase tracking-[0.3em] text-gold-500 mb-4">
              Heads up
            </p>
            <h2 class="font-display text-2xl md:text-3xl text-gold-300 mb-6">
              Disclaimer
            </h2>
            <p class="text-gold-400/80 leading-relaxed mb-8">
              This is a fictional portfolio created for
              <span class="text-gold-300">roleplaying</span> and
              <span class="text-gold-300">learning purposes</span>.
              All names, images, and content are used in a fictional context
              and do not represent real services or individuals.
            </p>

            <button
              class="btn-gold-solid inline-flex items-center px-10 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              @click="dismiss"
            >
              I Understand
            </button>

            <p class="text-xs text-gold-500/40 mt-4">
              This notice will only appear once.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const show = ref(false)

onMounted(() => {
  if (!localStorage.getItem('disclaimer-accepted')) {
    show.value = true
  }
})

function dismiss() {
  show.value = false
  localStorage.setItem('disclaimer-accepted', 'true')
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
