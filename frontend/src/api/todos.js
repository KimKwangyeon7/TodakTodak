import { localAxios } from "@/util/http-commons";

const local = localAxios(); // axios instance

function addTodo(goalId, todo, todoDate, success, fail) {
  console.log("addTodo 실행", todo);
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.post(`goals/${goalId}/todos`, todo, { params: { todoDate: todoDate } });
}

// async function getTodoList(todoDate) {
//   try {
//     const response = await apiClient.get(`/todos/date/${todoDate}`);
//     console.log("Todos fetched:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching todos:', error);
//   }
// }

async function getTodoList(todoDate, success, fail) {
  console.log("getGoalDetail 실행");
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.get(`/goals/todos/date/${todoDate}`).then(success).catch(fail);
}

// async function getTodoListByDate(todoDate) {
//   try {
//     const response = await apiClient.get(`/todos/date/${todoDate}`);
//     console.log("Todos by date:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching todos by date:', error);
//   }
// }

async function getTodoListByGoal(todoDate, success, fail) {
  console.log("getTodoListByGoal 실행");
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.get(`/goals/todos/color/${todoDate}`).then(success).catch(fail);
}

// async function getTodoListByMonth(month) {
//   try {
//     const response = await apiClient.get(`/todos/month/${month}`);
//     console.log("Todos by month:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching todos by month:', error);
//   }
// }

function getTodoListByMonth(month, success, fail) {
  console.log("goalList 실행", month);
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.get(`/goals/todos/month/${month}`).then(success).catch(fail);
}

// async function isTodoCompleted(todoId) {
//   try {
//     const response = await apiClient.patch(`/${todoId}/complete`);
//     console.log("Todo completion updated:", response.data);
//   } catch (error) {
//     console.error('Error updating todo completion:', error);
//   }
// }

function isTodoCompleted(todoId, success, fail) {
  console.log("isTodoCompleted 실행");
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.patch(`/goals/todos/${todoId}/complete`).then(success).catch(fail);
}

// async function getTodoDetail(todoId) {
//   try {
//     const response = await apiClient.get(`/${todoId}`);
//     console.log("Todo details:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching todo detail:", error);
//   }
// }

async function getTodoDetail(todoId, success, fail) {
  console.log("getTodoDetail 실행");
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.get(`/goals/todos/${todoId}`).then(success).catch(fail);
}

// async function updateTodo(todoId, todoUpdateInfo) {
//   try {
//     const response = await apiClient.put(`/${todoId}`, todoUpdateInfo);
//     console.log("Todo updated:", response.data);
//   } catch (error) {
//     console.error('Error updating todo:', error);
//   }
// }

async function updateTodo(todoId, todo, success, fail) {
  console.log("updateTodo 실행");
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.put(`/goals/todos/${todoId}`, todo).then(success).catch(fail);
}

// async function deleteTodo(todoId) {
//   try {
//     const response = await apiClient.delete(`/${todoId}`);
//     console.log("Todo deleted:", response.data);
//   } catch (error) {
//     console.error('Error deleting todo:', error);
//   }
// }

async function deleteTodo(todoId, success, fail) {
  console.log("deleteTodo 실행");
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.delete(`/goals/todos/${todoId}`).then(success).catch(fail);
}

export {
  addTodo,
  getTodoList,
  getTodoListByGoal,
  getTodoListByMonth,
  isTodoCompleted,
  getTodoDetail,
  updateTodo,
  deleteTodo,
};
