<template>
  <div class="min-h-screen text-gold-400">
    <!-- Background Video -->
    <video
      ref="bgVideo"
      muted
      loop
      autoplay
      playsinline
      class="video-background"
    >
      <source src="/bg-vid.mp4" type="video/mp4">
    </video>

    <!-- Dark overlay for readability -->
    <div class="video-overlay" />

    <!-- Background Audio -->
    <audio ref="bgMusic" loop>
      <source src="/bg-music.mp3" type="audio/mpeg">
    </audio>

    <!-- Enter Gate (with disclaimer) -->
    <EnterGate @enter="onEnter" />

    <!-- Main Content -->
    <Transition name="content-fade">
      <div v-if="entered" class="relative z-10">
        <Navbar />
        <main>
          <slot />
        </main>
        <Footer />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const bgMusic = ref<HTMLAudioElement>()
const bgVideo = ref<HTMLVideoElement>()
const { entered, musicPlaying } = useBackgroundMedia()

function onEnter() {
  // Start music with fade-in
  if (bgMusic.value) {
    bgMusic.value.volume = 0
    bgMusic.value.play()
    fadeInAudio(bgMusic.value, 0.15, 3000)
    musicPlaying.value = true
  }
  // Ensure video is playing
  bgVideo.value?.play()
}

function fadeInAudio(audio: HTMLAudioElement, targetVolume: number, duration: number) {
  const steps = 30
  const stepTime = duration / steps
  const volumeStep = targetVolume / steps
  let currentStep = 0

  const interval = setInterval(() => {
    currentStep++
    audio.volume = Math.min(volumeStep * currentStep, targetVolume)
    if (currentStep >= steps) clearInterval(interval)
  }, stepTime)
}

// Music toggle for MusicToggle component
function toggleMusic() {
  if (!bgMusic.value) return
  if (musicPlaying.value) {
    bgMusic.value.pause()
    musicPlaying.value = false
  } else {
    bgMusic.value.play()
    musicPlaying.value = true
  }
}

provide('toggleMusic', toggleMusic)
</script>
