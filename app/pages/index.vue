<template>
  <div>
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center px-6 pt-20">
      <div class="max-w-6xl mx-auto w-full">
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
          What's up!<br />
          I'm <span class="text-gold-500 italic">Yuki</span>,<br />
          your personal designer.
        </h1>

        <p
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 600 } }"
          class="text-lg md:text-xl text-gold-400/80 max-w-2xl leading-relaxed mb-10"
        >
          I am a software engineering student, but I focus on designs and
          publications. I write about creativity, process, and the things
          that inspire me.
        </p>

        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 800 } }"
          class="flex gap-4"
        >
          <NuxtLink
            to="#latest"
            class="btn-gold-solid inline-flex items-center px-8 py-3 rounded-lg text-sm font-medium transition-colors"
          >
            Read the Blog
          </NuxtLink>
          <NuxtLink
            to="#contact"
            class="btn-gold-outline inline-flex items-center px-8 py-3 rounded-lg text-sm font-medium transition-colors"
          >
            Get in Touch
          </NuxtLink>
        </div>

        <!-- Scroll indicator -->
        <div
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { duration: 600, delay: 1200 } }"
          class="mt-24 flex items-center gap-3 text-gold-500/40"
        >
          <div class="w-px h-12 bg-gold-500/30 animate-pulse" />
          <span class="text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </div>
    </section>

    <!-- Latest Posts Section -->
    <section id="latest" class="py-32 px-6">
      <div class="max-w-4xl mx-auto">
        <SectionHeading label="Blog">
          Latest Posts
        </SectionHeading>

        <div v-if="posts?.length" class="space-y-6">
          <NuxtLink
            v-for="(post, i) in posts"
            :key="post.path"
            :to="post.path"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: i * 100 } }"
            class="block group p-8 rounded-2xl border border-gold-500/10 hover:border-gold-500/25 hover:bg-gold-500/[0.03] transition-all duration-300"
          >
            <div class="flex items-center gap-3 mb-3">
              <time class="text-xs text-gold-500/60 uppercase tracking-wider">
                {{ formatDate(post.date) }}
              </time>
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="text-xs px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-500"
              >
                {{ tag }}
              </span>
            </div>
            <h2 class="font-display text-2xl text-gold-300 group-hover:text-gold-500 transition-colors mb-2">
              {{ post.title }}
            </h2>
            <p class="text-gold-400/60 leading-relaxed">
              {{ post.description }}
            </p>
            <span class="inline-block mt-4 text-sm text-gold-500/60 group-hover:text-gold-500 transition-colors">
              Read more →
            </span>
          </NuxtLink>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0 }"
          :visible-once="{ opacity: 1, transition: { duration: 400, delay: 400 } }"
          class="mt-12 text-center"
        >
          <NuxtLink
            to="/blog"
            class="btn-gold-outline inline-flex items-center px-8 py-3 rounded-lg text-sm font-medium transition-colors"
          >
            View All Posts
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-32 px-6 border-t border-gold-500/10">
      <div class="max-w-6xl mx-auto">
        <SectionHeading label="About Me">
          The Person Behind the Words
        </SectionHeading>

        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div
            v-motion
            :initial="{ opacity: 0, x: -40 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 600 } }"
          >
            <img
              src="/yuki-morales.png"
              alt="Yuki Morales"
              class="aspect-square rounded-2xl border border-gold-500/10 object-cover w-full"
            />
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, x: 40 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 600, delay: 200 } }"
            class="space-y-6"
          >
            <p class="text-lg text-gold-400/80 leading-relaxed">
              I'm a software engineering student who fell in love with the
              visual side of things. While others were deep in algorithms,
              I was obsessing over typography, color theory, and layouts.
            </p>
            <p class="text-lg text-gold-400/80 leading-relaxed">
              I create content around design, creativity, and the process
              behind making things look and feel right. This space is where
              I share what I learn, what inspires me, and the occasional
              deep dive into topics I care about.
            </p>
            <div class="flex flex-wrap gap-3 pt-4">
              <span
                v-for="interest in interests"
                :key="interest"
                class="text-xs px-3 py-1.5 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20"
              >
                {{ interest }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-32 px-6 border-t border-gold-500/10">
      <div class="max-w-4xl mx-auto text-center">
        <div
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        >
          <p class="text-sm uppercase tracking-[0.3em] text-gold-500 mb-4">
            Get in Touch
          </p>
          <h2 class="font-display text-4xl md:text-6xl text-gold-300 mb-6">
            Let's create something<br />
            <span class="italic text-gold-500">beautiful</span> together.
          </h2>
          <p class="text-lg text-gold-400/60 mb-10 max-w-xl mx-auto">
            Have an idea, a collaboration, or just want to say hi? I'd love
            to hear from you.
          </p>
          <a
            href="https://www.facebook.com/ur.yuki.morales/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-gold-solid inline-flex items-center px-10 py-3.5 rounded-lg text-base font-medium transition-colors"
          >
            <Icon name="simple-icons:facebook" class="w-5 h-5 mr-2" />
            Say Hello!
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('latest-posts', () =>
  queryCollection('blog').order('date', 'DESC').limit(6).all(),
)

const interests = [
  'Design',
  'Typography',
  'Content Creation',
  'Publications',
  'Visual Storytelling',
  'Creative Process',
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
