import apiClient from './recordsApiClient';


async function fetchVoiceList() {
  try {
    const response = await apiClient.get();
    console.log("Voice List:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching voice list:', error);
  }
}

async function createNewVoice(newRecord) {
  try {
    const response = await apiClient.post(newRecord);
    console.log("Voice created:", response.data)
  } catch (error) {
    console.error("Error creating new voice:", error);
  }
}

async function fetchVoiceDetail(recordId) {
  try {
    const response = await apiClient.get(`${recordId}`);
    voiceDetail = response.data;
  } catch (error) {
    console.error('Error fetching voice detail:', error);
  }
}

async function modifyVoice(recordId, updatedName, updatedMemo) {
  const payload = {
    name: updatedName,
    memo: updatedMemo
  };
  try {
    const response = await apiClient.put(`/${recordId}`, payload);
    if (response.status === 200) {
      console.log("Voice modified successfully");
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error modifying voice:', error);
  }
}

async function deleteVoice(recordId) {
  try {
    const response = await apiClient.delete(`/${recordId}`);
    if (response.status === 200) {
      console.log("Voice deleted successfully");
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting voice:', error);
  }
}

// 알림 소리로 사용할 음성 고르기
// 한 버튼만 활성화만 활성화하기
// 다른 버튼 눌러도 어차피 백에서 하나만 설정되게 하니까 프론트가 신경쓸 것 없음
async function selectVoice(recordId) {
  try {
    const response = await apiClient.put(`use`, { recordId });
    if (response.status === 200) {
      console.log("Voice selected successfully");
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error selecting voice:', error);
  }
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