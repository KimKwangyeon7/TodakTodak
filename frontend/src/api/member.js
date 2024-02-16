import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function signup(param, success, fail) {
  await local.post(`/members`, param).then(success).catch(fail);
}

async function login(param, success, fail) {
  await local.post(`/members/auth`, param).then(success).catch(fail);
}

async function findByNickname(nickname, success, fail) {
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  await local.get(`/members/${nickname}`).then(success).catch(fail);
}

async function findByToken(success, fail) {
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  await local.get(`/members/me`).then(success).catch(fail);
}

async function logout(userEmail, success, fail) {
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.delete(`/logout/${userEmail}`).then(success).catch(fail);
}

function modifyUser(user, success, fail) {
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.put(`/members`, user).then(success).catch(fail);
}

function deleteMember(userEmail, success, fail) {
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.delete(`/members/${userEmail}`).then(success).catch(fail);
}

export {
  signup,
  login,
  findByNickname,
  findByToken,
  logout,
  modifyUser,
  deleteMember,
};
