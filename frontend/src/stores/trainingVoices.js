import { defineStore } from 'pinia'
// import axios from 'axios'


export const useTrainingVoicesStore = defineStore({
  id: 'trainingVoices', // The unique ID of the store across your application
  state: () => ({
    trainingVoices: [],
    nextId: 1, // This does not need to be a ref since it's primitive and you are not using it in a template
  }),
    // const API_URL
  // const token


  actions: {
    addTrainingVoices(newTrainingVoice) {
      const trainingVoiceWithId = { id: this.nextId++, ...newTrainingVoice }; // Assign an ID to the new goal
      this.trainingVoices.push(trainingVoiceWithId);
      console.log('trainingVoiceWithId',trainingVoiceWithId)
    },

    logTrainingVoices() {
      this.trainingVoices.forEach(trainingVoice => {
        console.log(`id: ${trainingVoice.id}, title: ${trainingVoice.title}, memo: ${trainingVoice.memo}`);
      });
    },

    findId(objectTitle) {
      let i = null
      const trainingArr = this.trainingVoices
      for (let j = 0; j <= trainingArr.length; j++) {
        if (trainingArr[j] && trainingArr[j].title === objectTitle){
          i = j
          break
        }
      }
      return trainingArr[i].id
    },

    resetTrainingVoices() {
      this.trainingVoices = []; // Reset the goals array to an empty array
      this.nextId = 1; // Reset the ID as well
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'my_training_voices',
        storage: localStorage, // Or localStorage if you want persistence across sessions
      },
    ],
  }
});