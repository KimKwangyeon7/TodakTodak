// stores/todoStore.js
import { defineStore } from 'pinia';
import { getTodoList } from '@/api/todos'; // API 호출을 위한 함수
export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [], // Todo 항목들을 저장할 배열
  }),
  actions: {
    async fetchTodos(date) {
      try {
        const response = await getTodoList(date); // API 호출
        this.todos = response; // 응답으로 받은 Todo 목록으로 상태 업데이트
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
  }
});
