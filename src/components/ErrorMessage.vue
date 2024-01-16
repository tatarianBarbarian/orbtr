<template>
  <div class="error-message">
    <p>{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ error: Error | null }>()
</script>

<style>
.error-message {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
