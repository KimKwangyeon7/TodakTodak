<template>
    <div class="mt-5">
      <UserInfo :userData="userData" />
    </div>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue';

export default {
components: {
    UserInfo,
},
data() {
    return {
    userData: null,
    };
},
mounted() {
    this.fetchUserData();
},
methods: {
    async fetchUserData() {
    // 사용자 정보를 가져오는 비동기 함수
    // 예: this.userData = await api.getUserData();
    },
}
};
</script>
