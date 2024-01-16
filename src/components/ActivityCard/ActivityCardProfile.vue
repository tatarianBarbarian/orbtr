<template>
  <div class="profile">
    <ProfilePic :name="name" :src="img" size="m" />
    <div class="info">
      <span class="name">{{ name }}</span>
      <span>{{ position }}</span>
      <span>{{ city }}</span>
      <div class="mutuals">
        <div class="mutuals-avatars">
          <ProfilePic size="s" :src="avatarStub1" name="Stub 1" class="mutuals-pfp" />
          <ProfilePic size="s" :src="avatarStub2" name="Stub 2" class="mutuals-pfp" />
          <ProfilePic size="s" :src="avatarStub3" name="Stub 3" class="mutuals-pfp" />
          <ProfilePic size="s" :src="avatarStub4" name="Stub 4" class="mutuals-pfp" />
        </div>
        <span class="mutuals-text"
          >Jason Diamond, John Eremic, and 281 other mutual connections</span
        >
      </div>
    </div>
    <button class="logo-button"></button>
  </div>
</template>

<script setup lang="ts">
import type { Activity } from '@/types'
import ProfilePic from '../ProfilePic.vue'

import avatarStub1 from '@/assets/avatar-stub-1.png'
import avatarStub2 from '@/assets/avatar-stub-2.png'
import avatarStub3 from '@/assets/avatar-stub-3.png'
import avatarStub4 from '@/assets/avatar-stub-4.png'

defineProps<Pick<Activity, 'name' | 'position' | 'city' | 'img'>>()
</script>

<style scoped>
.profile {
  display: grid;
  grid-template-columns: 100px auto 50px;
  gap: 15px;
  align-items: center;
  background-color: var(--color-bg-opaque);
  margin-bottom: 10px;
  padding: 10px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.name {
  font-size: 16px;
  line-height: 19.36px;
  font-weight: bold;
}

.mutuals {
  display: grid;
  grid-template-columns: 80px auto;
  align-items: center;
}

.mutuals-avatars {
  display: flex;
}

.mutuals-text {
  margin-left: -8px;
}

.mutuals-pfp:nth-child(2) {
  transform: translateX(-6px);
}

.mutuals-pfp:nth-child(3) {
  transform: translateX(-12px);
}

.mutuals-pfp:nth-child(4) {
  transform: translateX(-18px);
}

.logo-button {
  width: 50px;
  height: 50px;
  margin: 0;
  padding: 0;
  display: inline-flex;
  margin-bottom: auto;
  background:
    url('../../assets/logo-square.png') no-repeat center padding-box,
    linear-gradient(to bottom, #b5b5b5, #2c2c2c) border-box;

  border: 1px solid transparent;
  border-radius: 4px;
}

.logo-button:hover {
  background:
    url('../../assets/logo-square.png') no-repeat center padding-box,
    linear-gradient(to bottom, white, white) border-box;

  border-width: 2px;
}
</style>
