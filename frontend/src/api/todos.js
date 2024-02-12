import { localAxios } from '@/util/http-commons'
import { alarm } from './alarms'

const local = localAxios()
const url = "/goals/todos"

async function addTodo(goalId, title, content, color, time, important, 
                       outside, alarmed, checked, completed, todoDate,
                       success, fail) {

  console.log("addTodo 실행")
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  local.post(`goals/${goalId}/todos`,
              JSON.stringify(
                title, content, color, time, important, outside, 
                alarmed, checked, completed, todoDate
              )).then(success).catch(fail)

  if (alarmed === true) {
    const preparedData = JSON.stringify({
      alarmTitle: title, alarmContent: content
    })
    preparedData += {checked, completed}
    alarm(preparedData)
  }
}

async function getTodoListByDate(todoDate, success, fail) {
  console.log("getTodoListByDate 실행")
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken");
  local.get(`${url}/date/${todoDate}`).then(success).catch(fail)
}

async function getTodoListByGoal(goalId, success, fail) {
  console.log("getTodoListByGoal 실행")
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken");
  local.get(`${url}/color/${goalId}`).then(success).catch(fail)
}

async function getTodoListByMonth(month, success, fail) {
  console.log("getTodoListByGoal 실행")
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken");
  local.get(`${url}/month/${month}`).then(success).catch(fail)
}

async function checkTodoComplete(todoId, success, fail) {
  console.log("checkTodoComplete 실행")
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken");
  local.patch(`${url}/${todoId}/complete`).then(success).catch(fail)
}

async function getTodoDetail(todoId, success, fail) {
  console.log("getTodoDetail 실행")
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken");
  local.get(`${url}/${todoId}`).then(success).catch(fail)
}

async function updateTodo(todoId, todoUpdateInfo, success, fail) {
  console.log("updateTodo 실행")
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken");
  local.put(`${url}/${todoId}`, JSON.stringify({todoUpdateInfo})).then(success).catch(fail)
}

async function deleteTodo(todoId, success, fail) {
  console.log("deleteTodo 실행")
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken");
  local.delete(`${url}/${todoId}`).then(success).catch(fail)
}

export {
  addTodo,
  getTodoListByDate,
  getTodoListByGoal,
  getTodoListByMonth,
  checkTodoComplete,
  getTodoDetail,
  updateTodo,
  deleteTodo
};
