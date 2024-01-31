// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/Main.vue'
import TodoList from '@/views/TodoList.vue'
import GoalList from '@/views/GoalList.vue'
import MyPage from '@/views/MyPage.vue'
import Calendar from '@/views/Calendar.vue'
import CalendarDetail from '@/views/CalendarDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/todolist',
    name: 'TodoList',
    component: TodoList
  },
  {
    path: '/goallist',
    name: 'GoalList',
    component: GoalList
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/calendar/calendarDetail', // 추후 바꿀 예정
    name: 'CalendarDetail',
    component: CalendarDetail
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
