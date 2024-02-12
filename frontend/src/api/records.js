import { localAxios } from "@/util/http-commons";

const local = localAxios();
const url = "/records"

async function getUser(recordId, success, fail) {
  console.log('getUser executed')
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  // await local.get(`${url}/${recordId}/prompt`).then(success).catch(fail)
  await local.get(`${url}/18/prompt`).then(success).catch(fail)
}

async function fetchVoiceList() {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  console.log("fetchVoiceList 실행");

  try {
    const response = await local.get(url); // Make sure 'url' is defined and correct
    console.log("음성 목록 불러오기 성공");
    return response.data; // Assuming the data is directly in the response
  } catch (error) {
    console.error('Error fetching voice list:', error);
    return []; // Return an empty array in case of error
  }
}
async function fetchVoiceDetail(recordId, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  await local.get(`${url}/${recordId}`).then(success).catch(fail)
  console.log(`음성 ${recordId}번 세부 내용 불러오기 성공 `)
}
  
async function createNewVoice(data, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  console.log("Creating new voice with data:", data);
  await local.post(`${url}`, JSON.stringify(data)).then(success).catch(fail);
}
  
async function modifyVoice(recordId, name, memo, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  console.log("modified name", name)
  console.log("modified memo", memo)
  await local.put(`${url}/${recordId}`, name, memo).then(success).catch(fail) 
  console.log("음성 내용 수정 성공")
}
  
async function deleteVoice(recordId, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  await local.delete(`${url}/${recordId}`).then(success).catch(fail)
  console.log("음성 삭제 성공")
}
  
async function selectVoice(recordId, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  await local.put(`${url}/use`, { recordId }).then(success).catch(fail)
  console.log(`${recordId}번 선택 완료`)
}
  
// async function saveRecord(recordId, blob, prompt, duration) {
//   console.log('saveRecord recordId', recordId);
//   console.log('saveRecord blob', blob);
//   console.log('saveRecord prompt', prompt);
//   console.log('saveRecord duration', duration);

//   local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
//   if (!blob) {
//     console.error("No recording available to save");
//     return;
//   }

//   // Prepare form data to send the file through a POST request
//   const formData = new FormData();
//   formData.append('audio', blob, `${recordId}.wav`); // Make sure to include the file name
//   formData.append('prompt', prompt);
//   formData.append('duration', duration);
  
//   try {
//     const response = await local.post(`${url}/${recordId}/save/audio`, formData, {
//       headers: {
//         // Add any specific headers your server might require for file uploads
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     console.log(`${prompt}번 녹음 완료`, response.data);
//   } catch (error) {
//     console.error('Error saving record:', error);
//   }
// }


async function saveRecord(recordId, blob) {
  console.log('saveRecord recordId', recordId);
  console.log('saveRecord blob', blob);

  if (!blob) {
    console.error("No recording available to save");
    return;
  }

  // Prepare form data to send the file through a POST request
  const formData = new FormData();
  formData.append('audio', blob, `${recordId}.wav`); // Make sure to include the file name
  console.log('formData', formData)

  try {
    const response = await local.post(`${url}/${recordId}/save/audio`, formData, {
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("accessToken"),
        // 'Content-Type': 'multipart/form-data' This is not necessary as it's set automatically
      }
    });
    console.log('Recording saved successfully:', response.data);
  } catch (error) {
    console.error('Error saving record:', error);
  }
}


async function saveAudio(recordId, promptNum, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  await local.post(`/records/${recordId}/save/member`, promptNum).then(success).catch(fail)
}


// Export all the actions
export {
  selectVoice,
  getUser,
  fetchVoiceList,
  createNewVoice,
  fetchVoiceDetail,
  modifyVoice,
  deleteVoice,
  saveRecord,
  saveAudio,
};