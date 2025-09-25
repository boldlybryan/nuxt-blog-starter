<template>
  <div v-if="totalPages > 1" class="mt-12 w-full m-auto">
    <div class="flex gap-2 items-center justify-center min-w-max text-sm">
      <NuxtLink 
        :to="currentPage > 1 ? (currentPage === 2 ? '/' : `/page/${currentPage - 1}`) : '#'" 
        class="px-3 py-1 border rounded whitespace-nowrap flex-shrink-0"
        :class="{ 'opacity-50 cursor-not-allowed pointer-events-none': currentPage <= 1 }"
      >
        ← Previous
      </NuxtLink>
      
      <NuxtLink v-if="startPage > 1" to="/" class="w-10 h-8 border rounded flex items-center justify-center flex-shrink-0">1</NuxtLink>
      <span v-if="startPage > 2" class="px-2 flex-shrink-0">...</span>
      
      <NuxtLink 
        v-for="pageNum in visiblePages" 
        :key="pageNum" 
        :to="pageNum === 1 ? '/' : `/page/${pageNum}`" 
        class="w-10 h-8 border rounded flex items-center justify-center flex-shrink-0" 
        :class="{ 'bg-black text-white': pageNum === currentPage }"
      >
        {{ pageNum }}
      </NuxtLink>
      
      <span v-if="endPage < totalPages - 1" class="px-2 flex-shrink-0">...</span>
      <NuxtLink v-if="endPage < totalPages" :to="`/page/${totalPages}`" class="w-10 h-8 border rounded flex items-center justify-center flex-shrink-0">{{ totalPages }}</NuxtLink>
      
      <NuxtLink 
        :to="currentPage < totalPages ? `/page/${currentPage + 1}` : '#'" 
        class="px-3 py-1 border rounded whitespace-nowrap flex-shrink-0"
        :class="{ 'opacity-50 cursor-not-allowed pointer-events-none': currentPage >= totalPages }"
      >
        Next →
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  currentPage: number
  totalPages: number
  maxVisiblePages?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxVisiblePages: 5
})

const startPage = computed(() => Math.max(1, props.currentPage - Math.floor(props.maxVisiblePages / 2)))
const endPage = computed(() => Math.min(props.totalPages, startPage.value + props.maxVisiblePages - 1))
const adjustedStartPage = computed(() => Math.max(1, endPage.value - props.maxVisiblePages + 1))

const visiblePages = computed(() => {
  const pages: number[] = []
  for (let i = adjustedStartPage.value; i <= endPage.value; i++) {
    pages.push(i)
  }
  return pages
})
</script>
