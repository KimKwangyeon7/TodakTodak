<template>
  <div v-if="authStore.isLogin" class="mt-5">
    <div>
      <TodoList :todoList="todoList" />
      <HabitList :habitList="habitList" />

      <div class="penguin">
        <img src="@/assets/penguin.jpg">
      </div>
    </div>
  </div>

  <div v-else>
    <!-- <div>
      <RouterLink :to="{ name: 'LoginView' }">Login</RouterLink>
      <RouterLink :to="{ name: 'SignUpView' }">SignUp</RouterLink>
    </div> -->
  </div>
  <RouterView />
</template>

<script>
import { getTodoList } from "@/api/todos";
import { useMemberStore } from "@/stores/auth";

import TodoList from '@/components/Todo/TodoList.vue'
import Example from '@/components/Todo/example.vue'
import HabitList from '@/components/Habit/HabitList.vue'

import { onMounted, ref} from 'vue'
import { receiveAudioFromBackend } from '@/api/tts'

export default {
  components: {
      TodoList,
      HabitList,
      Example,
  },
  data() {
      return {
        habitList: null,
        randomQuote: "", // 명언을 저장할 변수
        quoteAuthor: "", // 작가를 저장할 변수
        quoteError: false // 에러 여부를 나타내는 변수
      };
  },
  setup() {
    const authStore = useMemberStore()
    const audioUrl = ref(null)

    const fetchAndPlayAudio = async () => {
      try {
        const audioFileName = 'audioFileName.mp3'; // 오디오 파일 이름
        const response = await receiveAudioFromBackend(audioFileName);
        
        // Blob 객체 생성 후 URL 설정
        const audioBlob = new Blob([response.data], { type: 'audio/mp3' });
        audioUrl.value = URL.createObjectURL(audioBlob);

        // 오디오 재생
        const audioPlayer = new Audio(audioUrl.value);
        await audioPlayer.play();
      } catch (error) {
        console.error('Error fetching and playing audio:', error);
      }
    };

    const pollAudioAvailability = () => {
      setInterval(() => {
        fetchAndPlayAudio();
      }, 60000); // 60초마다 폴링
    };
    onMounted(() => {
      fetchAndPlayAudio();
      pollAudioAvailability();
    })
    return {
      authStore, 
      audioUrl
    }
  },
  methods: {
    async fetchQuote() {
      try {
        const response = await fetch("/members/quote");
        if (!response.ok) {
          throw new Error("Failed to fetch quote");
        }
        const data = await response.json();
        if (!Array.isArray(data) || data.length !== 2) {
          throw new Error("Invalid quote data format");
        }

        // 여기서 사용할 변수명 수정
        const todayString = year + "" + month + "" + day;

        getTodoList(
          todayString,
          ({ data }) => {
            this.todos = data;
          },
          (error) => {
            console.log(error);
          }
        );
        this.randomQuote = data[0];
        this.quoteAuthor = data[1];
      } catch (error) {
        console.error(error);
        this.quoteError = true; // 에러 발생 시 플래그 설정
      }
    },
  },
  mounted() {
    // 컴포넌트가 생성될 때 명언을 가져오도록 호출
    this.fetchQuote();
  }
}
</script>

<style scoped>
.quote {
  font-size: 16px;
}

.penguin {
  position: fixed;
  bottom: 80px; 
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
}

.penguin img {
  opacity: 0.5;
  width: 100%;
}
</style>
@/records.js/auth
