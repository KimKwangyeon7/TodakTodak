import axios from "axios";

// local vue api axios instance
function localAxios() {
  const instance = axios.create({
    // baseURL: "https://i10c210.p.ssafy.io", // run build
    baseURL: "http://i10c210.p.ssafy.io:8080", // run dev
    // baseURL: "http://localhost:8080", // 로컬서버

  });

  const token = localStorage.getItem('accessToken');
  // Request 발생 시 적용할 내용.
  instance.defaults.headers.common["Authorization"] = "";
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.put["Content-Type"] = "application/json";


  return instance;

}


export { localAxios };
