from flask import Flask, request, send_from_directory, jsonify, render_template
import os
from werkzeug.utils import secure_filename
import requests
import traceback, boto3
from zipfile import ZipFile
import time

app = Flask(__name__)

# 업로드할 파일의 확장자를 제한합니다.
ALLOWED_EXTENSIONS = {'zip'}

# 주피터 허브 url => 수정 ************ 
jupyter_hub_url = "http://70.12.130.121:8888"

# 스프링부트 url
spring_boot_url = "http://localhost:8080"

# AWS 계정의 액세스 키와 시크릿 키 설정
ACCESS_KEY = 'AKIAZI2LJFA7IEBRH2O5'
SECRET_KEY = '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'

 # S3 버킷 이름
BUCKET_NAME = 'todaktodak'


# 스프링부트에서 녹음 파일이 저장된 S3 url 받음 - 학습 시작
@app.route('/learning-server/get', methods=['POST'])
def receive_message():
    # POST 요청에서 전송된 데이터 가져오기
    data = request.json
    
    # 전송된 데이터에서 S3 URL 추출
    s3_url = data.get('s3_url')
    record_id = data.get('record_id')
    member_id = data.get('member_id')

    # 받은 메시지 출력
    print("받은 url", s3_url)
    print("받은 record_id", record_id)
    print("받은 member_id", member_id)

    # downloadZipFile(s3_url)


    # glow 학습
    learnGlowTTS()

    # hifi 학습
    learnHifiGAN()

    # glow 결과 S3에 업로드 -> url 스프링부트로 전송
    glowUrl = uploadGlow(member_id, record_id)
    sendGlow(glowUrl, record_id)

    # hifi 결과 S3에 업로드 -> url 스프링부트로 전송
    hifiUrl = uploadHifi(member_id, record_id)
    sendHifi(hifiUrl, record_id)


    # 학습 완료
    
    return '', 204

def downloadZipFile(s3_url):
    print("s3 url: " + s3_url)

    # 임시 파일 저장 경로
    TEMP_DIR = 'C:/Users/SSAFY/Desktop/1차프로젝트/AIflask/MyDrive/Colab Notebooks/data/'


    # 파일 이름 추출
    file_name = s3_url.split('/')[-1]

    # Amazon S3에서 파일 다운로드
    file_path = os.path.join(TEMP_DIR, file_name)
    response = requests.get(s3_url)
    with open(file_path, 'wb') as f:
        f.write(response.content)

def learnGlowTTS():
    print("Glow 학습!")

def learnHifiGAN():
    print("Hifi 학습!")


def uploadGlow(member_id, record_id):
    DRIVE_FOLDER_PATH = 'C:/Users/SSAFY/Desktop/1차프로젝트/AIflask/MyDrive/Colab Notebooks/data/glowtts-v2/'

    # 필터링된 파일 목록을 담을 리스트
    selected_files = []

    # 디렉토리에서 glow로 시작하는 폴더 찾기
    folders = []
    for root, dirs, files in os.walk(DRIVE_FOLDER_PATH):
        for directory in dirs:
            if directory.startswith('glow'):
                folder_path = os.path.join(root, directory)
                folders.append(folder_path)
    
    glow_folder = folders[0]
    print(glow_folder)

    for root, dirs, files in os.walk(glow_folder): 
        for file in files:
            # 파일 이름이 best_model로 시작하고 지정된 확장자로 끝나는지 확인
            if file.startswith('best_model') or file.endswith('.json') or file.endswith('.npy'):
                file_path = os.path.join(root, file)
                selected_files.append(file_path)
                print(file_path)
    print("glow 결과물 파일들:")
    for file_path in selected_files:
        print(file_path)


    # 압축 파일 생성
    ZIP_NAME = str(member_id) + "_" + str(record_id) + "_" + "glow.zip"
    zip_path = os.path.join(DRIVE_FOLDER_PATH, ZIP_NAME)
    print(zip_path)
    with ZipFile(zip_path, 'w') as zip:
        for file_path in selected_files:
            # 압축 파일에 추가
            zip.write(file_path, arcname=os.path.relpath(file_path, glow_folder))


    # time.sleep(35)  # 35초 동안 일시 정지

    return uploadS3(ZIP_NAME, 'C:/Users/SSAFY/Desktop/1차프로젝트/AIflask/MyDrive/Colab Notebooks/data/glowtts-v2/'+ZIP_NAME)


def sendGlow(url, record_id):
    print("받은 url", url)
    print("받은 id", record_id)

    # 스프링부트 엔드포인트 설정
    endpoint = f"{spring_boot_url}/learning/{record_id}/glow"

    # 전달할 파라미터 설정
    params = {
        "url": url
    }

    try:
        # POST 요청 전송
        response = requests.post(endpoint, params=params)

        # 응답 확인
        if response.status_code == 200:
            print("스프링 부트로 요청을 성공적으로 보냈습니다.")
            return jsonify({"message": "Success"})
        else:
            print("요청에 실패했습니다. 응답 코드:", response.status_code)
            return jsonify({"message": "Failed"})
    except Exception as e:
        print("요청을 보내는 중 오류가 발생했습니다:", e)
        return jsonify({"message": "Error"})


# hifi 결과 S3에 업로드 -> url 스프링부트로 전송
def uploadHifi(member_id, record_id):
    DRIVE_FOLDER_PATH = 'C:/Users/SSAFY/Desktop/1차프로젝트/AIflask/MyDrive/Colab Notebooks/data/hifigan-v2/'

    # 필터링된 파일 목록을 담을 리스트
    selected_files = []

    # 디렉토리에서 hifi로 시작하는 폴더 찾기
    folders = []
    for root, dirs, files in os.walk(DRIVE_FOLDER_PATH):
        for directory in dirs:
            if directory.startswith('hifi'):
                folder_path = os.path.join(root, directory)
                folders.append(folder_path)
    
    hifi_folder = folders[0]
    print(hifi_folder)

    for root, dirs, files in os.walk(hifi_folder): 
        for file in files:
            # 파일 이름이 best_model로 시작하고 지정된 확장자로 끝나는지 확인
            if file.startswith('best_model_') or file.endswith('.json') or file.endswith('.npy'):
                file_path = os.path.join(root, file)
                selected_files.append(file_path)

    # 압축 파일 생성
    ZIP_NAME = str(member_id) + "_" + str(record_id) + "_" + "hifi.zip"
    zip_path = os.path.join(DRIVE_FOLDER_PATH, ZIP_NAME)
    with ZipFile(zip_path, 'w') as zip:
        for file_path in selected_files:
            # 압축 파일에 추가
            zip.write(file_path, arcname=os.path.relpath(file_path, hifi_folder))
    print("hifi 결과물 파일들:")
    for file_path in selected_files:
        print(file_path)

    # time.sleep(35)  # 35초 동안 일시 정지

    return uploadS3(ZIP_NAME, 'C:/Users/SSAFY/Desktop/1차프로젝트/AIflask/MyDrive/Colab Notebooks/data/hifigan-v2/'+ZIP_NAME)


def sendHifi(url, record_id):
    print("받은 url", url)
    print("받은 id", record_id)

    # 스프링부트 엔드포인트 설정
    endpoint = f"{spring_boot_url}/learning/{record_id}/hifi"

    # 전달할 파라미터 설정
    params = {
        "url": url
    }

    try:
        # POST 요청 전송
        response = requests.post(endpoint, params=params)

        # 응답 확인
        if response.status_code == 200:
            print("스프링 부트로 요청을 성공적으로 보냈습니다.")
            return jsonify({"message": "Success"})
        else:
            print("요청에 실패했습니다. 응답 코드:", response.status_code)
            return jsonify({"message": "Failed"})
    except Exception as e:
        print("요청을 보내는 중 오류가 발생했습니다:", e)
        return jsonify({"message": "Error"})


def uploadS3(FILE_NAME, file_path):
    # S3 클라이언트 생성
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)

     # 파일 업로드
    with open(file_path, 'rb') as file:
        s3.upload_fileobj(file, BUCKET_NAME, FILE_NAME)

    # 업로드 완료를 확인하기 위해 S3 객체 생성
    s3_resource = boto3.resource('s3', aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)
    obj = s3_resource.Object(BUCKET_NAME, FILE_NAME)


    # 업로드 완료를 확인하고 완료될 때까지 대기
    while True:
        if obj.content_length:
            break
        time.sleep(1)

    print("업로드 성공!")

    # 업로드된 파일의 URL 생성
    url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{FILE_NAME}"
    print("Uploaded file URL:", url)
    
    return url


# # 스프링부트에서 학습요청을 받으면 구글 코랩으로 학습 요청 보내기
# @app.route('/api/send', methods=['GET'])
# def send_data():
#     # 구글 코랩에 GET 요청 보내기
#     response = requests.get('YOUR_COLAB_NOTEBOOK_URL')
    
#     # 요청 결과 반환
#     return response.text


current_directory = os.getcwd()
print("현재 작업 디렉토리:", current_directory)

if __name__ == '__main__':
    app.run(debug=True, port=5050)
    
