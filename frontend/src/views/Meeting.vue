<template>
  <div class="container mt-5">
    <div class="meeting-header">
      <div class="meeting">모임</div>
      <div class="meeting-buttons">
        <button class="create-room-button btn" @click="toggleSearch">
          <div class="search"><img src="@/assets/search.png" alt=""></div>
        </button>
        <button class="create-room-button btn" @click="showCreateRoomModal">
          <img src="@/assets/plus.png" alt="">
        </button>
        <CreateRoomModal v-if="showModal" @close="closeCreateRoomModal" @create="createRoom" />
      </div>
    </div>
    
    <div class="form-group" v-show="showSearch">
      <input v-model="searchKeyword" @input="updateFilteredRooms" type="text" class="form-control" placeholder="모임 방 검색">
    </div>

    <div v-if="filteredRooms.length > 0">
      <RoomCard v-for="room in filteredRooms" :key="room.id" :room="room" @enterMeetingRoom="enterMeetingRoom" />
    </div>
    <div v-else>
      <p>검색 결과가 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import RoomCard from '@/components/Meeting/RoomCard.vue'
import CreateRoomModal from '@/components/Meeting/CreateRoomModal.vue'
import router from '@/router';

const rooms = ref([
  { id: 1, title: '코딩 스터디', currentMembers: 5, creationTime: new Date() },
  { id: 2, title: '싸피 스터디', currentMembers: 3, creationTime: new Date() },
  { id: 3, title: 'study with me', currentMembers: 4, creationTime: new Date() },
])

const newRoom = reactive({
  title: '',
})

const showModal = ref(false)
const showSearch = ref(false)
const searchKeyword = ref('')

const filteredRooms = ref([])

const showCreateRoomModal = () => {
  showModal.value = true
  showSearch.value = false
}

const closeCreateRoomModal = () => {
  showModal.value = false
}

const createRoom = () => {
  rooms.value.push({
    id: rooms.value.length + 1,
    title: newRoom.title,
    currentMembers: 0,
    creationTime: new Date(),
  });
  newRoom.title = ''
  closeCreateRoomModal()
};

const updateFilteredRooms = () => {
  const keyword = searchKeyword.value.toLowerCase()
  filteredRooms.value = rooms.value.filter(room => room.title.toLowerCase().includes(keyword))
}

updateFilteredRooms()

watch(searchKeyword, () => {
  updateFilteredRooms()
})

const enterMeetingRoom = (roomId) => {
  router.push(`/meeting-room/${roomId}`)
}

const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (!showSearch.value) {
    searchKeyword.value = ''
    updateFilteredRooms()
  }
}
</script>

<style scoped>
.meeting-header {
  display: flex;
  align-items: center;
}
.meeting-buttons {
  display: flex;
  margin-left: auto;
}

.meeting {
  font-size: 30px;
}

</style>
