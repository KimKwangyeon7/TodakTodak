import { defineStore } from 'pinia'
// import axios from 'axios'


export const useUsableVoicesStore = defineStore({
  id: 'usableVoices', // The unique ID of the store across your application
  state: () => ({
    usableVoices: [],
    nextId: 1, // This does not need to be a ref since it's primitive and you are not using it in a template
  }),
    // const API_URL
  // const token


  actions: {
    addUsableVoices(newUsableVoice) {
      const usableVoiceWithId = { id: this.nextId++, ...newUsableVoice }; // Assign an ID to the new goal
      this.usableVoices.push(usableVoiceWithId);
      console.log('usableVoiceWithId',usableVoiceWithId)
    },

    logUsableVoices() {
      this.usableVoices.forEach(usableVoice => {
        console.log(`id: ${usableVoice.id}, title: ${usableVoice.title}, memo: ${usableVoice.memo}`);
      });
    },

    findId(objectTitle) {
      let i = null
      const usableArr = this.usableVoices
      for (let j = 0; j <= usableArr.length; j++) {
        if (usableArr[j] && usableArr[j].title === objectTitle){
          i = j
          break
        }
      }
      return usableArr[i].id
    },

    resetUsableVoices() {
      this.usableVoices = []; // Reset the goals array to an empty array
      this.nextId = 1; // Reset the ID as well
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'my_usable_voices',
        storage: localStorage, // Or localStorage if you want persistence across sessions
      },
    ],
  }
});