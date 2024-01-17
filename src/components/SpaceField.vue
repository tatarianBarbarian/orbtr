<template>
  <div class="space">
    <slot />
    <div :class="{ 'splash-active': isFirstLoading }">
      <img
        :src="logo"
        width="75"
        height="75"
        class="logo"
        :class="{ pulsate: loading, loaded: !loading }"
      />
    </div>
    <div class="gradient" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import logo from '../assets/logo.png'

const props = defineProps<{ loading: boolean }>()
const loadingsCount = ref(0)

watch(
  () => props.loading,
  (isLoading) => {
    if (isLoading === false) {
      loadingsCount.value += 1
    }
  }
)

const isFirstLoading = computed(() => loadingsCount.value === 0)
</script>

<style scoped>
.space {
  width: 100%;
  height: 100vh;
  background: var(--color-bg-opaque);
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.logo {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: calc(var(--z-above) + var(--z-index-orbit-l8));
  border-radius: 50%;
  transition: all 0.5s ease;
}

.pulsate {
  animation: pulse-animation 1s ease infinite;
}

@keyframes pulse-animation {
  0% {
    box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.2);
    transform: translateX(-50%) scale(100%);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
    transform: translateX(-50%) scale(105%);
  }
}

.splash-active {
  position: fixed;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: black;
  z-index: var(--z-index-base);
}

.splash-active .logo {
  animation: pulse-animation 1s ease infinite;

  bottom: 50%;
}

.gradient {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50vh;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), var(--color-bg-opaque));
  z-index: var(--z-index-base);
}
</style>
