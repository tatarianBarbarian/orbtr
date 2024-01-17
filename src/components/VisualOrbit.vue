<template>
  <div
    class="orbit"
    :class="`orbit_level_${level}`"
    :style="{ '--orbit-radius': `var(--orbit-l${level})` }"
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
  width: calc(var(--orbit-radius) * 2);
  height: calc(var(--orbit-radius) * 2);
  border: 1px solid white;
  position: absolute;
  z-index: var(--z-index-base);
  left: 50%;
  bottom: 0;
  transform: translateX(-50%) translateY(50%);
  transition:
    width 1s ease,
    height 1s ease,
    opacity 0.3s ease;
  border-radius: 50%;
  background: none;
}

.label {
  display: block;
  position: absolute;
  top: -17px;
  left: 50%;
  padding: 5px;
  max-width: 100%;
  color: var(--color-components-secondary);
  transform: translateX(-50%);
  background: var(--color-bg-opaque);
  text-align: center;
  font-size: 16px;
  z-index: var(--z-index-base);
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
