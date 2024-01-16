<template>
  <div
    class="orbit"
    :class="`orbit_level_${level}`"
    :style="{ '--radius': `var(--orbit-l${level})` }"
    ref="elementRef"
  >
    <span class="label" v-if="level === 1">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Activity } from '@/types'
import dayjs from 'dayjs'


type Activities = {
  array: Activity[]
  contact_date: string
}

const props = defineProps<{
  level: number
  activities: Activities
}>()

const label = computed(() => dayjs(props.activities.contact_date).format('ddd MMM D'))
</script>

<style scoped>
.orbit {
  border: 1px solid white;

  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(50%);
  /* Calculations for orbit */
  --radius: var(--z-index-orbit-l1); /* Default */
  width: calc(var(--radius) * 2);
  height: calc(var(--radius) * 2);
  bottom: 0;
  transition: width 1s ease, height 1s ease, opacity 0.3s ease;
  background: none;
  z-index: var(--z-index-base);
}

.label {
  position: absolute;
  top: -17px;
  color: var(--color-components-secondary);
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-bg-opaque);
  display: block;
  max-width: 100%;
  text-align: center;
  font-size: 16px;
  padding: 5px;
  z-index: var(--z-index-base);
}

.orb-enter-from.orbit_level_1,
.orb-leave-to.orbit_level_1 {
  --radius: var(--orbit-past) !important;
  opacity: 0;
}

.orb-enter-from.orbit_level_7,
.orb-leave-to.orbit_level_7 {
  --radius: var(--orbit-future) !important;
  opacity: 0;
}

</style>

<style>
:root {
  --orbit-future: 120px;
  --orbit-base: 24vh;
  --orbit-l7: calc(var(--orbit-base) * 1);
  --orbit-l6: calc(var(--orbit-base) * 1.5);
  --orbit-l5: calc(var(--orbit-base) * 2);
  --orbit-l4: calc(var(--orbit-base) * 2.5);
  --orbit-l3: calc(var(--orbit-base) * 3);
  --orbit-l2: calc(var(--orbit-base) * 3.5);
  --orbit-l1: calc(var(--orbit-base) * 4);
  --orbit-past: 2000px;

  --z-index-orbit-l0: var(--z-index-base);
  --z-index-orbit-l1: calc(var(--z-above) + var(--z-index-orbit-l0));
  --z-index-orbit-l2: calc(var(--z-above) + var(--z-index-orbit-l1));
  --z-index-orbit-l3: calc(var(--z-above) + var(--z-index-orbit-l2));
  --z-index-orbit-l4: calc(var(--z-above) + var(--z-index-orbit-l3));
  --z-index-orbit-l5: calc(var(--z-above) + var(--z-index-orbit-l4));
  --z-index-orbit-l6: calc(var(--z-above) + var(--z-index-orbit-l5));
  --z-index-orbit-l7: calc(var(--z-above) + var(--z-index-orbit-l6));
  --z-index-orbit-l8: calc(var(--z-above) + var(--z-index-orbit-l6));
}
</style>
