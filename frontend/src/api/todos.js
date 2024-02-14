import { localAxios } from "@/util/http-commons";

const local = localAxios();

function addTodo(goalId, todo, todoDate, success, fail) {
  console.log("addTodo 실행", todo);
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.post(`goals/${goalId}/todos`, todo, { params: { todoDate: todoDate } })
    .then(success)
    .catch(fail);
}

function getTodoList(todoDate, success, fail) {
  console.log("getTodoList 실행");
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.get(`/goals/todos/date/${todoDate}`).then(success).catch(fail);
}

function getTodoListByGoal(todoDate, success, fail) {
  console.log("getTodoListByGoal 실행");
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.get(`/goals/todos/color/${todoDate}`).then(success).catch(fail);
}

function getTodoListByMonth(month, success, fail) {
  console.log("goalList 실행", month);
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.get(`/goals/todos/month/${month}`).then(success).catch(fail);
}

function isTodoCompleted(todoId, success, fail) {
  console.log("isTodoCompleted 실행");
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.patch(`/goals/todos/${todoId}/complete`).then(success).catch(fail);
}

function getTodoDetail(todoId, success, fail) {
  console.log("getTodoDetail 실행");
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.get(`/goals/todos/${todoId}`).then(success).catch(fail);
}

function updateTodo(todoId, todo, success, fail) {
  console.log("updateTodo 실행");
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.put(`/goals/todos/${todoId}`, todo).then(success).catch(fail);
}

function deleteTodo(todoId, success, fail) {
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
