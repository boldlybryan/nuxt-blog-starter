<template>
  <div class="flex flex-col justify-between w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 p-16">
    <div class="flex flex-col">
      <div class="text-5xl font-bold text-white mb-8 leading-tight">
        {{ title }}
      </div>
      <div v-if="description" class="text-3xl text-gray-300 leading-relaxed">
        {{ description }}
      </div>
    </div>
    <div class="flex items-end justify-between">
      <div class="text-2xl text-gray-400">
        {{ siteName }}
      </div>
      <div class="text-xl text-gray-500">
        {{ date }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  siteName?: string
  date?: string
}>()
</script>