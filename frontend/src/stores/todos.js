import { defineStore } from 'pinia'
import apiClient from '@/stores/apiClient'

export const useTodosStore = defineStore({
  id: 'todos', // The unique ID of the store across your application
  state: () => ({
    todos: [],
    nextId: 1, // This does not need to be a ref since it's primitive and you are not using it in a template
  }),
    // const API_URL
  // const token


  actions: {

    async addTodo(newTodo) {
      try {
        // const response = await apiClient.post('/todos', newTodo);
        // this.goals.push(response.data); 
        const todoWithId = { id: this.nextId++, ...newTodo}
        this.todos.push(todoWithId)
        console.log("Todo added:", response.data);
      } catch (error) {
        console.error('Error creating todo:', error);
      }
    },

    async getTodoListByDate(date) {
      try {
        const response = await apiClient.get(`/todos/date/${date}`);
        this.todos = response.data;
      } catch (error) {
        console.error('Error fetching todos by date:', error);
      }
    },

    async getTodoListByGoal(goalId) {
      try {
        const response = await apiClient.get(`/todos/goal/${goalId}`);
        this.todos = response.data;
      } catch (error) {
        console.error('Error fetching todos by goal:', error);
      }
    },

    async getTodoListByMonth(month) {
      try {
        const response = await apiClient.get(`/todos/month/${month}`);
        this.todos = response.data;
      } catch (error) {
        console.error('Error fetching todos by month:', error);
      }
    },

    async isTodoCompleted(todoId) {
      try {
        const response = await apiClient.patch(`/todos/${todoId}/complete`);
        this.todos[todoId].isCompleted = true
      } catch (error) {
        console.error('Error updating todo completion:', error);
      }
    },

    async getTodoDetail(todoId) {
      try {
          const response = await apiClient.get(`/todos/${todoId}`);
          console.log("Todo details:", response.data);
      } catch (error) {
          console.error("Error searching todo:", error);
      }
    },

    async updateTodo(todoId, todoUpdateInfo) {
        try {
          const response = await apiClient.put(`/todos/${todoId}`, todoUpdateInfo);
          console.log(response.data);
        } catch (error) {
            console.error(error);
      }
    },

    async deleteTodo(todoId) {
      try {
        // const response = await apiClient.delete(`/todos/${todoId}`);
        const index = this.todos.findIndex(todo => todo.id === todoId);
        if (index !== -1) {
          // Remove the deleted todo from the this.todos array using splice
          this.todos.splice(index, 1);
        }
        console.log(response.data);
      } catch (error) {
          console.error(error);
      }
    },
   

    logTodos() {
      this.todos.forEach(todo => {
        console.log(`id: ${todo.id}, todoTitle: ${todo.todoTitle}, todoContent: ${todo.todoContent}, todoDate: ${todo.eightDigitDate}, isImportant: ${todo.isImportant}`);
      });
    },

    findId(objectTitle) {
      let i = null
      const todosArr = this.todos
      for (let j = 0; j <= todosArr.length; j++) {
        if (todosArr[j] && todosArr[j].todoTitle === objectTitle){
          i = j
          break
        }
      }
      return todosArr[i].id
    },

    resetTodos() {
      this.todos = []; // Reset the goals array to an empty array
      this.nextId = 1; // Reset the ID as well
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'my_todos',
        storage: localStorage, // Or localStorage if you want persistence across sessions
      },
    ],
  }
});