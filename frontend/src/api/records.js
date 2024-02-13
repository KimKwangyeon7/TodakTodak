import { localAxios } from "@/util/http-commons";

const local = localAxios();
const url = "/records"

async function getUser(recordId, success, fail) {
  console.log('getUser executed')
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  await local.get(`${url}/${recordId}/prompt`).then(success).catch(fail)
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
  await local.get(`${url}/${recordId}`).then(success, console.log(`음성 ${recordId}번 세부 내용 불러오기 성공 `)).catch(fail)
}
  
async function createNewVoice(data, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  await local.post(url, data) // Remove JSON.stringify if not needed
    .then(response => {
      console.log("새로운 음성 생성 성공", response);
      success(response);
    })
    .catch(error => {
      console.error("새로운 음성 생성 실패", error);
      fail(error);
    });
}
  
async function modifyVoice(recordId, name, memo, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  await local.put(`${url}/${recordId}`, { name, memo }).then(success).catch(fail) // 객체로 전송
    .then(response => {
      console.log('response.status for modifyVoice: ', response.status); // 여기로 옮김
      console.log("modified name", name);
      console.log("modified memo", memo);
      console.log("음성 내용 수정 성공");
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
      console.log("음성 삭제 성공");
      success(response); // 성공 콜백 호출
    })
    .catch(error => {
      console.error('오류 발생: ', error);
      fail(error); // 실패 콜백 호출
    });
}
  
async function selectVoice(recordId, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  await local.put(`${url}/use?recordId=${recordId}`) // recordId를 쿼리 매개변수로 전달
         .then(response => {
            if (response.status === 200){
              console.log(response.status)
              console.log(`${recordId}번 선택 완료`);
              success(response); // 성공 콜백 호출
            }
         })
         .catch(error => {
            console.error(`오류 발생: ${error}`);
            fail(error); // 실패 콜백 호출
         });
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

// -----------------------------------------------------------------------------

// async function saveRecord(recordId, blob, prompt, duration) {
//   console.log('saveRecord recordId', recordId);
//   console.log('saveRecord blob', blob);

//   if (!blob) {
//     console.error("No recording available to save");
//     return;
//   }

//   // Prepare form data to send the file through a POST request
//   const formData = new FormData();
//   formData.append('audio', blob, `${recordId}.wav`); // Make sure to include the file name
//   formData.append('prompt', prompt); // 'prompt' 값을 추가합니다.
//   formData.append('duration', duration.toString()); // 'duration' 값을 추가합니다. 숫자를 문자열로 변환할 수 있습니다.
//   console.log('formData', formData, prompt, duration)

//   try {
//     const response = await local.post(`${url}/${recordId}/save/audio`, formData, {
//       headers: {
//         'Authorization': "Bearer " + localStorage.getItem("accessToken"),
//         // 'Content-Type': 'multipart/form-data' This is not necessary as it's set automatically
//       }
//     });
//     console.log('Recording saved successfully:', response.data);
//     console.log('response: ', response)
//     console.log('response.status: ', response.status)
//     console.log(`${prompt}번 녹음 완료! (${duration}초 소요)`)
//   } catch (error) {
//     console.error('Error saving record:', error);
//   }
// }


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
    console.log('Recording saved successfully:', response.data);
    console.log('response.status: ', response.status)
    return response.data; // Return the response data from the server
  } catch (error) {
    console.error('Error saving record:', error);
    throw error; // Rethrow the error to handle it in the calling context
  }
}


async function saveAudio(recordId, prompt, time, success, fail) {
  console.log('saveAudiorecordId', recordId)
  console.log('saveAudioprompt', prompt)
  console.log('saveAudiotime', time)
  console.log('saveAudiosuccess', success)
  console.log('saveAudiofail', fail)

  // Prepare the request payload
  const payload = {
    prompt: prompt,
    time: time
  };

  console.log(payload)

  try {
    local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
    // const response = await local.post(`${url}/${recordId}/save/member`, payload);
    // Construct the query parameters
    const queryParams = new URLSearchParams({ promptNum: prompt, time: time }).toString();
    // Make the POST request to the server with query params
    const response = await local.post(`${url}/${recordId}/save/member?${queryParams}`);
    
    console.log('Audio save record response:', response.data);
    if (success) success(response);
    console.log('recordId', recordId)
    console.log('prompt', prompt)
    console.log('time', time)
    console.log('success', success)
    console.log('fail', fail)
  } catch (error) {
    console.error('Error saving audio record:', error);
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
  saveAudio,
};