// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Main from "@/views/Main.vue";
import AddGoal from "@/components/Goal/AddGoal.vue";
import Board from "@/views/Board.vue";
import Calendar from "@/views/Calendar.vue";
import Friend from "@/views/Friend.vue";
import FriendRequestList from "@/components/Friend/FriendRequestList.vue";
import Meeting from "@/views/Meeting.vue";
import Meet from "@/components/Meeting/MeetingRoom.vue";
import MyPage from "@/views/MyPage.vue";
import MyPageSettings from "@/components/MyPage/MypageSettings.vue";
import UserInfoEdit from "@/components/MyPage/UserInfoEdit.vue";
import Habit from "@/views/Habit.vue";
import TodoList from "@/components/Todo/TodoList.vue";
import HabitList from "@/components/Habit/HabitList.vue";
import CalendarDetail from "@/views/CalendarDetail.vue";
import subscribe from "@/components/subscribe_page.vue";
import pushnotify from "@/components/pushnotify_page.vue";
import FriendProfile from "@/components/Friend/FriendProfile.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
// import Voice from '@/views/Voice.vue'
import Records from "@/views/Record/Record.vue";
// import VoiceTrainer from '@/views/Voice/VoiceTrainer.vue'
import Trainer from "@/views/Record/Trainer.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "",
      path: "/",
      component: Main,
    },
    {
      name: "main",
      path: "/main",
      component: Main,
    },
    {
      name: "todoList",
      path: "/todoList",
      component: TodoList,
    },
    {
      name: "habitList",
      path: "/habitList",
      component: HabitList,
    },
    {
      name: "goal",
      path: "/goal",
      component: AddGoal,
    },
    {
      name: "friend",
      path: "/friend",
      component: Friend,
    },
    {
      name: "friendRequestList",
      path: "/friendRequestList",
      component: FriendRequestList,
    },
    {
      name: "board",
      path: "/board",
      component: Board,
    },
    {
      name: "calendar",
      path: "/calendar",
      component: Calendar,
    },
    {
      name: "friend",
      path: "/friends",
      component: () => import("@/components/Friend/FriendList.vue"),
    },
    {
      name: "chat",
      path: "/chats",
      component: () => import("../views/TheChatView.vue"),
      redirect: { name: "chat-list" },
      children: [
        {
          path: "list",
          name: "chat-list",
          component: () => import("@/components/Chat/ChatList.vue"),
        },
        {
          path: ":roomid",
          name: "chat-view",
          component: () => import("@/components/Chat/ChatDetail.vue"),
        },
      ],
    },
    {
      name: "meeting",
      path: "/meeting",
      component: Meeting,
    },
    {
      name: "meet",
      path: "/meet",
      component: Meet,
    },
    {
      name: "habit",
      path: "/habit",
      component: Habit,
    },
    {
      name: "mypage",
      path: "/mypage",
      component: MyPage,
    },
    {
      name: "mypageSettings",
      path: "/mypageSettings",
      component: MyPageSettings,
    },
    {
      name: "userInfoEdit",
      path: "/userInfoEdit",
      component: UserInfoEdit,
    },
    {
      path: "/records",
      name: "Records",
      component: Records,
    },
    {
      path: "/records/:recordId/trainer",
      name: "Trainer",
      component: Trainer,
      props: true,
    },
    {
      path: "/calendar-detail/:selectedDate",
      name: "CalendarDetail",
      component: CalendarDetail,
    },
    {
      path: "/login",
      name: "LoginView",
      component: LoginView,
    },
    {
      path: "/signup",
      name: "SignUpView",
      component: SignupView,
    },
    {
      path: "/subscribe",
      name: "subscribe",
      component: subscribe,
    },
    {
      path: "/pushnotify",
      name: "pushnotify",
      component: pushnotify,
    },
    {
      path: "/friend-profile",
      component: FriendProfile,
    },
    {
      path: "/login",
      name: "LoginView",
      component: LoginView,
    },
    {
      path: "/signup",
      name: "SignUpView",
      component: SignupView,
    },
  ],
});

export default router;
