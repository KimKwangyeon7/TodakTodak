import { defineStore } from 'pinia'
// import axios from 'axios'
// import { useTodosStore } from './todos'
// import { useHabitsStore } from './habits'


export const useAlarmsStore = defineStore({
  id: 'alarms', // The unique ID of the store across your application
  state: () => ({
    alarms: [],
    nextAlarmId: 1, // This does not need to be a ref since it's primitive and you are not using it in a template
  }),
    // const API_URL
  // const token

  actions: {

    addAlarm(newAlarm) {
      const alarmWithId = { id: this.nextAlarmId++, ...newAlarm}
      this.alarms.push(alarmWithId)
      console.log(this.alarms)
    },

    resetAlarms() {
      this.alarms = []; // Reset the goals array to an empty array
      this.nextAlarmId = 1; // Reset the ID as well
    },

    sendPushForTodo(alarm) {
      const todosStore = useTodosStore()
      console.log('todosStore', todosStore)
      const arr = todosStore.todos
      console.log('arr', arr)
      const tempId = alarm.todoId
      console.log('tempId', tempId)

      let i = null
      for (let j = 0; j <= arr.length; j++) {
        console.log(arr[j])
        if (arr[j].id === tempId){
          i = j
          break
        }
      }
      const preparedData = JSON.stringify({
        pTitle: arr[i].todoTitle, pMsg: arr[i].todoContent
      })

      fetch('https://us-central1-c210-67728.cloudfunctions.net/storePushData', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: preparedData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data.message);
      })
      .catch(err => console.log('오류!' + err.message));
    },

    sendPushForHabit(alarm) {
      const habitsStore = useHabitsStore()
      console.log('habitsStore', habitsStore)
      const arr = habitsStore.habits
      console.log('arr', arr)
      const tempId = alarm.habitId
      console.log('tempId', tempId)

      let k = null
      for (let l = 0; l <= arr.length; l++) {
        console.log(arr[l])
        if (arr[l].id === tempId){
          k = l
          break
        }
      }
      const preparedData = JSON.stringify({
        pTitle: arr[k].habitContent, pMsg: "습관은 title이 없고 content만 있습니다."
      })

      fetch('https://us-central1-c210-67728.cloudfunctions.net/storePushData', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: preparedData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data.message);
      })
      .catch(err => console.log('오류!' + err.message));
    }

  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'my_alarms',
        storage: localStorage, // Or localStorage if you want persistence across sessions
      },
    ],
  }
});
