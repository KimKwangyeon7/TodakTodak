import apiClient from './todosApiClient';

async function addTodo(newTodo) {
  try {
    const response = await apiClient.post(newTodo);
    console.log("Todo added:", response.data);
  } catch (error) {
    console.error('Error creating todo:', error);
  }
}

async function getTodoList() {
  try {
    const response = await apiClient.get();
    console.log("Todos fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
}

async function getTodoListByDate(date) {
  try {
    const response = await apiClient.get(`/date/${date}`);
    console.log("Todos by date:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos by date:', error);
  }
}

async function getTodoListByGoal(goalId) {
  try {
    const response = await apiClient.get(`/goal/${goalId}`);
    console.log("Todos by goal:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos by goal:', error);
  }
}

async function getTodoListByMonth(month) {
  try {
    const response = await apiClient.get(`/month/${month}`);
    console.log("Todos by month:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos by month:', error);
  }
}

async function isTodoCompleted(todoId) {
  try {
    const response = await apiClient.patch(`/${todoId}/complete`);
    console.log("Todo completion updated:", response.data);
  } catch (error) {
    console.error('Error updating todo completion:', error);
  }
}

async function getTodoDetail(todoId) {
  try {
    const response = await apiClient.get(`/${todoId}`);
    console.log("Todo details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching todo detail:", error);
  }
}

async function updateTodo(todoId, todoUpdateInfo) {
  try {
    const response = await apiClient.put(`/${todoId}`, todoUpdateInfo);
    console.log("Todo updated:", response.data);
  } catch (error) {
    console.error('Error updating todo:', error);
  }
}

async function deleteTodo(todoId) {
  try {
    const response = await apiClient.delete(`/${todoId}`);
    console.log("Todo deleted:", response.data);
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
}

export {
  addTodo,
  getTodoList,
  getTodoListByDate,
  getTodoListByGoal,
  getTodoListByMonth,
  isTodoCompleted,
  getTodoDetail,
  updateTodo,
  deleteTodo
};
