<template>
  <div @click="enterMeetingRoom">
    <div class="room-card">
      <h4>{{ room.title }}</h4><hr>
      <p>현재 참여 멤버 수: {{ room.currentMembers }}</p><hr>
      <p>방 생성 시간: {{ formatCreationTime }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps(['room'])

const formatCreationTime = computed(() => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
  return new Date(props.room.creationTime).toLocaleDateString('ko-KR', options)
})

const enterMeetingRoom = () => {
  emit('enterMeetingRoom', room.id)
}
</script>

<style scoped>
.room-card {
  padding: 10px;
  margin: 10px;
  border-radius: 15px;
  background-color: #EAF3F9;
}

.room-card h4 {
  margin-top: 5px;
}

.room-card p {
  margin: 0;
}
</style>
