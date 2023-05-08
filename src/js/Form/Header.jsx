/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import "./header.css"
import React, { useState, useEffect } from 'react';
import logo from '../../images/logo.png';
import { Link, useNavigate } from "react-router-dom";

function Header() {
	const [isLogin, setIsLogin] = useState(false); //로그인 관리
	const navigate = useNavigate();

	const clickLogo = () => {
		navigate('/');
	}

	useEffect(() => {
		if (sessionStorage.getItem("tokenId") === null) {
			// sessionStorage 에 name 라는 key 값으로 저장된 값이 없다면
		} else {
			// sessionStorage 에 name 라는 key 값으로 저장된 값이 있다면
			// 로그인 상태 변경
			setIsLogin(true);
		}
	});


	return (
		<div className="Header">
		  <nav className="navbar">
			<div className="navLogo" onClick={clickLogo}>
			  <img src={logo} alt="홈페이지 로고" className="logo" />
			  {/* <span className="navLogo">JOB </span>
						<span className="navLogo" id="LogoColor">HUNTER</span> */}
			</div>
			<ul className="navMenu">
			  {/* 로그인 후 메뉴 표시 */}
			  {isLogin ? (
				<li>
				  <Link className="menu" to="/mypage">
					{"마이페이지"}
				  </Link>
				</li>
			  ) : (
				<li></li>
			  )}
			  {isLogin ? (
				<li>
				  <Link
					className="menu"
					onClick={() => {
					  sessionStorage.clear();
					  window.location.reload();
					}}
					to="/"
				  >
					{"로그아웃"}
				  </Link>
				</li>
			  ) : (
				<li>
				  <Link className="menu" to="/login">
					{"로그인"}
				  </Link>
				</li>
			  )}
			  <Link className="menu" to="/chat">
				AI상담
			  </Link>
			  <Link className="menu" to="/board">
				멘토링
			  </Link>
			</ul>
		  </nav>
		</div>
	  );
	}

export default Header;