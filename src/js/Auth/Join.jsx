/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import "./join.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import logo from '../../images/logo.png';
import { useNavigate } from "react-router-dom";

function Join() {
  const [email, setInputEmail] = useState("");
  const [pass, setInputPw] = useState("");
  const [pass2, setInputPw2] = useState("");
  const [nickname, setInputnickname] = useState("");
  const [sex, setInputSex] = useState("");
  const [birth, setInputBirth] = useState("");
  const [phone, setInputPhone] = useState("");
  const [idMes, setIdMes] = useState("");
  const [passMes, setPassMes] = useState("");
  const [nickNameMes, setNickNameMes] = useState("");
  let [id_, setId] = useState();
  let [pass_, setPass] = useState();
  let [nickname_, setNickName] = useState();

  const navigate = useNavigate();

  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
  };

  const clickBtn = (params, e) => {
    if(params === "/") {
        navigate('/');
    } else if(params === "Join") {
        navigate('/join');
    }
};

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const handleInputPw2 = (e) => {
    setInputPw2(e.target.value);
  };

  const handleInputnickname = (e) => {
    setInputnickname(e.target.value);
  };

  const handleInputSex = (e) => {
    setInputSex(e.target.value);
  };

  const handleInputBirth = (e) => {
    setInputBirth(e.target.value);
  };

  const handleInputPhone = (e) => {
    setInputPhone(e.target.value);
  };

  const idCheck = () => {
    // axios
    //   .post("/idCheck", { email: email })
    //   .then((idRes) => {
    //     console.log(idRes);
    //     console.log("idRes.data :: ", idRes.data);

    //     if (idRes.data == 1) {
    //       setIdMes("가능");
    //       setId(1);
    //     } else if (idRes.data == 0) {
    //       setIdMes("불가능");
    //       // alert("아이디중복됨")
    //       document.getElementById("email").focus();
    //       setId(0);
    //     }
    //   })
    //   .catch();
      
  };

  const pwCheck = () => {
    // axios
    //   .post("/passCheck", { pass: pass, pass2: pass2 })
    //   .then((passRes) => {
    //     console.log(passRes);
    //     console.log("passRes.data :: ", passRes.data);

    //     if (passRes.data == 1) {
    //       setPassMes("일치");
    //       setPass(1);
    //     } else if (passRes.data == 0) {
    //       setPassMes("불일치");
    //       setPass(0);
    //     }
    //   })
    //   .catch();
  };

  const nickCheck = () => {
    // axios
    //   .post("/nickname", { nickname: nickname })
    //   .then((nickRes) => {
    //     console.log(nickRes);
    //     console.log("nickRes.data :: ", nickRes.data);

    //     if (nickRes.data == 1) {
    //       setNickNameMes("가능");
    //       setNickName(1);
    //     } else if (nickRes.data == 0) {
    //       setNickNameMes("중복");
    //       setNickName(0);
    //     }
    //   })
    //   .catch();
  };

  const onClickJoin = () => {
    // alert(email, pass, pass2, nickname, sex, birth, phone)
        console.log("click Join");
        console.log("email : ", email);
        console.log("PW : ", pass);
        console.log("PW2 : ", pass2);
        console.log("nickname : ", nickname);
        if (pass !== pass2) {
          alert("입력하신 비밀번호가 일치하지 않아요!");
          return;
        }
        axios
          .post("/api/signup", {
            nickname: nickname,
            username: email,
            password: pass,
          })
          .then((joinRes) => {
            console.log("!!", joinRes);
              Swal.fire({
                icon: 'success',
                title: '회원가입이 성공적으로 되었어요!',
                // timer: 100000,
            }).then((q) => {
              if(q.isConfirmed){
                navigate('/');
              }
            }
            );
          })
          .catch((error) => {
            alert(`에러가 발생했어요! ${error}`);
          });
  };
  
  return (
	<div className="JoinForm">
      <div className="navLogo" onClick={(e) => {clickBtn("/", e)}}>
        <img src={logo} alt="홈페이지 로고" className="logo_header"/>
      </div>
	  {/* <div className="InputName">
	  	<input type="text" path="name" placeholder="이름" id="name" name="name" value={name} onChange={handleInputName} />
	  </div> */}
        <div className="InputId">
	  	<input type="text" path="email" placeholder="아이디" id="email" name="email" value={email} onChange={handleInputEmail} onKeyUp={idCheck}/>
      <div style={ id_ == 0 ? {display:"block"} : {display:"none"}}>아이디가 중복됩니다</div>
	  </div>
    <div className="InputNickName">
	  	<input type="text" path="nickname" placeholder="닉네임" id="nickname" name="nickname" value={nickname} onChange={handleInputnickname} onKeyUp={nickCheck} />
      <div style={ nickname_ == 0 ? {display:"block"} : {display:"none"}}>닉네임이 중복됩니다</div>
	  </div>
    <div className="InputPw">
	  	<input type="password" path="pass" placeholder="비밀번호" id="pass" name="pass" value={pass} onChange={handleInputPw} />
	  </div>
	  <div className="InputPwCheck">
	  	<input type="password" path="pass2" placeholder="비밀번호 확인" id="pass2" name="pass2" value={pass2} onChange={handleInputPw2} onKeyUp={pwCheck} />
      <div style={ pass_ === 0 ? {display:"block"} : {display:"none"}}>비밀번호가 일치하지 않습니다</div>
	  </div>
	  <button className="LoginBtn" onClick={onClickJoin} css={css`
      ${(email && nickname && pass && pass2) ? css`
      filter: grayscale(0%);
      cursor: pointer;
      ` : css`filter: grayscale(100%)`}
      border: none;
      transition: 0.4s all;
      width: 25em;
    `} disabled={(email && nickname && pass && pass2) ? false : true}>가입하기</button>
	</div>
  )
}

export default Join;
