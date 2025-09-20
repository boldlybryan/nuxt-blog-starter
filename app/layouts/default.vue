<template>
  <div class="max-w-xl mx-auto p-3 flex flex-col min-h-screen">
    <Header/>
    <main class="flex-1">
      <slot />
    </main>
    <Footer/>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>