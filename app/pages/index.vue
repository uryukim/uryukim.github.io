<template>
  <div class="h-[calc(100vh-80px)] overflow-hidden flex items-center justify-center px-6">
    <div class="text-center max-w-2xl">
      <div
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
      >
        <p class="text-sm uppercase tracking-[0.3em] text-gold-500 mb-6">
          Content Creator &amp; Designer
        </p>
      </div>

      <h1
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
        class="font-display text-5xl md:text-7xl lg:text-8xl text-gold-300 leading-tight mb-8"
      >
        Hey! I'm<br />
        <span class="text-gold-500 italic">Yuki</span>.
      </h1>

      <p
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 600 } }"
        class="text-lg md:text-xl text-gold-400/70 max-w-xl mx-auto leading-relaxed mb-10"
      >
        Designer, content creator, and visual storyteller.
        I write about creativity, process, and the things that inspire me.
      </p>

      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 800 } }"
        class="flex flex-wrap items-center justify-center gap-4"
      >
        <NuxtLink
          to="/blog"
          class="btn-gold-solid inline-flex items-center px-8 py-3 rounded-lg text-sm font-medium transition-colors"
        >
          Read the Blog
        </NuxtLink>
        <NuxtLink
          to="/sayout"
          class="btn-gold-outline inline-flex items-center px-8 py-3 rounded-lg text-sm font-medium transition-colors"
        >
          <Icon name="lucide:message-circle" class="w-4 h-4 mr-2" />
          Say Something
        </NuxtLink>
        <a
          href="https://www.facebook.com/ur.yuki.morales/"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-gold-outline inline-flex items-center px-8 py-3 rounded-lg text-sm font-medium transition-colors"
        >
          <Icon name="simple-icons:facebook" class="w-4 h-4 mr-2" />
          Let's chat on Facebook!
        </a>
      </div>

    </div>
  </div>
</template>
