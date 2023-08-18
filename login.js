document.getElementById("loginButton").addEventListener("click", function() {
    // Django 서버로 API 요청 보내기
    fetch("http://127.0.0.1:8000/user/user/signin:")
        .then(response => response.json())
        .then(data => {
            // 요청이 성공했을 때 실행되는 부분
            console.log("서버 응답:", data);
            // 응답 처리 코드를 추가하세요
        })
        .catch(error => {
            // 요청이 실패했을 때 실행되는 부분
            console.error("오류 발생:", error);
            // 오류 처리 코드를 추가하세요
        });
});