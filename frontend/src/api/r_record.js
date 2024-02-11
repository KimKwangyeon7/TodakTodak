import { localAxios } from "@/util/http-commons";

const local = localAxios();

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
  
async function modifyVoice(recordId, name, memo) {
  console.log("modified name", name)
  console.log("modified memo", memo)
  await local.put(`/records/${recordId}`, name, memo).then(success).catch(fail) 
  console.log("음성 내용 수정 성공")
}
  
async function deleteVoice(recordId) {
  await local.delete(`/records/${recordId}`)
  console.log("음성 삭제 성공")
}
  
async function selectVoice(recordId) {
  await local.put('/records/use').then(success).catch(fail)
  console.log(`${recordId}번 음성 사용 중`)
}
  
// 저장할 때마다 녹음 길이, 프롬프트 넘버
async function saveRecord(promptNum, duration) {
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

  try {
    await apiClient.post('/save/member', { promptNum, a });
    console.log("Record saved successfully");
  } catch (error) {
    console.error('Error saving record:', error);
  }
}

async function saveAudio(prompt, promptNum) {
  // prompt 한 문장
  // promptNum 한 문장의 번호
  

  try {
    const response = await apiClient.post('/save/audio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    nextPrompt = response.data;
  } catch (error) {
    console.error('Error saving audio:', error);
  }
}


// Export all the actions
export {
  // fetchCurrentSentence,
  fetchVoiceList,
  createNewVoice,
  fetchVoiceDetail,
  modifyVoice,
  deleteVoice,
  selectVoice,
  saveRecord,
  saveAudio,
};