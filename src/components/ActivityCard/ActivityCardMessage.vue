<template>
  <div class="content">
    <header class="content-header">
      <IconMail />
      <span>Reply from {{ from }}</span>
    </header>
    <main class="content-body">
      <div class="time">
        <span>{{ messageDate }}</span>
        <span>{{ relativeDate }}</span>
      </div>
      <p class="title">{{ title }}</p>
      <div class="text">
        <Transition name="fade">
          <p v-if="isCollapsed" class="collapsed">{{ text }}</p>
        </Transition>
        <Transition name="fade">
          <p v-if="!isCollapsed">{{ text }}</p>
        </Transition>
      </div>
      <button
        @click="isCollapsed = !isCollapsed"
        class="expand-button"
        :class="{ 'expand-button_state_expanded': !isCollapsed }"
      >
        {{ isCollapsed ? 'More' : 'Less' }}
        <IconChevronDown />
      </button>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconChevronDown from '../icons/IconChevronDown.vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/en'

import { computed } from 'vue'
import IconMail from '../icons/IconMail.vue'

dayjs.extend(relativeTime)
dayjs.locale('en')

const relativeDate = computed(() => dayjs(date).fromNow())
const messageDate = computed(() => dayjs(date).format('dddd, MMMM D YYYY [at] h:mm A [EST]'))

const { date, from, text, title } = defineProps<{
  date: number
  from: string
  title: string
  text: string
}>()
const isCollapsed = ref(true)
</script>

<style scoped>
.content {
  background: #191919;
  padding: 10px;
}

.content-header {
  background: var(--color-black-65);
  padding: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.content-body {
  font-size: 16px;
  line-height: 19px;
  background-color: var(--color-cards-base);
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.time {
  color: var(--color-components-secondary);
  font-size: 14px;
  line-height: 17px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.title {
  font-weight: bold;
  margin-bottom: 5px;
}
.collapsed {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text {
  margin-bottom: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-leave-active {
  position: absolute;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.expand-button {
  background: none;
  border: none;
  color: inherit;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.expand-button svg {
  transition: transform 0.2s ease;
}

.expand-button_state_expanded svg {
  transform: rotate(180deg);
}
</style>
