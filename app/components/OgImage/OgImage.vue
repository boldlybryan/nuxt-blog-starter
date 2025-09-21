<template>
  <div class="flex flex-col justify-between gap-8 w-full h-full bg-gray-950 p-8">
    <div class="flex">
      <div class="text-2xl text-gray-400">
        {{ siteName }}
      </div>
    </div>
    <div class="flex flex-col items-end justify-between">
      <div class="text-4xl font-bold text-white mb-2 leading-tight">
        {{ title }}
      </div>
      <div v-if="description" class="text-2xl font-normal text-gray-300 leading-relaxed">
        {{ description }}
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