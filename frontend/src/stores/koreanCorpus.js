import Papa from 'papaparse';

// CSV 파일 로드 및 파싱 함수
export function loadKoreanCorpus() {
    return new Promise((resolve, reject) => {
        // public 폴더 내 CSV 파일의 URL
        const csvFileUrl = '/korean_corpus.csv';

        Papa.parse(csvFileUrl, {
            download: true,
            header: false,
            complete: function(results) {
                const dataWithIds = results.data.map((row, index) => ({
                    id: index,
                    sentence: row[0],
                    number: row[1]
                }));
                resolve(dataWithIds);
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}
