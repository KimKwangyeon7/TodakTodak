import apiClient from './ttsApiClient'

async function sendAudioToBackend(audioFile) {
  let formData = new FormData();
  formData.append('file', audioFile, audioFile.name);

  try {
    const response = await apiClient.post(formData, {
    });

    if (response.status === 200) {
        console.log(response)
        return response.data; 
    } else {
      console.error('Error sending audio to backend:', error);
      return null; 
    }
  } catch (error) {
    console.error('Error sending audio to backend:', error);
    throw error; 
  }
};