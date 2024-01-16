<template>
  <img
    :src="src"
    :alt="'Photo of ' + name"
    :class="{ 'size-m': size === 'm', 'size-s': size === 's' }"
  />
</template>

<script setup lang="ts">
defineProps<{ src: string; name: string; size?: 's' | 'm' }>()
</script>

<style scoped>
img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  background: linear-gradient(to bottom, white, black) border-box;
  border: 1px solid transparent;
  box-sizing: border-box;
}

.size-m {
  width: 100px;
  height: 100px;
}

.size-s {
  width: 20px;
  height: 20px;
}
</style>
