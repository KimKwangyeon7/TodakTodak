// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/Main.vue'
import Goal from '@/views/GoalView.vue'
import GoalList from '@/views/GoalList.vue'
import Board from '@/views/Board.vue'
import Calendar from '@/views/Calendar.vue'
import Friend from '@/views/Friend.vue'
import Meeting from '@/views/Meeting.vue'
import Habit from '@/views/HabitView.vue'
import MyPage from '@/views/MyPage.vue'
import Voice from '@/views/Voice/Voice.vue'
import VoiceTrainer from '@/views/Voice/VoiceTrainer.vue'
import TodoList from '@/views/TodoList.vue'
import CalendarDetail from '@/views/CalendarDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
	{
		name: '',
		path: '/',
		component: Main,
	},
	{
		name: 'main',
		path: '/main',
		component: Main,
	},
	{
		name: 'goal',
		path: '/goal',
		component: Goal,
	},
    {
		name: 'board',
		path: '/board',
		component: Board,
	},
    {
		name: 'calendar',
		path: '/calendar',
		component: Calendar,
	},
    {
		name: 'friend',
		path: '/friend',
		component: Friend,
	},
    {
		name: 'meeting',
		path: '/meeting',
		component: Meeting,
	},
	{
		name: 'habit',
		path: '/habit',
		component: Habit,
	},
	{
		name: 'mypage',
		path: '/mypage',
		component: MyPage,
	},
	{
		path: '/voice',
		name: 'Voice',
		component: Voice
	},
	{
		path: '/voice/trainer',
		name: 'VoiceTrainer',
		component: VoiceTrainer
	},
	{
		path: '/calendar-detail/:selectedDate',
		name: 'CalendarDetail',
		component: CalendarDetail
	},
	{
		path: '/goallist',
		name: 'GoalList',
		component: GoalList
	},
  
  ]
})


export default router
