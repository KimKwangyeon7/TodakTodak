package com.ssafy.todak.common;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class WeatherLoader {

    @Value("${openweathermap.key}")
    private String apiKey;

    // 광주 날씨 호출
    public String getWeatherString(){
        String apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=gwangju&appid=" + apiKey;

        try {
            URL url = new URL(apiUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();  //  apiUrl을 HttpURL 형식으로 연결
            connection.setRequestMethod("GET"); // get 요청
            int responseCode = connection.getResponseCode();   // 요청을 보낸 다음에 받아온 응답 결과를 응답 코드(상태 코드)로 받아올 수 있다.

            BufferedReader br;
            if(responseCode == 200){    // 정상
                br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            }else{
                br = new BufferedReader(new InputStreamReader(connection.getErrorStream()));
            }

            String inputLine;
            StringBuilder response = new StringBuilder();   // 결괏값을 response에 쌓는다.

            while((inputLine = br.readLine()) != null){
                response.append(inputLine);
            }
            br.close();
            return response.toString();
        } catch (Exception e) {
            return "failed to get response!";
        }
    }

//    // temp(온도), main, icon을 Map형태로 반환해준다.
//    private Map<String, Object> parseWeather(String jsonString){
//
//        JSONParser jsonParser = new JSONParser();
//        JSONObject jsonObject;  // parsing 결괏값
//
//        try{
//            jsonObject = (JSONObject) jsonParser.parse(jsonString);     // 파싱 결과
//        }catch (ParseException e){
//            throw new RuntimeException(e);
//        }
//
//        Map<String, Object> resultMap = new HashMap<>();
//        JSONObject mainData = (JSONObject) jsonObject.get("main");          // main의 value
//        resultMap.put("temp", mainData.get("temp"));
//        JSONObject weatherData = (JSONObject) jsonObject.get("weather");   //
//        resultMap.put("main", mainData.get("main"));
//        resultMap.put("icon", mainData.get("icon"));
//        return resultMap;
//    }

    // temp(온도), main, icon을 Map형태로 반환해준다.
    public Map<String, Object> parseWeather(String jsonString){

        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject;  // parsing 결괏값

        try{
            jsonObject = (JSONObject) jsonParser.parse(jsonString);     // 파싱 결과
        }catch (ParseException e){
            throw new RuntimeException(e);
        }

        Map<String, Object> resultMap = new HashMap<>();
        JSONObject mainData = (JSONObject) jsonObject.get("main");
        int temp = (int) ((double) mainData.get("temp") - 273.15);
        resultMap.put("temp", temp);
        JSONArray weatherArray = (JSONArray) jsonObject.get("weather");   //
        JSONObject weatherData = (JSONObject) weatherArray.get(0);   //
        resultMap.put("main", weatherData.get("main"));
        String iconImg = "https://openweathermap.org/img/wn/" + weatherData.get("icon") + "@2x.png";
        resultMap.put("icon", iconImg);
        return resultMap;
    }


}