document.getElementById("kakaoLoginButton").addEventListener("click", function() {
    // Django ������ API ��û ������
    fetch("http://localhost:8000/oauth/user/kakao/login")
        .then(response => response.json())
        .then(data => {
            // ��û�� �������� �� ����Ǵ� �κ�
            console.log("���� ����:", data);
            // ���� ó�� �ڵ带 �߰��ϼ���
        })
        .catch(error => {
            // ��û�� �������� �� ����Ǵ� �κ�
            console.error("���� �߻�:", error);
            // ���� ó�� �ڵ带 �߰��ϼ���
        });
});



//signin
document.getElementById("loginButton").addEventListener("click", function() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // ���̵�� ��й�ȣ�� Django ������ ����
    var data = {
        username: username,
        password: password
    };

    fetch("http://127.0.0.1:8000/user/user/signin:", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // ���� ���� ó��
        console.log("���� ����:", data);
    })
    .catch(error => {
        console.error("���� �߻�:", error);
    });
});


