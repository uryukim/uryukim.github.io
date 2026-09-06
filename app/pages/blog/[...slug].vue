<template>
  <div class="min-h-screen pt-28 pb-20 px-6">
    <article class="max-w-3xl mx-auto">
      <ContentRenderer
        v-if="page"
        :value="page"
      >
        <template #default="{ value }">
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            class="mb-12"
          >
            <NuxtLink
              to="/blog"
              class="text-sm text-gold-500 hover:text-gold-300 transition-colors mb-8 inline-block"
            >
              ← Back to Blog
            </NuxtLink>
            <time class="block text-sm text-gold-500/60 uppercase tracking-wider mb-4">
              {{ formatDate(page.date) }}
            </time>
            <h1 class="font-display text-4xl md:text-5xl text-gold-300 leading-tight mb-4">
              {{ page.title }}
            </h1>
            <p v-if="page.description" class="text-lg text-gold-400/60">
              {{ page.description }}
            </p>
          </div>

          <div class="prose-gold">
            <ContentRendererMarkdown :value="value" />
          </div>
        </template>
      </ContentRenderer>
    </article>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(
  `blog-${route.path}`,
  () => queryCollection('blog').path(route.path).first(),
)

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
.prose-gold :deep(h2) {
  font-family: 'Playfair Display', ui-serif, Georgia, serif;
  color: var(--color-gold-300);
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}
.prose-gold :deep(h3) {
  font-family: 'Playfair Display', ui-serif, Georgia, serif;
  color: var(--color-gold-300);
  font-size: 1.25rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
.prose-gold :deep(p) {
  color: color-mix(in srgb, var(--color-gold-400) 80%, transparent);
  line-height: 1.75;
  margin-bottom: 1rem;
}
.prose-gold :deep(a) {
  color: var(--color-gold-500);
  transition: color 0.2s;
}
.prose-gold :deep(a:hover) {
  color: var(--color-gold-300);
}
.prose-gold :deep(strong) {
  color: var(--color-gold-300);
}
.prose-gold :deep(blockquote) {
  border-left: 2px solid color-mix(in srgb, var(--color-gold-500) 30%, transparent);
  color: color-mix(in srgb, var(--color-gold-400) 60%, transparent);
  font-style: italic;
  padding-left: 1rem;
  margin: 1.5rem 0;
}
.prose-gold :deep(code) {
  color: var(--color-gold-500);
  background: color-mix(in srgb, var(--color-gold-500) 10%, transparent);
  border-radius: 0.25rem;
  padding: 0.125rem 0.375rem;
}
.prose-gold :deep(ul) {
  list-style: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
.prose-gold :deep(ul li) {
  color: color-mix(in srgb, var(--color-gold-400) 80%, transparent);
  line-height: 1.75;
  margin-bottom: 0.25rem;
}
.prose-gold :deep(ul li::marker) {
  color: color-mix(in srgb, var(--color-gold-500) 40%, transparent);
}
.prose-gold :deep(hr) {
  border-color: color-mix(in srgb, var(--color-gold-500) 15%, transparent);
  margin: 2rem 0;
}
</style>
