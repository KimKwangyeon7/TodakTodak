import { localAxios } from "@/util/http-commons";

const local = localAxios();
const url = "/records"

async function clickStop(recordId, success, fail) {
  await local.post(`${url}/${recordId}/save/member`, { recordId }).then(success).catch(fail)
  console.log(`${recordId}번 녹음 중 중지 버튼 누름`)
}

async function getUser(recordId, success, fail) {
  local.defaults.headers.Autorization =
    "Bearer " + localStorage.getItem("accessToken");
  await local.get(`${url}/${recordId}/prompt`).then(success).catch(fail)
}

async function fetchVoiceList(success, fail) {
  console.log("fetchVoiceList 실행")
  await local.get(`${url}`).then(success).catch(fail);
  console.log("음성 목록 불러오기 성공")
}

async function fetchVoiceDetail(recordId, success, fail) {
  await local.get(`${url}/${recordId}`).then(success).catch(fail)
  console.log(`음성 ${recordId}번 세부 내용 불러오기 성공 `)
}
  
// async function createNewVoice(name, memo, success, fail) {
//   console.log("name", name)
//   console.log("memo", memo)
//   await local.post(`${url}`, name, memo).then(success).catch(fail)
//   console.log("새로운 음성 생성 성공")
// }

// async function createNewVoice(name, memo, success, fail) {
//   const payload = { name, memo }; // Create a payload object
//   console.log("payload", payload);
//   await local.post(`${url}`, payload).then(success).catch(fail)
//   .catch((error) => {
//     console.error("새로운 음성 생성 실패", error);
//   });
// }

async function createNewVoice(data, success, fail) {
  console.log("Creating new voice with data:", data);
  await local.post(`${url}`, JSON.stringify(data)).then(success).catch(fail);
}
  
async function modifyVoice(recordId, name, memo, success, fail) {
  console.log("modified name", name)
  console.log("modified memo", memo)
  await local.put(`${url}/${recordId}`, name, memo).then(success).catch(fail) 
  console.log("음성 내용 수정 성공")
}
  
async function deleteVoice(recordId, success, fail) {
  await local.delete(`${url}/${recordId}`).then(success).catch(fail)
  console.log("음성 삭제 성공")
}
  
async function selectVoice(recordId, success, fail) {
  await local.put(`${url}/use`, { recordId }).then(success).catch(fail)
  console.log(`${recordId}번 선택 완료`)
}
  
// 저장할 때마다 녹음 길이, 프롬프트 넘버
async function saveRecord(recordId, prompt, duration, success, fail) {
  if (!blob) {
    console.error("No recording available to save");
    return;
  }

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = title + ".wav";
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);

  await local.post(`${url}/${recordId}/save/member`, prompt, duration, a).then(success).catch(fail)
  console.log(`${prompt}번 녹음 완료`)
}

async function saveAudio(recordId, promptNum, success, fail) {
  await local.post(`/records/${recordId}/save/member`, promptNum).then(success).catch(fail)
}


// Export all the actions
export {
  selectVoice,
  clickStop,
  getUser,
  fetchVoiceList,
  createNewVoice,
  fetchVoiceDetail,
  modifyVoice,
  deleteVoice,
  saveRecord,
  saveAudio,
};