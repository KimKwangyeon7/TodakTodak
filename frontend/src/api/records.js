import { localAxios } from "@/util/http-commons";

const local = localAxios();
const url = "/records"

async function getUser(recordId) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  try {
    const response = await local.get(`${url}/${recordId}/prompt`) 
    return response.data
  } catch (error) {
    console.error(error)
  }
}

async function fetchVoiceList() {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  try {
    const response = await local.get(url); // Make sure 'url' is defined and correct
    return response.data; // Assuming the data is directly in the response
  } catch (error) {
    console.error('Error fetching voice list:', error);
    return []; // Return an empty array in case of error
  }
}

async function fetchVoiceDetail(recordId, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  await local.get(`${url}/${recordId}`).then(success).catch(fail)
}
  
async function createNewVoice(data, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  await local.post(url, data) // Remove JSON.stringify if not needed
    .then(response => {
      success(response);
    })
    .catch(error => {
      fail(error);
    });
}
  
async function modifyVoice(recordId, name, memo, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  await local.put(`${url}/${recordId}`, { name, memo }).then(success).catch(fail) // 객체로 전송
    .then(response => {
      success(response); // 성공 콜백 호출
    })
    .catch(error => {
      console.error('오류 발생: ', error);
      fail(error); // 실패 콜백 호출
    });
}
  
async function deleteVoice(recordId, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  await local.delete(`${url}/${recordId}`)
    .then(response => {
      success(response); // 성공 콜백 호출
    })
    .catch(error => {
      console.error(error);
      fail(error); // 실패 콜백 호출
    });
}
  
async function selectVoice(recordId) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  try {
    const response = await local.patch(`${url}/use/${recordId}`);
    if (response.status === 200) {
    }
  } catch (error) {
    console.error(error);
  }
}

async function saveRecord(recordId, audioBlob) {
  if (!audioBlob) {
    console.error("No recording available to save");
    return;
  }

  // Prepare form data to send the file through a POST request
  const formData = new FormData();
  formData.append('audio', audioBlob, `${recordId}.wav`); // Assuming 'recordId.wav' is the desired file name on the server

  try {
    local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
    // Make the POST request to the server
    const response = await local.post(`${url}/${recordId}/save/audio`, formData);
    return response.data; // Return the response data from the server
  } catch (error) {
    console.error('Error saving record:', error);
    throw error; // Rethrow the error to handle it in the calling context
  }
}


async function goOutFromTrainer(recordId, prompt, time, success, fail) {
  // Prepare the request payload
  const payload = {
    prompt: prompt,
    time: time
  };
  try {
    local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
    const queryParams = new URLSearchParams({ promptNum: prompt, time: time }).toString();
    const response = await local.post(`${url}/${recordId}/save/member?${queryParams}`);
    if (success) success(response);
  } catch (error) {
    console.error(error);
    if (fail) fail(error);
  }
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
  goOutFromTrainer,
};