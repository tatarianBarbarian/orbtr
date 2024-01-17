<template>
  <SpaceField :loading="state.status === 'loading'">
    <TransitionGroup name="orb" v-if="orbits.list.length > 0">
      <VisualOrbit
        v-for="orbit in orbits.list"
        :key="orbit.activities.contact_date"
        :level="orbit.level"
        :activities="orbit.activities"
      />
    </TransitionGroup>
    <TransitionGroup name="orb" v-if="orbits.list.length > 0">
      <VirtualOrbit
        v-for="orbit in orbits.list"
        :key="orbit.activities.contact_date"
        :level="orbit.level"
        :activities="orbit.activities"
      />
    </TransitionGroup>
    <ErrorMessage v-if="state.status === 'error'" :error="state.error" />
  </SpaceField>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import VisualOrbit from './components/VisualOrbit.vue'
import VirtualOrbit from './components/VirtualOrbit.vue'
import SpaceField from './components/SpaceField.vue'
import { useOrbits } from './composables/useOrbits.ts'
import ErrorMessage from './components/ErrorMessage.vue'
import { throttle } from './utils/throttle'

const { previousDay, nextDay, orbits, state } = useOrbits()

const onMouseWheel = throttle((e: WheelEvent) => {
  if (e.deltaY > 0) {
    previousDay()
  } else {
    nextDay()
  }
}, 1000)

onMounted(() => {
  window.addEventListener('wheel', onMouseWheel)
})

onUnmounted(() => {
  window.removeEventListener('wheel', onMouseWheel)
})
</script>
