# from flask import Flask, request, send_from_directory, jsonify, render_template
# import os
# from werkzeug.utils import secure_filename
# import requests
# import traceback

# app = Flask(__name__)

# # 업로드할 파일의 확장자를 제한합니다.
# ALLOWED_EXTENSIONS = {'zip'}

# # 주피터 허브 url => 수정 ************ 
# jupyter_hub_url = "http://70.12.130.121:8888"

# # 스프링부트 url
# spring_boot_url = "http://localhost:8080"

# @app.route('/')
# def show_image():
#     # 이미지의 URL을 변수에 저장합니다. 이 부분에서 실제로는 S3에서 이미지의 URL을 가져와야 합니다.
#     image_url = "https://todaktodak.s3.ap-northeast-2.amazonaws.com/p_2_7782518a-b636-4068-83d0-2362c371dcba_%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.jpeg"
#     # render_template 함수를 사용하여 index.html을 렌더링하고, 이미지의 URL을 템플릿에 전달합니다.
#     return render_template('index.html', image_url=image_url)




# # 스프링부트에서 녹음 파일이 저장된 S3 url 받음 -> 딥러닝 서버로 전달
# @app.route('/learning-server/get', methods=['POST'])
# def receive_message():
#     # POST 요청에서 전송된 데이터 가져오기
#     data = request.json
    
#     # 전송된 데이터에서 S3 URL 추출
#     s3_url = data.get('s3_url')

#     # 받은 메시지 출력
#     print("받은 url", s3_url)

#     # Google Colab에 전송할 데이터 준비
#     payload = {"s3_url": s3_url}

#     # Google Colab에 전송
#     colab_url = 'https://colab.research.google.com/drive/1EXkBxfgWbTBfoDtMAqoKHX5dK9G9f7uq'  # 수정 필요
#     response = requests.post(colab_url, json=payload)

#     # Google Colab로부터 받은 결과 반환
#     return response.text 



# # 딥러닝 서버에서 Glow 학습결과를 저장한 S3 url 받음 -> 스프링부트로 전달
# @app.route('/glow/get', methods=['POST'])
# def send_glow_to_spring_boot():
#     # POST 요청에서 전송된 데이터 가져오기
#     data = request.json
    
#     # 전송된 데이터에서 record_id와 url 추출
#     record_id = data.get('record_id')
#     url = data.get('url')

#     print("받은 url", url)
#     print("받은 id", record_id)

#     # 스프링부트 엔드포인트 설정
#     endpoint = f"{spring_boot_url}/learning/{record_id}/glow"

#     # 전달할 파라미터 설정
#     params = {
#         "url": url
#     }

#     try:
#         # POST 요청 전송
#         response = requests.post(endpoint, params=params)

#         # 응답 확인
#         if response.status_code == 200:
#             print("스프링 부트로 요청을 성공적으로 보냈습니다.")
#             return jsonify({"message": "Success"})
#         else:
#             print("요청에 실패했습니다. 응답 코드:", response.status_code)
#             return jsonify({"message": "Failed"})
#     except Exception as e:
#         print("요청을 보내는 중 오류가 발생했습니다:", e)
#         return jsonify({"message": "Error"})

# # 딥러닝 서버에서 Gan 학습결과를 저장한 S3 url 받음 -> 스프링부트로 전달
# def sendGan(record_id, url):
#     endpoint = f"{spring_boot_url}/learning/{9}/glow"
#     params = {"url": "잘가니?"}

#     try:
#         response = requests.post(endpoint, params=params)
#         if response.status_code == 200:
#             print("스프링 부트로 요청을 성공적으로 보냈습니다.")
#         else:
#             print("요청에 실패했습니다. 응답 코드:", response.status_code)
#     except Exception as e:
#         print("요청을 보내는 중 오류가 발생했습니다:", e)



# # # record_id와 url을 적절한 값으로 대체하세요
# # record_id = 123
# # url = "http://example.com/your_zip_file_url.zip"
# # sendGlow(record_id, url)


# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# # # 업로드된 파일을 저장할 디렉토리 경로
# # upload_folder = 'path_to_upload_folder'

# # 스프링부트로부터 받은 zip파일을 주피터 허브로 POST 방식 전송
# # @app.route('/learning-server/get', methods=['POST'])
# # def receive_and_forward():
# #     # 요청에서 파일을 가져옴
# #     uploaded_file = request.files.get('file')

# #     # 업로드된 파일을 저장할 디렉토리 경로
# #     upload_folder = 'C:/zip'

# #     #업로드된 파일을 저장할 디렉토리가 존재하지 않는 경우 생성
# #     if not os.path.exists(upload_folder):
# #         os.makedirs(upload_folder)


# #     if uploaded_file and allowed_file(uploaded_file.filename):
# #         # 파일 이름을 안전하게 변환하여 저장
# #         filename = secure_filename(uploaded_file.filename)
# #         file_path = os.path.join(upload_folder, filename)
# #         uploaded_file.save(file_path)

# #         # 주피터 허브로 전송
# #         send_url = jupyter_hub_url + "/learning-server/get"
# #         files = {'file': (filename, open(file_path, 'rb'))}
# #         response = requests.post(send_url, files=files)

# #         # 응답 출력
# #         print("Response from Jupyter Hub server: ", response.text)

# #         return {"message": "File received and forwarded successfully!"}

# #     return {"message": "Invalid file format!"}

# # 스프링부트에서 학습 요청 -> 플라스크 -> 구글코랩
# # @app.route('/learning-server/get', methods=['POST'])
# # def forward_request_to_colab():
# #     # 구글 코랩의 엔드포인트 URL
# #     colab_url = 'https://colab.research.google.com/drive/1iEATU-ReRi3sLvTAicxrsKjZJavziGNb#scrollTo=JPKbMpC_h8ej'

# #     # POST 요청 보내기
# #     response = requests.post(colab_url)

# #     # 요청 결과 반환
# #     return response.text

# # 주피터 허브로부터 glow-tts 학습한 결과를 zip 파일로 받고 그 파일을 다시 스프링부트로 보내줌
# # @app.route("/learning-server/glow", methods=["POST"])
# # def upload_glowZip():
# #     try:
# #         # 전송받은 zip 파일 저장
# #         zip_file = request.files.get("file")
# #         # 경로 수정 필요 ********************************
# #         # 업로드된 파일을 저장할 디렉토리 경로
# #         upload_folder = 'C:/zip'

# #         zip_file_name = "glowtts.zip"
# #         zip_file_path = os.path.join(upload_folder, zip_file_name)

# #         zip_file.save(zip_file_path)

# #         # 스프링부트 서버 엔드포인트 URL
# #         send_url = spring_boot_url + "/learning/glow"

# #         # 파일 전송
# #         files = {"file": open(zip_file_path, "rb")}
# #         response = requests.post(send_url, files=files)

# #         # 응답 확인
# #         if response.status_code == 200:
# #             return jsonify({"message": "Zip file uploaded successfully."})
# #         else:
# #             return jsonify({"message": f"Failed to upload zip file. Server returned {response.status_code}."})

# #     except Exception as e:
# #         return jsonify({"error": str(e)})


# # # 주피터 허브로부터 hifi-gan 학습한 결과를 zip 파일로 받고 그 파일을 다시 스프링부트로 보내줌
# # def send_chunks(file_path, url):
# #     chunk_size = 1024 * 1024  # 1MB 단위로 청크를 나누어 전송
# #     with open(file_path, 'rb') as file:
# #         while True:
# #             chunk = file.read(chunk_size)  # 파일을 청크로 읽음
# #             if not chunk:  # 더 이상 청크가 없으면 종료
# #                 break
# #             response = requests.post(url, files={'file': chunk})  # 각 청크를 요청에 첨부하여 전송
# #             if response.status_code != 200:
# #                 return False  # 전송 실패 시 False 반환
# #     return True  # 전송 성공 시 True 반환

# # @app.route("/learning-server/gan", methods=["POST"])
# # def upload_ganZip():
# #     try:
# #         # 전송받은 zip 파일 저장
# #         zip_file = request.files.get("file")
# #         # 업로드된 파일을 저장할 디렉토리 경로
# #         upload_folder = 'C:/zip'

# #         zip_file_name = "hifigan.zip"
# #         zip_file_path = os.path.join(upload_folder, zip_file_name)

# #         zip_file.save(zip_file_path)

# #         # 스프링부트 서버 엔드포인트 URL
# #         send_url = spring_boot_url + "/learning/gan"

# #         # 파일을 바이트 스트림으로 읽어서 전송
# #         with open(zip_file_path, 'rb') as file:
# #             file_bytes = file.read()
# #             response = requests.post(send_url, data=file_bytes)

# #         # 응답 확인
# #         if response.status_code == 200:
# #             return jsonify({"message": "Zip file uploaded successfully."})
# #         else:
# #             return jsonify({"message": f"Failed to upload zip file. Server returned {response.status_code}."})

# #     except Exception as e:
# #         # 예외가 발생하면 트레이스백을 기록
# #         traceback.print_exc()
# #         # 클라이언트에게 오류 메시지 전달
# #         return jsonify({"error": "Internal server error. Please check server logs for more information."})

# # 스프링부트에서 학습요청을 받으면 구글 코랩으로 학습 요청 보내기
# @app.route('/api/send', methods=['GET'])
# def send_data():
#     # 구글 코랩에 GET 요청 보내기
#     response = requests.get('YOUR_COLAB_NOTEBOOK_URL')
    
#     # 요청 결과 반환
#     return response.text

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=9900)
    
