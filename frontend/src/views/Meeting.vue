<template>
  <div class="container mt-5">

    <!-- 검색 기능 -->
    <div class="form-group">
      <input v-model="searchKeyword" type="text" class="form-control" placeholder="모임 방 검색">
    </div>

    <!-- 모임 방 리스트 -->
    <div v-if="filteredRooms.length > 0">
      <RoomCard v-for="room in filteredRooms" :key="room.id" :room="room" />
    </div>
    <div v-else>
      <p>검색 결과가 없습니다.</p>
    </div>

    <!-- 방 생성 버튼 -->
    <button class="btn btn-primary mt-3" @click="showCreateRoomModal">모임 방 추가</button>

    <!-- 방 생성 모달 -->
    <CreateRoomModal v-if="showModal" @close="closeCreateRoomModal" @create="createRoom" />

  </div>
</template>

<script>
import CreateRoomModal from '@/components/CreateRoomModal.vue'; // CreateRoomModal 컴포넌트를 import

export default {
  components: {
    CreateRoomModal, // CreateRoomModal 컴포넌트를 등록
  },
  data() {
    return {
      rooms: [
        { id: 1, title: '모임 방 1', currentMembers: 5, creationTime: new Date() },
        { id: 2, title: '모임 방 2', currentMembers: 3, creationTime: new Date() },
        // 기본적인 데이터 예시, 실제 데이터는 백엔드에서 받아오거나 필요에 따라 수정
      ],
      newRoom: {
        title: '',
        // 추가 필드 및 초기값은 필요에 따라 구현
      },
      showModal: false,
      searchKeyword: '',
    };
  },
  computed: {
    filteredRooms() {
      // 검색 기능 구현
      const keyword = this.searchKeyword.toLowerCase();
      return this.rooms.filter(room => room.title.toLowerCase().includes(keyword));
    },
  },
  methods: {
    showCreateRoomModal() {
      // 방 생성 모달 열기
      this.showModal = true;
    },
    closeCreateRoomModal() {
      // 방 생성 모달 닫기
      this.showModal = false;
    },
    createRoom() {
      // 방 생성 로직 구현 (필요에 따라 백엔드 API 호출 등)
      // 생성 후 모달 닫기 등의 로직 추가
      this.rooms.push({
        id: this.rooms.length + 1,
        title: this.newRoom.title,
        currentMembers: 0, // 새로 생성된 방은 초기 인원 0명으로 설정
        creationTime: new Date(),
      });
      this.newRoom.title = ''; // 폼 초기화
      this.closeCreateRoomModal();
    },
  },
};
</script>
