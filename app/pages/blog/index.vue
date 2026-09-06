<template>
  <div class="min-h-screen pt-28 pb-20 px-6">
    <div class="max-w-4xl mx-auto">
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        <SectionHeading label="Blog">
          Thoughts &amp; Process
        </SectionHeading>
      </div>

      <div v-if="posts?.length" class="space-y-8">
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

      <p v-else class="text-gold-400/60 text-center py-12">
        No posts yet — check back soon!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('all-posts', () =>
  queryCollection('blog').order('date', 'DESC').all(),
)

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
