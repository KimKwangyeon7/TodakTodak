// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/Main.vue'
import GoalList from '@/views/Goal/GoalList.vue'
import AddGoal from '@/views/Goal/AddGoal.vue'
import Board from '@/views/Board.vue'
import Calendar from '@/views/Calendar.vue'
import Friend from '@/views/Friend.vue'
import Chat from '@/components/Friend/Chat.vue'
import Meeting from '@/views/Meeting.vue'
import Meet from '@/components/Meeting/MeetingRoom.vue'
import MyPage from '@/views/MyPage.vue'
import MyPageSettings from '@/components/MyPage/MypageSettings.vue'
import UserInfoEdit from '@/components/MyPage/UserInfoEdit.vue'
import Habit from '@/views/Habit/HabitList.vue'
import Voice from '@/views/Voice/Voice.vue'
import VoiceTrainer from '@/views/Voice/VoiceTrainer.vue'
import TodoList from '@/views/Todo/TodoList.vue'
import CalendarDetail from '@/views/CalendarDetail.vue'
import Notification from '@/components/Notifications.vue'
import subscribe from '@/components/subscribe_page.vue'
import pushnotify from '@/components/pushnotify_page.vue'
import FriendProfile from '@/components/Friend/FriendProfile.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'

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
		component: AddGoal,
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
		name: 'chat',
		path: '/chat',
		component: Chat,
	},
    {
		name: 'meeting',
		path: '/meeting',
		component: Meeting,
	},
	{
		name: 'meet',
		path: '/meet',
		component: Meet,
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
		name: 'mypageSettings',
		path: '/mypageSettings',
		component: MyPageSettings,
	},
	{
		name: 'userInfoEdit',
		path: '/userInfoEdit',
		component: UserInfoEdit,
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
	{
		path: '/login',
		name: 'LoginView',
		component: LoginView
	},
	{
		path: '/signup',
		name: 'SignUpView',
		component: SignupView
	}, 
	{
		path: '/subscribe',
		name: 'subscribe',
		component: subscribe
	},
	{
		path: '/pushnotify',
		name: 'pushnotify',
		component: pushnotify
	},
  {
	path: '/friend-profile',
	component: FriendProfile
  },
  {
	path: '/login',
	name: 'LoginView',
	component: LoginView
},
{
	path: '/signup',
	name: 'SignUpView',
	component: SignupView
}, 
	{
		path: '/friend-profile',
		component: FriendProfile
	},
  ]
})


export default router
