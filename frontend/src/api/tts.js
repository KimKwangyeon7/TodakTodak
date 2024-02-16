import { localAxios } from "@/util/http-commons";

const local = localAxios();
const url = '/tts/infer';

// 백엔드로부터 오디오 파일 수신 및 재생
async function receiveAudioFromBackend() {
  try {
    local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
    const response = await local.post(`${url}`, { responseType: 'arraybuffer' });
    
    // 이진 데이터를 Blob 객체로 변환
    const audioBlob = new Blob([response.data], { type: 'audio/mp3' }); // MIME 타입은 오디오 파일 형식에 맞게 설정
    const audioUrl = URL.createObjectURL(audioBlob);

    // 오디오 재생
    const audioPlayer = new Audio(audioUrl);
    await audioPlayer.play();
  } catch (error) {
    console.error(error);
  }
}

export {
  receiveAudioFromBackend,
}
