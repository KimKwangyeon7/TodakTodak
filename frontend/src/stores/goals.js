import { defineStore } from 'pinia'
import axios from 'axios'


  // const token

const apiClient = axios.create({
  baseURL: 'http://your-backend-api-url', // 백엔드 서버 URL로 대체
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const useGoalsStore = defineStore({
  id: 'goals', // The unique ID of the store across your application
  state: () => ({
    goals: [],
    nextId: 1, // This does not need to be a ref since it's primitive and you are not using it in a template
  }),

  actions: {
    async addGoal(newGoal) {
      try {
          const response = await apiClient.post('/goals', newGoal);
          this.goals.push(response.data); 
          console.log("Goal added:", response.data);
      } catch (error) {
          console.error("Error adding goal:", error);
      }
    },

    async getGoalLIst() {
      try {
          const response = await apiClient.get('/goals');
          console.log("Goal List:", response.data);
      } catch (error) {
          console.error("Error searching goal:", error);
      }
    },

    async getGoalDetail(goalId) {
      try {
          const response = await apiClient.get(`/goals/${goalId}`);
          console.log("Goal details:", response.data);
      } catch (error) {
          console.error("Error searching goal:", error);
      }
    },

    async updateGoal(goalId, goalUpdateInfo) {
        try {
          const response = await axios.put(`/goals/${goalId}`, goalUpdateInfo);
          console.log(response.data);
        } catch (error) {
            console.error(error);
      }
    },

    async deleteGoal(goalId) {
      try {
        const response = await axios.delete(`/goals/${goalId}`);
        console.log(response.data);
      } catch (error) {
          console.error(error);
      }
    },

    logGoals() {
      this.goals.forEach(goal => {
        console.log(`id: ${goal.id}, goalContent: ${goal.goalContent}, color: ${goal.color}`);
      });
    },

    resetGoals() {
      this.goals = []; // Reset the goals array to an empty array
      this.nextId = 1; // Reset the ID as well
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'my_goals',
        storage: localStorage, // Or localStorage if you want persistence across sessions
      },
    ],
  }
});
