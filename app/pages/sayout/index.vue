<script lang="ts" setup>
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://omoadmnnzqnbvqvqksqp.supabase.co',
  'sb_publishable_XjochyR8bdRREnlaY4M4Pw_uRlcwvuY'
)

const message = ref('')
const sent = ref(false)
const sending = ref(false)
const error = ref('')
const charLimit = 1000

async function sendMessage() {
  const trimmed = message.value.trim()
  if (!trimmed) return
  if (trimmed.length > charLimit) {
    error.value = `Message must be under ${charLimit} characters.`
    return
  }

  error.value = ''
  sending.value = true

  const { error: dbError } = await supabase
    .from('messages')
    .insert({ content: trimmed })

  sending.value = false

  if (dbError) {
    error.value = 'Something went wrong. Please try again.'
    console.error(dbError)
    return
  }

  sent.value = true
  message.value = ''
}

function sendAnother() {
  sent.value = false
  error.value = ''
}

useHead({
  title: 'Say Something — Yuki',
  meta: [
    { name: 'description', content: 'Send Yuki an anonymous message.' },
  ],
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-6 py-20">
    <!-- Back link -->
    <div class="w-full max-w-md mb-8">
      <NuxtLink
        to="/"
        class="text-sm text-gold-500/60 hover:text-gold-500 transition-colors inline-flex items-center gap-1"
      >
        <Icon name="lucide:arrow-left" class="w-4 h-4" />
        Back to site
      </NuxtLink>
    </div>

    <div
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      class="w-full max-w-md"
    >
      <!-- Header -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/20 mb-5">
          <Icon name="lucide:message-circle" class="w-7 h-7 text-gold-500" />
        </div>
        <h1 class="font-display text-3xl md:text-4xl text-gold-300 mb-3">
          Say something to <span class="text-gold-500 italic">Yuki</span>
        </h1>
        <p class="text-gold-400/60">
          Send me an anonymous message — I won't know who sent it!
        </p>
      </div>

      <!-- Message Form -->
      <div
        v-if="!sent"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
        class="space-y-4"
      >
        <div class="relative">
          <textarea
            v-model="message"
            placeholder="Type your message here..."
            rows="5"
            :maxlength="charLimit"
            class="w-full px-4 py-3 rounded-xl bg-gold-950/60 border border-gold-500/15 text-gold-300 placeholder-gold-500/30 focus:outline-none focus:border-gold-500/40 focus:ring-1 focus:ring-gold-500/20 resize-none transition-all"
          />
          <span class="absolute bottom-3 right-3 text-xs text-gold-500/30">
            {{ message.length }}/{{ charLimit }}
          </span>
        </div>

        <p v-if="error" class="text-sm text-red-400">
          {{ error }}
        </p>

        <button
          :disabled="!message.trim() || sending"
          class="btn-gold-solid w-full py-3 rounded-xl text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          @click="sendMessage"
        >
          <Icon v-if="sending" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
          <Icon v-else name="lucide:send" class="w-4 h-4" />
          {{ sending ? 'Sending...' : 'Send Anonymously' }}
        </button>

        <p class="text-center text-xs text-gold-500/30 mt-2">
          🔒 Your identity is completely hidden. Not even I can see who sent it.
        </p>
      </div>

      <!-- Success State -->
      <div
        v-else
        v-motion
        :initial="{ opacity: 0, scale: 0.95 }"
        :enter="{ opacity: 1, scale: 1, transition: { duration: 400 } }"
        class="text-center space-y-6 py-8"
      >
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-500/15 border border-gold-500/25">
          <Icon name="lucide:check" class="w-8 h-8 text-gold-500" />
        </div>
        <div>
          <h2 class="font-display text-2xl text-gold-300 mb-2">Message sent!</h2>
          <p class="text-gold-400/60">Your anonymous message has been delivered.</p>
        </div>
        <button
          class="btn-gold-outline px-8 py-3 rounded-xl text-sm font-medium transition-colors"
          @click="sendAnother"
        >
          Send another message
        </button>
      </div>
    </div>

    <!-- Footer -->
    <p
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { duration: 400, delay: 600 } }"
      class="mt-16 text-xs text-gold-500/20"
    >
      Powered by curiosity ✨
    </p>
  </div>
</template>
