document.addEventListener('DOMContentLoaded', function () {
   const joinForm = document.getElementById('join');
 
   joinForm.addEventListener('submit', function (event) {
     event.preventDefault(); // 폼의 기본 동작을 중지
 
     // 필요한 사용자 정보 수집
     const id = document.getElementById('id').value;
     const pw = document.getElementById('pw').value;
     const pwCheck = document.getElementById('pwCheck').value;
     const name = document.getElementById('name').value;
     const email = document.getElementById('email').value;
     const consent = document.querySelector('input[name="check"]:checked').value;
 
     // 서버로 전송할 데이터를 객체로 생성
     const userData = {
       id: id,
       pw: pw,
       pwCheck: pwCheck,
       name: name,
       email: email,
       consent: consent
     };
 
     // 백엔드 서버 URL 설정
     const serverUrl = 'http://127.0.0.1:8000/user/user/signup/'; 
     // AJAX 또는 Fetch API를 이용하여 데이터를 백엔드로 전송
     fetch(serverUrl, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(userData)
     })
     .then(response => response.json())
     .then(data => {
       // 서버 응답에 따른 처리
       console.log(data); // 서버 응답을 콘솔에 출력하거나 필요한 동작을 수행
     })
     .catch(error => {
       console.error('Error:', error);
     });
   });
 });
 
//회원가입 유효성검사
// 자원을 화면에 로드하게 되면 수행할 동작(==function)
window.onload = function() {
   var join = document.join; //form데이터를 모두 join변수에 저장
   
   // 유효성검사할 부분을 class로 부여했기에 check class 태그를 모두 input에 저장 가져옴
   // 이때 input 한 태그당 배열 인덱스로 받는다.
   var input = document.querySelectorAll('.check');

   // 오류 문구 //errorId : span의 id들(각 요소마다 나타낼 오류를 표시하기 위함)
   // error : class list의 하위 span을 모두 불러냄(일괄 처리를 위함 - 반복문)
   var errorId = [ "idError", "pwError", "pwCheckError", "nameError", "phoneNumError", "emailError" ];
   var error = document.querySelectorAll('.list > span');

   
   // 오류문구 초기화 메서드
   // 오류 표시 후, 사용자가 올바르게 수정을 하면 텍스트가 사라지는 모습을 구현
   function innerReset(error){
      for (var i = 0; i < error.length; i++) {
         error[i].innerHTML = "";
      }
   }

   // 초기화 메서드 호출
   innerReset(error);

   // [ ID 입력문자 유효성검사 ] 
   join.id.onkeydown = function(){
      innerReset(error); // 초기화 메서드 호출
      var idLimit = /^[a-zA-Z0-9-_]{5,20}$/; //정규식 5~20자 (a~z, A~Z, 0~9, -, _만 입력가능)
      if (!idLimit.test(input[0].value)) { //입력값과 정규식 범위와 같지 않다면
         // id의 오류 문구삽입
         document.getElementById(errorId[0]).innerHTML = "5~20자의 영문 소대문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";

      }
   }
   // [ PW 입력문자 유효성검사 ]
   join.pw.onkeydown = function(){
      innerReset(error); // 초기화 메서드 호출
      var pwLimit = /^[a-zA-Z0-9~!@#$%^&*()_-]{10,20}$/; //정규식(a~z, A~Z, 0~9, ~!@#$%^&*()_- 만 입력가능)
      if (!pwLimit.test(input[1].value)) { //입력값과 정규식 범위와 같지 않다면
         // pw의 오류 문구삽입
         document.getElementById(errorId[1]).innerHTML = " 10~20자의 영문 소대문자, 숫자와 특수기호 '~!@#$%^&*()_-'만 사용 가능합니다.";
      }   
   }
   // [ PW 재확인 입력문자 초기화 ]
   //비밀번호 동일여부는 submit 버튼 클릭시 검사해줄 예정
   join.pwCheck.onkeydown = function(){
      // pw의 오류 문구삽입
      innerReset(error);// 오류문구 초기화   
   }
      
      // [ 이메일 입력 유효성검사 ] 
      join.email.onkeydown = function(){ //입력값과 정규식 범위와 같지 않다면
         innerReset(error); // 초기화 메서드 호출
         var emailLimit = /[0-9a-zA-Z-_.]/; // 정규식 0~9, a~z, A~Z, -, _, .내에서만 입력가능
            if (!emailLimit.test(input[5].value)) {  //입력값과 정규식 범위와 같지 않다면
               // 이메일의 오류 문구삽입
               document.getElementById(errorId[5]).innerHTML = " 올바른 형식이 아닙니다. 영문,숫자, (-)(_)(.) 입력만 가능합니다.";
            }
         }
      }



//submit 실행시 수행할 동작
join.onsubmit = function() { //join에서 submit이 실행된다면 수행할 함수           
   var errorStr = [ " 아이디를", " 비밀번호를", " 비밀번호 확인을", " 성함을", " 휴대폰번호를", " 이메일을" ];
   
   innerReset(error); // 오류문구 초기화
   
   // [ input 공백확인 ]
   for (var i = 0; i < input.length - 1; i++) { // -1 == submit제외 
      if (!input[i].value) { 
         document.getElementById(errorId[i]).innerHTML = errorStr[i]+ " 입력해 주세요.";
         input[i].focus(); // 포커스 이동
         return false; // 종료 (포커스 이동유지를 위해 false 종료)
      }
   }         
   
   // [주소 input 공백확인]
   {//지역변수 스코프 조정(address) -일회성사용
      var inputAddress = document.querySelectorAll('.addressCheck');
      for(var i = 0; i < inputAddress.length; i++){
         //console.log(inputAddress[i]);
         if(!inputAddress[i].value){
            document.getElementById("addressError").innerHTML = " 주소 혹은 상세주소를 입력해주세요.";
            return false;   
         }
      }
   }
   //유효성검사) 비밀번호 재확인
   if (join.pw.value != join.pwCheck.value) {
      document.getElementById("pwCheckError").innerHTML = " 비밀번호가 일치하지 않습니다.";
      join.pwCheck.focus(); // 포커스 이동
      return false;
   }

   // 정규식 변수 모음     
   var idLimit = /^[a-zA-Z0-9-_]{5,20}$/; //정규식(a~z, A~Z, 0~9, -, _만 입력가능)
   var pwLimit = /^[a-zA-Z0-9~!@#$%^&*()_-]{10,20}$/;///[a-zA-Z0-9]{10, 20}/; //정규식(a~z, A~Z, 0~9,~!@#$%^&*()_-특수문자 만 입력가능)
   var pnumLimit =  /^01[0|1|6|7|8|9]{1}[0-9]{8}$/; // 01로 시작, 0,1,6,7,8,9 중 한자리, 0~9에서 8자리 입력
   var emailLimit = /[0-9a-zA-Z-_.]/; // 정규식 0~9, a~z, A~Z, -, _, .내에서만 입력가능

   // [ ID 유효성검사 ]
   if (!idLimit.test(input[0].value)) {
      document.getElementById(errorId[0]).innerHTML = " 5~20자의 영문 소대문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";
      join.id.focus(); // 포커스 이동
      return false;
   }

   // [ PW 유효성검사 ]
   if (!pwLimit.test(input[1].value)) {
      document.getElementById(errorId[1]).innerHTML = " 10~20자의 영문 소대문자, 숫자와 특수기호 '~!@#$%^&*()_-'만 사용 가능합니다.";
      //console.log(input[1].value);
      //console.log(pwLimit.test(input[1].value));
      join.pw.focus(); // 포커스 이동
      return false;
   }         


  // [ email 아이디 유효성검사 ]
   if (!emailLimit.test(input[5].value)) { 
      document.getElementById(errorId[5]).innerHTML = " 올바른 형식이 아닙니다. 영문,숫자, (-)(_)(.) 외 입력은 불가합니다.";
      join.email.focus(); // 포커스 이동
      return false;
   }

  // [ email 주소선택 유효성검사 ]
   if (document.getElementById("mail_Select").value=="이메일 선택") { 
      document.getElementById(errorId[5]).innerHTML = " 이메일을 선택해주세요.";
      return false;
   }
   //console.log(document.getElementById("mail_Select").value);
   
   // 개인정보 동의박스 체크
   var consentCheck = document.getElementById("check");
   //console.log(consentCheck);
   if(!consentCheck.checked){
      document.getElementById("consentError").innerHTML = "개인정보 수집이용 동의를 해주세요.";
      return false;
   }
   
   alert("회원가입이 완료되었습니다. 참치라이더의 멤버가 되신 것을 환영합니다!! :D");


}