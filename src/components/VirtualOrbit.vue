<template>
  <div
    class="orbit"
    :class="`orbit_level_${level}`"
    :style="{ '--orbit-radius': `var(--orbit-l${level})` }"
    ref="elementRef"
  >
    <ActivityOrb
      v-for="(activity, index) in activities.array"
      :key="activity.id"
      :rotation="activitiesPositions[index]"
      :activity="activity"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { calculateSpheresRotations } from '@/utils/calculateSpheresRotations.ts'
import ActivityOrb from './ActivityOrb.vue'
import type { DayActivities } from '@/types'

const elementRef = ref<HTMLElement | null>(null)

const props = defineProps<{
  level: number
  activities: DayActivities
}>()

const activitiesPositions = computed(() =>
  calculateSpheresRotations(props.activities.array.length, props.level)
)
</script>

<style scoped>
.orbit {
  position: absolute;
  left: 50%;
  border-radius: 50%;
  transform: translateX(-50%) translateY(50%);
  /* Calculations for orbit */
  width: calc(var(--orbit-radius) * 2);
  height: calc(var(--orbit-radius) * 2);
  bottom: 0;
  transition:
    width 1s ease,
    height 1s ease,
    opacity 0.3s ease;
  background: none;
  z-index: calc(var(--z-above) + var(--z-index-base));
}

.orb-enter-from.orbit_level_1,
.orb-leave-to.orbit_level_1 {
  --orbit-radius: var(--orbit-past) !important;
  opacity: 0;
}

.orb-enter-from.orbit_level_7,
.orb-leave-to.orbit_level_7 {
  --orbit-radius: var(--orbit-future) !important;
  opacity: 0;
}
</style>
