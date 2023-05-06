import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000"; // API 서버 주소
axios.defaults.withCredentials = true; // 쿠키를 전달하기 위한 옵션 설정

export default function Test() {
  const onClickJoin = () => {
    axios
      .post("/api/signup", {
        //email: email,
        password: "1234",
        //pass2: pass2,
        nickname: "abcdeffg",
        username: "abcdeffg",
      })
      .then((joinRes) => {
        console.log(joinRes);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <button onClick={onClickJoin}>테스트</button>
    </div>
  );
}
