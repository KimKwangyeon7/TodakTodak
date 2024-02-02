<template>
    <p>State: {{ connected }} {{ id }}</p>
</template>

<script setup>
import { connected, id } from '@/socket.js'

</script>

<style scoped>

</style>