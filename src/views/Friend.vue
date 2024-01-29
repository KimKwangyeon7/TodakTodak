<template>
  <div class="friend-list container mt-5">
    <!-- 검색 기능 -->
    <div class="mb-3">
      <input v-model="searchQuery" type="text" class="form-control" placeholder="친구 검색">
    </div>

    <!-- 친구 리스트 -->
    <ul class="list-group">
      <li v-for="friend in filteredFriends" :key="friend.id" class="list-group-item list-group-item-action bg-info text-white d-flex justify-content-between align-items-center" @click="showProfile(friend)">
        <img :src="friend.profilePicture" alt="프로필 이미지" class="profile-image mr-2">
        <span>{{ friend.name }}</span>
      </li>
    </ul>

    <!-- 친구 프로필 모달 -->
    <div v-if="selectedFriend" class="modal fade show" tabindex="-1" role="dialog" @click="resetSelectedFriend">
      <div class="modal-background">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">친구 프로필</h5>
              <button type="button" class="close" data-dismiss="modal" @click="resetSelectedFriend">
                <span>&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p><strong>이름:</strong> {{ selectedFriend.name }}</p>
              <p><strong>나이:</strong> {{ selectedFriend.age }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      friends: [
        { id: 1, name: '김철수', age: 25 },
        { id: 2, name: '김영희', age: 30 },
        { id: 3, name: '김싸피', age: 28 },
      ],
      selectedFriend: null,
    };
  },
  computed: {
    filteredFriends() {
      return this.friends.filter(friend =>
        friend.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    showProfile(friend) {
      this.selectedFriend = friend;
    },
    resetSelectedFriend() {
      this.selectedFriend = null;
    },
  },
};
</script>

<style>
.friend-list {
  max-width: 100%;
  margin: auto;
}

.list-group-item {
  border-color: #9EDBC5;
}

.modal-content {
  background-color: #9EDBC5;
  color: #fff;
}

.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

/* 모달 배경 */
.modal.show {
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.modal-background {
  position: fixed;
  top:0; left: 0; bottom: 0; right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
