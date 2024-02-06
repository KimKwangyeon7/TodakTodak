import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter,useRoute } from 'vue-router'

export const useCounterStore = defineStore('counter', () => {
  
  const user = ref(null)
  const userId = ref(null)
  const router = useRouter()
  const route = useRoute()
  const count = ref(0)
  const token = ref(null)
  const isLogin = computed(() => {
    return token.value !== null
  })
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

 
  const signUp = function (payload) {
    const email =payload.email
    const password =payload.password
    const nickname=payload.nickname
    const birthDate=payload.birthDate
    const name=payload.name
    const sex=payload.sex
    const phoneNumber=payload.phoneNumber

    axios({
      method: 'post',
      url: `http://localhost:8080/members`,
      data: {
        email, password, name, nickname, sex, phoneNumber, birthDate
      }
    })
      .then((res) => {
        window.alert('회원가입이 완료되었습니다.')
        logIn({ email, password })

      })
      .catch((err) => {
        window.alert('회원가입 실패!')
        console.log(err)
      })
  }
  
  const getUserId = function(){
    axios({
      method: 'get',
      url: `http://localhost:5173/accounts/user/`,
      headers: {
        Authorization: `Token ${token.value}`
      }
    })
    .then((response) => {
      userId.value = response.data.pk
      console.log('userId:')
      console.log(userId.value)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const logIn = function (payload) {
    const { username, password } = payload

    axios({
      method: 'post',
      url: `http://localhost:5173/login/`,
      data: {
        username, password
      }
    })
      .then((res) => {
        console.log(res.data)
        token.value = res.data.key
        user.value = username
        
        localStorage.setItem('token', res.data.key);
        getUserId();
        router.push({ name: 'main' });
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const logOut = function () {
    axios({
      method: 'post',
      url: `http://localhost:5173/logout/`,
    })
      .then((res) => {
        token.value = null
        user.value = null
        userId.value = null
        router.push({ name: 'LoginView' })
      })
      .catch((err) => {
        console.log(err)
      })
    }

  return { count, doubleCount, increment, signUp, logIn, token,user,userId, isLogin, logOut,getUserId }
})
