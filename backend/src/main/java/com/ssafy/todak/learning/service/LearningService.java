package com.ssafy.todak.learning.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

@Service
public class LearningService {
    @Value("http://127.0.0.1:5050")
    private String flaskServerUrl;  // Flask 서버의 URL을 application.properties에서 읽어옵니다.

    public void connectFlask(int recordId, int memberId, String s3){
        // 플라스크 통신
        // Flask 서버의 엔드포인트 URL
        String flaskLearningUrl = flaskServerUrl + "/learning-server/get";

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON); // JSON 형식으로 데이터 전송

        // 보낼 문자열 데이터
        String data = "{\"record_id\": \"" + recordId + "\", \"member_id\": \"" + memberId + "\", \"s3_url\": \"" + s3 + "\"}";

        // RestTemplate을 사용하여 플라스크 서버에 POST 요청 전송
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> requestEntity = new HttpEntity<>(data, headers);
        restTemplate.postForEntity(flaskLearningUrl, requestEntity, String.class);

        // 반환값 없이 성공 상태 코드만 반환
        System.out.println(ResponseEntity.noContent().build().toString());
    }

    public void processZipFromS3(String s3Url, String uploadPath) throws IOException {
        // URL 연결 설정
        URL url = new URL(s3Url);
        URLConnection conn = url.openConnection();

        // InputStream을 사용하여 S3에서 직접 파일을 처리
        try (InputStream inputStream = conn.getInputStream(); ZipInputStream zipIn = new ZipInputStream(inputStream)) {
            // 압축을 푸는 동안 파일을 읽고 특정 위치에 저장
            ZipEntry entry = zipIn.getNextEntry();
            while (entry != null) {
                String filePath = uploadPath + File.separator + entry.getName();
                if (!entry.isDirectory()) {
                    // 파일인 경우, 압축을 푼 후 해당 파일에 데이터를 쓰기 위해 FileOutputStream을 사용합니다.
                    extractFile(zipIn, filePath);
                } else {
                    // 디렉토리인 경우, 디렉토리를 생성합니다.
                    File dir = new File(filePath);
                    dir.mkdir();
                }
                zipIn.closeEntry();
                entry = zipIn.getNextEntry();
            }
        }
    }

    private void extractFile(ZipInputStream zipIn, String filePath) throws IOException {
        try (BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(filePath))) {
            byte[] bytesIn = new byte[4096];
            int read;
            // 압축을 푸는 동안 파일에서 데이터를 읽고 새로 생성된 파일에 데이터를 씁니다.
            while ((read = zipIn.read(bytesIn)) != -1) {
                bos.write(bytesIn, 0, read);
            }
        }
    }

    public void zipFile(File sourceFile, File zipFile) throws IOException {
        FileOutputStream fos = new FileOutputStream(zipFile);
        ZipOutputStream zos = new ZipOutputStream(fos);

        // 파일을 압축하여 zip 파일에 추가
        addToZip(sourceFile, sourceFile.getName(), zos);

        zos.close();
        fos.close();
    }

    private void addToZip(File file, String fileName, ZipOutputStream zos) throws IOException {
        if (file.isDirectory()) {
            // 디렉토리인 경우, 디렉토리 내의 파일 및 하위 디렉토리를 압축
            File[] files = file.listFiles();
            if (files != null) {
                for (File subFile : files) {
                    addToZip(subFile, fileName + "/" + subFile.getName(), zos);
                }
            }
        } else {
            // 파일인 경우, 파일을 zip 파일에 추가
            FileInputStream fis = new FileInputStream(file);
            ZipEntry zipEntry = new ZipEntry(fileName);
            zos.putNextEntry(zipEntry);

            byte[] buffer = new byte[1024];
            int length;
            while ((length = fis.read(buffer)) > 0) {
                zos.write(buffer, 0, length);
            }

            fis.close();
        }
    }

    // ------------------------------------------------------------------------------------------------------
// 재귀적으로 폴더 및 하위 파일 및 폴더 삭제
    private static void deleteDirectory(File directory) {
        File[] files = directory.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    deleteDirectory(file);
                } else {
                    file.delete();
                }
            }
        }
        directory.delete(); // 폴더 삭제
    }

    public void getLoading(int time) {
        // 30초 대기
        try {
            Thread.sleep(time); // 30초를 밀리초로 변환
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public void resetDirectory(String uploadPath) {
        // 폴더 내 모든 파일 및 폴더 목록 가져오기
        File directory = new File(uploadPath);
        File[] files = directory.listFiles();

        // 모든 파일 및 폴더 삭제
        if (files != null) {
            for (File f : files) {
                if (f.isDirectory()) {
                    deleteDirectory(f);
                } else {
                    f.delete();
                }
            }
        }
    }

    public String uploadZipFileToS3(File zipFile, String bucketName, String keyName) {
        // AWS 인증 정보 설정 (Access Key와 Secret Key)
        String accessKey = "AKIAZI2LJFA7IEBRH2O5";
        String secretKey = "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";
        BasicAWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);

        // AWS 리전 및 엔드포인트 설정
        String region = "ap-northeast-2"; // 예: "us-west-1"
        String endpoint = "https://s3-ap-northeast-2.amazonaws.com/todaktodak"; // 예: "https://s3-us-west-1.amazonaws.com"

        // AmazonS3 클라이언트 빌더 생성 및 구성
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(endpoint, region))
                .build();

        // PutObjectRequest를 생성하여 Zip 파일을 S3에 업로드
        PutObjectRequest objectRequest = new PutObjectRequest(bucketName, keyName, zipFile);

        // 파일 업로드 요청
        s3Client.putObject(objectRequest);
        String s3Url = s3Client.getUrl(bucketName, keyName).toString();

        // 업로드 성공 메시지 출력
        System.out.println("Zip 파일이 성공적으로 S3에 업로드되었습니다.");

        return s3Url;
    }

}
