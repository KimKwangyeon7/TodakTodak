import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function clickStop(recordId, success, fail) {
  await local.post(`/records/{recordId}/save/member`, { recordId }).then(success).catch(fail)
  console.log(`${recordId}번 녹음 중 중지 버튼 누름`)
}

async function selectVoice(recordId, success, fail) {
  await local.put('/records/use', { recordId }).then(success).catch(fail)
  console.log(`${recordId}번 선택 완료`)
}

async function getUser(recordId, success, fail) {
  local.defaults.headers.Autorization =
    "Bearer " + localStorage.getItem("accessToken");
  await local.get(`/records/${recordId}/prompt`).then(success).catch(fail)
}

async function fetchVoiceList(success, fail) {
  await local.get('/records').then(success).catch(fail);
  console.log("음성 목록 불러오기 성공")
}

async function fetchVoiceDetail(recordId, success, fail) {
  await local.get(`/records/${recordId}`).then(success).catch(fail)
  console.log(`음성 ${recordId}번 세부 내용 불러오기 성공 `)
}
  
async function createNewVoice(name, memo, success, fail) {
  console.log("name", name)
  console.log("memo", memo)
  await local.post('/records', name, memo).then(success).catch(fail)
  console.log("새로운 음성 생성 성공")
}
  
async function modifyVoice(recordId, name, memo, success, fail) {
  console.log("modified name", name)
  console.log("modified memo", memo)
  await local.put(`/records/${recordId}`, name, memo).then(success).catch(fail) 
  console.log("음성 내용 수정 성공")
}
  
async function deleteVoice(recordId, success, fail) {
  await local.delete(`/records/${recordId}`).then(success).catch(fail)
  console.log("음성 삭제 성공")
}
  
async function selectVoice(recordId, success, fail) {
  await local.put('/records/use').then(success).catch(fail)
  console.log(`${recordId}번 음성 사용 중`)
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

  await local.post(`records/${recordId}/save/member`, prompt, duration, a).then(success).catch(fail)
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
  selectVoice,
  saveRecord,
  saveAudio,
};