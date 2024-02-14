import axios from "axios";
import { httpStatusCode } from "./http-status";

// local vue api axios instance
function localAxios() {
  const instance = axios.create({
    // baseURL: "https://i10c210.p.ssafy.io", // run build
    baseURL: "http://i10c210.p.ssafy.io:8080", // run dev
  });

  const token = localStorage.getItem('accessToken');
  // Request 발생 시 적용할 내용.
  instance.defaults.headers.common["Authorization"] = "";
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.put["Content-Type"] = "application/json";


  return instance;S

}


export { localAxios };
