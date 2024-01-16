<template>
  <SpaceField :loading="state.status === 'loading'">
    <TransitionGroup name="orb" v-if="orbits.list.length > 0">
      <SingleOrbit
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
import SingleOrbit from './components/SingleOrbit.vue'
import SpaceField from './components/SpaceField.vue'
import { useOrbits } from './composables/useOrbits.ts'
import ErrorMessage from './components/ErrorMessage.vue'

const { previousDay, nextDay, orbits, state } = useOrbits()

const onMouseWheel = (e: WheelEvent) => {
  if (e.deltaY > 0) {
    previousDay()
  } else {
    nextDay()
  }
}

onMounted(() => {
  window.addEventListener('wheel', onMouseWheel)
})

onUnmounted(() => {
  window.removeEventListener('wheel', onMouseWheel)
})
</script>

<style scoped></style>
