<template>
  <div>
    <nav class="navbar bg-body-tertiary fixed-top">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand mx-auto" href="#">토닥토닥</a>
        <button type="button" class="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNotifications" aria-controls="offcanvasNotifications">
          알림
        </button>
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Todak</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Calendar from '@/views/Calendar.vue'

import { RouterLink, RouterView } from 'vue-router'

export default {
  name: 'Sidebar',
  components: {
    Calendar,
    RouterView,
    RouterLink,
  },
  methods: {
      closeSidebar() {
        console.log('closeSidebar method called');
        this.$root.$emit('bv::toggle::offcanvas', 'offcanvasNavbar');
      },
    },
}
</script>

<style scoped>

</style>