import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/Main.vue'
import Board from '@/views/Board.vue'
import Calendar from '@/views/Calendar.vue'
import Friend from '@/views/Friend.vue'
import Meeting from '@/views/Meeting.vue'
import MyPage from '@/views/MyPage.vue'
import Voice from '@/views/Voice/Voice.vue'
import VoiceTrainer from '@/views/Voice/VoiceTrainer.vue'

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
	}
  ]
})


export default router
