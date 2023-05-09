import "./Board.css";
import Header from "../js/Form/Header";
import { BsPersonFill } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
import { FaRegAddressCard } from "react-icons/fa";
import { BiPencil } from "react-icons/bi";
import { TiThumbsUp } from "react-icons/ti";
import { FaRegComment } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function Board() {
  const [posts, setPosts] = useState([
    {
      username: "익명",
      subject: "코딩",
      grade: "3학년",
      title: "제목제목제목",
      content:
        "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용",
      good: 0,
      comment: 0,
    },
  ]);

  const [recommends, setRecommends] = useState([
    {
      nickname: "익명",
    },
    {
      nickname: "익명",
    },
    {
      nickname: "익명",
    },
    {
      nickname: "익명",
    },
  ]);

  const navigate = useNavigate();

  useEffect (() => {
    axios
        .get("/api/board/list",{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("tokenId")}`,
                refreshTokenId: `Bearer ${sessionStorage.getItem("refreshTokenId")}`,
            }
        })
        .then((res) => {
          const data = res.data.data;
            console.log("!!", data);
            setPosts(data);

        }).catch((err) => {
          Swal.fire({
            icon: 'error',
            title: '로그인 후 이용해주세요',
            // timer: 100000,
        }).then(result => {
          if (result.isConfirmed) {
              navigate('/login');
          }})
          console.log(err);
        })
  }, [])

  const Post = posts.map((post) => (
    <article className="board-post" key={post.id}>
      <div className="post-nickname">
        <div className="post-informations">
          <div className="post-information">
            <div className="post-info">
              <div className="post-infoInside">
                <div className="post-username">{post.writer}</div>
                <div className="post-userInfo">
                  <div className="post-userSubject">{post.subject}</div>
                </div>
              </div>
              <span className="post-time"></span>
            </div>
          </div>
        </div>
      </div>
      <a className="post-link">
        <h3 className="post-linkTitle">{post.title}</h3>
        <p className="post-content">{post.preview}</p>
        <div className="post-icons">
          <div className="post-good">
            <TiThumbsUp className="thumb" />
            <div className="thumbCount">0</div>
          </div>
          <div className="post-comment">
            <FaRegComment className="post-commentIcon" />
            <div className="post-commentCount">0</div>
          </div>
        </div>
      </a>
    </article>
  ));

  const Recommend = recommends.map((recommend) => (
    <a className="profile">
      <div className="profileName">{recommend.nickname}</div>
      <SlArrowRight className="profileLink" />
    </a>
  ));


  return (
    <>
      <div className="x"></div>
      <Header />
      <div className="board-container">
        <div className="board-subContainer">
          <div className="board-section">
            <div className="board-side">
              <div className="board-inside">
                <div className="board-myCommunity">
                  <h2 className="board-myProfile">My 커뮤니티</h2>
                  <button type="button" className="board-login">
                    <div className="board-profile">
                      <BsPersonFill className="image" />
                    </div>
                    <Link to="/login">
                      <div className="profileLogin">
                        <span className="loginText">로그인 해주세요</span>
                      </div>
                    </Link>
                    <span className="link">
                      <SlArrowRight className="arrow" />
                    </span>
                  </button>
                </div>
                <div className="board-banner">
                  <button type="button" className="communityPage">
                    <div className="bannerText">
                      "나를 잘 표현하고 싶다면?"
                      <br />
                      커뮤니티 프로필 완성하기
                    </div>
                    <div className="idCard">
                      <FaRegAddressCard className="idCardimg" />
                    </div>
                  </button>
                </div>
                <div className="recommendProfile">
                  <h3 className="recommendText1">업데이트된 추천 프로필</h3>
                  <p className="recommendText2">
                    관심있는 프로필을 찾아보세요.
                  </p>
                  <div className="profiles"> {Recommend}</div>
                  <div className="recommendReset"></div>
                </div>
              </div>
            </div>
            <main className="board-main">
              <div className="board-postTitle">
                <div className="postTitle-text">
                  <h2 className="posttitleText">게시글 목록</h2>
                </div>
              </div>
              <div className="board-mainBox">
                <Link to="/form">
                <section className="board-writePost">
                  <button type="button" className="board-writeBtn">
                    "자신의 커리어에 대해 자유롭게 이야기 해주세요!"
                    <span className="writeIcon">
                      <BiPencil className="pencil" />
                    </span>
                  </button>
                </section>
                </Link>
                <section className="board-posts">
                  {Post}
                </section>
              </div>
            </main>
            <div className="board-floatingButton">
              <Link to="/form">
              <button type="button" className="board-writeButton">
                <BiPencil className="board-pencilButton" />
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
