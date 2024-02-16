import { localAxios } from "@/util/http-commons";

const local = localAxios(); // axios instance

function addTodo(goalId, todo, todoDate, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  local.post(`goals/${goalId}/todos`, todo, { params: { "todoDate": todoDate } }).then(success).catch(fail);
}

//현재날
async function getTodoList(todoDate, success, fail) {
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.get(`/goals/todos/date/${todoDate}`).then(success).catch(fail);
}

async function getTodoListByGoal(todoDate, success, fail) {
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.get(`/goals/todos/color/${todoDate}`).then(success).catch(fail);
}

async function getTodoListByMonth(month, success, fail) {
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.get(`/goals/todos/month/${month}`).then(success).catch(fail);
}

async function isTodoCompleted(todoId, success, fail) {
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.patch(`/goals/todos/${todoId}/complete`).then(success).catch(fail);
}

async function getTodoDetail(todoId, success, fail) {
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.get(`/goals/todos/${todoId}`).then(success).catch(fail);
}

function updateTodo(todoId, todo, success, fail) {
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.put(`/goals/todos/${todoId}`, todo).then(success).catch(fail);
}

function deleteTodo(todoId, success, fail) {
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
