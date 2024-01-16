<template>
  <article class="card">
    <ActivityCardProfile :name="name" :position="position" :city="city" :img="img" />
    <ActivityCardMessage
      :text="activity._orbits_last_message.message"
      :title="activity._orbits_last_message.message_head"
      :date="activity.created_at"
      :from="activity.name"
    />
  </article>
</template>

<script setup lang="ts">
import type { Activity } from '@/types'

import ActivityCardMessage from './ActivityCardMessage.vue'
import ActivityCardProfile from './ActivityCardProfile.vue'

const { activity } = defineProps<{ activity: Activity }>()
const { name, position, city, img } = activity
</script>

<style scoped>
.card {
  width: 502px;
  border-radius: 10px;
  z-index: var(--z-index-top);
  font-size: 12px;
  line-height: 14.52px;

  background:
    linear-gradient(to bottom, #191919, #191919) padding-box,
    linear-gradient(to bottom, #b5b5b5, #2c2c2c) border-box;
  border: 1px solid transparent;

  overflow: hidden;
}
</style>
