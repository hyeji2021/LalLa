document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // 폼 제출을 막음

  // 입력 필드에서 사용자 이름과 비밀번호 가져오기
  var userID = document.getElementById('userIDInput').value;
  var password = document.getElementById('passwordInput').value;

  // Fetch 요청 실행
  fetch('http://localhost:80/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userID: userID,
      password: password
    })
  })
  .then(response => response.text())
  .then(data => {
    console.log(data); // 서버로부터의 응답 출력
    // 추가로 처리할 작업 수행
  })
  .catch(error => console.log(error));
});
