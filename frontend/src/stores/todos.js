import { defineStore } from 'pinia'
// import axios from 'axios'


export const useTodosStore = defineStore({
  id: 'todos', // The unique ID of the store across your application
  state: () => ({
    todos: [],
    nextId: 1, // This does not need to be a ref since it's primitive and you are not using it in a template
  }),
    // const API_URL
  // const token


  actions: {
    addTodo(newTodo) {
      const todoWithId = { id: this.nextId++, ...newTodo }; // Assign an ID to the new goal
      this.todos.push(todoWithId);
      console.log('todoWithId',todoWithId.id)
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