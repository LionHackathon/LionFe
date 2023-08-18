document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector('.submit-button');
    submitButton.addEventListener('click', sendData);
});

function sendData() {
    const nameInput = document.querySelector('.name-input').value;
    const messageInput = document.querySelector('.message-input').value;

    const data = {
        name: nameInput,
        message: messageInput
    };

    fetch('http://127.0.1:8000/question/questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
        // 백엔드로부터의 응답을 처리하는 코드 작성
        console.log(responseData); // 응답 데이터를 콘솔에 출력하거나 원하는 처리를 진행할 수 있습니다.
    })
    .catch(error => {
        // 에러 처리 코드 작성
        console.error('Error:', error);
    });
}
