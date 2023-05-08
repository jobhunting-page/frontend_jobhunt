/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./MyPage.css";
import Header from './Form/Header';
import axios from "axios";
import Card from './components/Card';

function MyPage() {

  return (
    <div className="MyPageContent">
      <Header />
      <MyPageContent />

      
    </div>
  )
}

function MyPageContent() {
  const ID = sessionStorage.getItem("tokenId")
  const [inputData, setInputData] = useState([])
  const [myPageState, setMyPageState] = useState(false);

  useEffect(() => {
    run();
  }, [myPageState])

  const run = () => {
    axios
        .get("/api/mypage", {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("tokenId")}`,
                refreshTokenId: `Bearer ${sessionStorage.getItem("refreshTokenId")}`
            }
        })
        .then((res) => {
            // console.log("!!", res.data);
            // console.log(sessionStorage.getItem("tokenId"));
            // console.log(sessionStorage.getItem("refreshTokenId"));
            setInputData(res.data)

            // if (res.data == true) {
            //     // console.log(res.data)

            // } 
            if (res.data[0] === "false") {
                sessionStorage.removeItem("tokenId")
                // console.log(res.data);
                axios.get("/api/refresh", {
                    headers: {
                        refreshTokenId: `Bearer ${sessionStorage.getItem("refreshTokenId")}`
                    }
                }).then((res) => {
                    // console.log(res.data);
                    sessionStorage.setItem("tokenId", res.data)
                    
                    if (res.data[0] == "false"){
                        

                
                        Swal.fire({
                            title: '로그인 유효시간 종료!',
                            text: '로그인 페이지로 이동하시겠습니까?',
                            icon: 'warning',
    
                            showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
                            confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
                            cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
                            confirmButtonText: '승인', // confirm 버튼 텍스트 지정
                            cancelButtonText: '취소', // cancel 버튼 텍스트 지정
    
                            reverseButtons: true, // 버튼 순서 거꾸로

                            
    
                        }).then(result => {

                            sessionStorage.clear()
                            // 만약 Promise리턴을 받으면,
                            if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
    
                                window.location.href = "/login";
                            }else{
                                window.location.href = "/";
                            }
                        });
                    }else if (res.data == sessionStorage.getItem("tokenId")) { 
                      window.location.href = "/mypage";
                    }
                })
            } 
            
        })
}

useEffect(run, []);

//   console.log(inputData);

  const jlink = (link, e) => {
    // console.log(link);

    if (link != null) {
        const jobKorea = "https://www.jobkorea.co.kr" + link;
        window.open(jobKorea);
    } else {
        window.location.href = "/";
    }
}

const bookmark = (e, companyname, plan, img, link) => {
  if (ID === null) {
      Swal.fire({
          title: '즐겨찾기 기능은 로그인 후 가능합니다!',
          text: '로그인 페이지로 이동하겠습니까?',
          icon: 'warning',

          showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
          confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
          cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
          confirmButtonText: '승인', // confirm 버튼 텍스트 지정
          cancelButtonText: '취소', // cancel 버튼 텍스트 지정

          reverseButtons: true, // 버튼 순서 거꾸로

      }).then(result => {
          // 만약 Promise리턴을 받으면,
          if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면

              window.location.href = "/login";
          }
      });
  }




  if (ID !== null) {
      var start, end

      start = plan.split('~')[0]
      end = plan.split('~')[1]

      console.log(ID, companyname, start, end, img, link);

      axios
          .post("/company-save",
              {
                  companyname: companyname,
                  companyimg: img,
                  company_start: start,
                  company_end: end,
                  company_link: link

              },{headers: {Authorization: `Bearer ${sessionStorage.getItem("tokenId")}`}}
              ).then(result => {
                
                console.log(result);
            });
  }

}

const delete_bookmark= (e, companyname, id) => {
    console.log("!!!!", id, sessionStorage.getItem("tokenId"));
  if (ID != null) {
      Swal.fire({
          title: '즐겨찾기 삭제를 하시겠습니까?',

          icon: 'warning',

          showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
          confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
          cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
          confirmButtonText: '승인', // confirm 버튼 텍스트 지정
          cancelButtonText: '취소', // cancel 버튼 텍스트 지정

          reverseButtons: true, // 버튼 순서 거꾸로

      }).then(result => {
          // 만약 Promise리턴을 받으면,
          if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면

            axios
            .delete(`/api/bookmark/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("tokenId")}`}
                },
                ).then(result => {
                    if(result.data.data === 1){
                      setMyPageState(!myPageState);
                    }
                    else{
                      console.log("삭제실패");
                    }
                })
          }
      });
  }

}

  return (
      <div class="metee_mypage_main_wraper_join_style">
            <span css={css`
                display: block;
                font-family: 'Pretendard-ExtraBold';
                font-size: 1.8em;
                letter-spacing: -0.03em;
                color: #333D4B;
            `}> 관심을 가지고 있는 채용 공고를 한 눈에 보여드려요 </span>
            <div className="Card1">
            <div css={css`
            margin-top: 3em;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            column-gap: 0.3em;
        `}>
                {inputData[0] && inputData[0].bookmark.map((v) => {
                    // console.log(v);
                let plan = v.bookMark_Start_Date + "~" + v.bookMark_End_Date;
                return <ItemBox name={v.bookMarkName} plan={plan} link={v.company_link} img={v.bookMarkImg} id={v.user_bookmark_id}/>
            })}
            </div>
        </div>
          
          <div align="center" className="profile_correction">
			  </div>
    </div>
  )


  function ItemBox(props) {
    return (
        <>
        <div css={css`
            display : flex;
            width: 100%;
            height: 100%;

            justify-content: center;
        `}>
        <img src="img/delete.png" className="delete-img" width="14px" onClick={(e) => { delete_bookmark(e,props.name, props.id) }} css={css`
            margin-top: 1.2em;
            margin-right: 2em;
            position: absolute;

            cursor: pointer;
        `}/>
        <Card title={props.name} plan={props.plan} content={props.content} src={props.img} link={props.link} state={props.state} onClick={(e) => { bookmark(e, props.name, props.plan, props.img, props.link, props.bookmark) }} bookmark={inputData[0]}/>
        </div>
        </>

    )
}
}



export default MyPage;