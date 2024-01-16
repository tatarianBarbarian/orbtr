<template>
  <div class="sphere" :style="{ '--rotation': `${rotation}deg` }">
    <div class="pfp" @mouseenter="onPfpMouseOver" @mouseleave="onPfpMouseLeave">
      <ProfilePic :src="activity.img" :name="activity.name" ref="anchor" />
    </div>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <ActivityCard
        v-if="isCardVisible"
        :activity="activity"
        :style="floatingStyles"
        ref="popover"
        @mouseenter="onPfpMouseOver"
        @mouseleave="onPfpMouseLeave"
      />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, type Ref, type ComponentPublicInstance } from 'vue'
import ProfilePic from './ProfilePic.vue'
import { useFloating, flip, shift, offset, autoUpdate } from '@floating-ui/vue'
import ActivityCard from './ActivityCard/ActivityCard.vue'
import type { Activity } from '@/types'

defineProps<{ activity: Activity; rotation: number }>()

const anchor: Ref<null | ComponentPublicInstance> = ref(null)
const popover: Ref<null | ComponentPublicInstance> = ref(null)

const { floatingStyles } = useFloating(
  computed(() => anchor.value?.$el ?? null),
  computed(() => popover.value?.$el ?? null),
  {
    placement: 'right-end',
    middleware: [offset({ mainAxis: -75, crossAxis: 30 }), flip(), shift()],
    whileElementsMounted: autoUpdate
  }
)

const isCardVisible = ref(false)
let hideTimeout: number // needed to avoid flickering when pointer goes to popover from profile pic

const onPfpMouseOver = () => {
  clearTimeout(hideTimeout)
  isCardVisible.value = true
}
const onPfpMouseLeave = () => {
  clearTimeout(hideTimeout)
  hideTimeout = setTimeout(() => {
    isCardVisible.value = false
  }, 100)
}
</script>

<style scoped>
.sphere {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid black;
  position: absolute;
  left: 50%;
  box-sizing: border-box;
  top: -30px;
  /* Placing sphere */
  transform: rotate(var(--rotation)) translateX(-50%);
  transform-origin: 0 calc(var(--radius) + 30px);
  box-shadow: 0px 0px 0px 10px var(--color-bg-opaque);
  transition: all 1s ease;
  --z-index-sphere: calc(var(--z-above) + var(--z-index-base));
  z-index: var(--z-index-sphere);
  isolation: isolate;
}

.pfp {
  transform: rotate(calc(-1 * var(--rotation)));
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
