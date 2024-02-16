<script setup>
defineProps({ chatRoom: Object });
</script>

<template>
  <tr class="text-center">
    <th scope="row">{{ chatRoom.roomId }}</th>
    <td class="text-start">
      <router-link
        :to="{
          name: 'chatRoom-view',
          params: { roomid: chatRoom.roomId },
        }"
        class="chatRoom-title link-dark"
      >
        {{ chatRoom.title }}
      </router-link>
    </td>
    <td>{{ chatRoom.sender }}</td>
  </tr>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
