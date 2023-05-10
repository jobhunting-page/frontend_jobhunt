/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import "./join.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import logo from '../../images/logo.png';
import { useNavigate } from "react-router-dom";
import qs from 'qs';
import { useRef } from 'react';

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
  const emailRef = useRef(null);
  let [id_, setId] = useState();
  let [pass_, setPass] = useState();
  let [nickname_, setNickName] = useState();
  const [emailCheck, setEmailCheck] = useState();
  const [emailFirstClick, setEmailFirstClick] = useState(false);
  const [code, setCode] = useState();
  const [codeInput, setCodeInput] = useState('');
  const [isConfirm, setConfirm] = useState(0);
  const [isActive, setIsActive] = useState(0);
  const [emailWaiting, setEmailWaiting] = useState(true);

  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const time = useRef(180);
  const timerId = useRef(null);
  const [timerState, setTimerState] = useState(false);

  useEffect(() => {
    if (min === 0 && sec  === 0) {
      if (time.current <= 0) {
        alert("시간이 초과되었습니다, 다시 메일을 전송해주세요!");
        setCodeInput('');
        setEmailWaiting(true);
        setTimerState(false);
        time.current = 180;
        console.log(time);
        clearInterval(timerId.current);
      }
    }
  }, [sec]);

  useEffect(() => {
    if (timerState) {
      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      timerId.current = setInterval(() => {
        setMin(parseInt(time.current / 60));
        setSec(time.current % 60);
        time.current -= 1;
      }, 1000);
      return () => clearInterval(timerId.current);
    }
  }, [timerState])

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

  const handeInputEmailCheck = (e) => {
    setEmailCheck(e.target.value);
  }

  const handeInputCode = (e) => {
    setCodeInput(e.target.value);
  }

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

  const onClickEmailCheck = () => {
    console.log(emailRef.current.innerText);
    setIsActive(0);
    const EMAIL_REGEX = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (!emailCheck.match(EMAIL_REGEX)) {
      alert("정확한 이메일을 입력해주세요!");
      return;
    } else {
      time.current = 180;
      setTimerState(!timerState);
      setEmailFirstClick(true);

      const jsonData = JSON.stringify(emailCheck);
      axios({
        method: 'post',
        url: '/api/mail',
        headers: {
          'Content-Type': 'application/json'
        },
        data: jsonData
      }).then((res) => {
        alert("인증번호가 담긴 메일을 이메일로 보내드렸어요!");
        setEmailWaiting(false);
        setEmailFirstClick(false);
        setTimerState(true);
        const data = res.data;
        console.log(data);
        setCode(data);
        setConfirm(1);
        console.log(emailWaiting);
      }).catch((err) => {
        alert("에러가 발생했어요, 관리자에게 문의해주세요!", err);
      })
      setEmailWaiting(true);
    }
  }
  const onClickCodeCheck = () => {

    if (code == codeInput) {
      alert("인증이 완료되었습니다!");
      clearInterval(timerId.current);
      setCodeInput('');
      setIsActive(1);
      setEmailWaiting(true);
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: '인증번호가 올바르지 않습니다!',
    })
    }
  }

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
                navigate('/login');
              }
            }
            );
          })
          .catch((error) => {
            if (error.code === "ERR_BAD_REQUEST") {
              alert("이미 존재하는 계정입니다, 관리자에게 문의해주세요!");
            }
            console.log(error);
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
    <div className="InputEmail">
	  	<input type="text" path="emailCheck" placeholder="이메일 인증" id="emailCheck" name="emailCheck" disabled={!emailWaiting ? true : false} value={emailCheck} onChange={handeInputEmailCheck} required css={css`
        ${!emailWaiting ? css`
        background-color: #f4f4f5;
        color: #969696;
        filter: grayscale(100%);` : 
        css`
        background-color: transparent;
        color: black;
        filter: grayscale(0%);
        `
      }
      `}/>
      <button className="EmailBtn" onClick={onClickEmailCheck} disabled={!(emailCheck  && emailWaiting) || emailFirstClick ? true : false} ref={emailRef}> {emailFirstClick ? `요청중..` : `이메일 전송`}</button>
    </div>
    {isActive === 1 ?
    <div className="InputEmail" css={css`
      font-family: 'Pretendard-Medium';
      color: #11BD7E;
      font-size: 14px;
      padding-left: 0.5em;
      margin-top: 0.5em;
      margin-bottom: -1em;
    `}> 이메일 인증이 완료되었어요! </div>
    : null} 
    { !emailWaiting ? 
    <div className="InputEmail">
	  	<input type="text" path="codeInput" placeholder="인증번호" id="codeInput" name="codeInput" value={codeInput} onChange={handeInputCode} required/>
      <span css={css`
      ${!emailWaiting ? css`display: block;` : css` display: none;`}
      position: absolute;
      font-family: 'Pretendard-Medium';
      font-size: 15px;
      margin-top: 2.95em;
      margin-left: 19.3em;
    `}> 0{min}:{sec / 10 >= 1 ? sec : `0${sec}`} </span>
      <button className="EmailBtn" onClick={onClickCodeCheck} disabled={!(isConfirm)}>인증하기</button>
    </div>
    : null }
    <button css={css`
      cursor: pointer;
    `}className="LoginBtn" onClick={onClickJoin} disabled={!isActive}>가입하기</button>
	</div> 
  )
}

export default Join;