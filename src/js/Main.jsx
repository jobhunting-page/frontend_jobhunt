/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState, useEffect, useRef } from 'react';
import Footer from './Form/Footer';
import Header from './Form/Header';
import axios from "axios";
// import news from "./json/news.json"
import "./Main.css";
import Swal from "sweetalert2";
import question from '../images/question.png';
import banner from '../images/banner.png';
import Card from './components/Card';
import { useNavigate } from 'react-router-dom';
import rocket from '../images/rocket.gif';


function Main() {
    return (
        <div className="Main">
            <Header />
            <MainContainer></MainContainer>
        </div>
    )
}

// console.log(news);
let date = new Date().getMonth() + 1 + "/" + new Date().getDate()
// console.log(date);

const ID = sessionStorage.getItem("tokenId")
const refreshTokenId = sessionStorage.getItem("refreshTokenId")

console.log(ID);
console.log(refreshTokenId);


function MainContainer() {
    const [message, setMessage] = useState('');

    const [ch, setCh] = useState(null);
    const navigate = useNavigate();


    // company 정보가 담겨있는 useState예요
    const [company, setCompany] = useState([]);

    // search 구현을 위한 사용자의 쿼리 입력 값을 담아요
    const [user, setUser] = useState("");
    const [userBookmark, setUserBookmark] = useState("");
    const [isResult, setResult] = useState(true);
    const itemRef = useRef(null);
    const inputRef = useRef(null);

    function callback(str) {
        setMessage(str);
    }

    

    useEffect(() => {

    }, [userBookmark]);

    const run = () => {
        axios
            .get("/api/home", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("tokenId")}`,
                    refreshTokenId: `Bearer ${sessionStorage.getItem("refreshTokenId")}`
                }
            })
            .then((res) => {
                // console.log(res.data);
                setUserBookmark(res.data);

                // if (res.data == true) {
                //     // console.log(res.data)

                // } 
                if (res.data[0] === 'false') {
                    sessionStorage.removeItem("tokenId")
                    console.log(res.data);
                    axios.get("/api/refresh", {
                        headers: {
                            refreshTokenId: `Bearer ${sessionStorage.getItem("refreshTokenId")}`
                        }
                    }).then((res) => {
                        console.log(res.data);
                        sessionStorage.setItem("tokenId", res.data)
                        
                        if (res.data === false){
                            
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
                        }
                    })
                } else if (res.data === "noLogin") { console.log("noLogin"); }
            })
    }

    useEffect(run, [])


    let tokenId = sessionStorage.getItem("tokenId");
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("tokenId") === null) {
            // sessionStorage 에 name 라는 key 값으로 저장된 값이 없다면
        } else {
            // sessionStorage 에 name 라는 key 값으로 저장된 값이 있다면
            // 로그인 상태 변경
            setIsLogin(true);
        }
    }, []);

    // console.log("로그인 상태 : " + isLogin);

    // 회사 정보를 불러오는 useEffect Hook!
    useEffect(() => {
        axios.get("https://raw.githubusercontent.com/jobhunting-page/jobhunt/main/companyInfo/news.json", {
        })
            .then((res) => {
                console.log("res", res);
                setCompany(() => {
                    return res.data;
                })
            });
    }, [])

    const [search, setSearch] = useState('');
    const [value, setValue] = useState(false);
    const [element, setElement] = useState(0);
    const [data, setData] = useState([{
        Cname: '',
        content: ''
    }]);
    const [bookmarkState, setBookMarkState] = useState(false);

    useEffect(() => {
        run();
    }, [bookmarkState]);
    

    useEffect(() => {

    }, [value]);

    const styleInfo = {
        paddingRight: '7px'
    }

    const jlink = (link, e) => {
        // console.log(link);

        if (link != null) {
            const jobKorea = "https://www.jobkorea.co.kr" + link;
            window.open(jobKorea);
        } else {
            window.location.href = "/";
        }
    }

    const changeValue = (event) => {
        console.log(event.target.value);
        setValue(event.target.value);
    }

    const news = Object.entries(company)

    const items = news.map((item, key) => {
        if (search === "") {
            return null
        }
        else if (item[0].toLowerCase().includes(search.toLowerCase()) || item[0].toLowerCase().includes(search.toLowerCase())) {
            // userBookmark.map((userBookmark, key) => {
            //     console.log(userBookmark.companyname);
            // })
            let end = item[1].plan.split('~')[1]

            console.log(date);
            console.log(end);
            let date1 = new Date(end)
            // console.log(date1);

            let date2 = new Date(date)
            // console.log(date2);

            if(date1 >= date2){
                return <ItemBox name={item[0]} state={item[1].state} content={item[1].content} position={item[1].position} plan={item[1].plan} link={item[1].link} img={item[1].img} />
            }
            // return <ItemBox name={item[0]} state={item[1].state} content={item[1].content} position={item[1].position} plan={item[1].plan} link={item[1].link} img={item[1].img} />
            
        }
    })

    const searchCompany = (event) => {
        console.log(event.target.value);
        setUser(event.target.value);
    }

    const bookmark = (e, companyname, plan, img, link) => {
        console.log("!!!!", ID);

        if (ID === null) {
            Swal.fire({
                title: '즐겨찾기 기능은 <br/> 로그인 후 가능합니다!',
                text: '로그인 페이지로 이동하겠습니까?',
                icon: 'warning',

                showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
                confirmButtonColor: '#3182F6', // confrim 버튼 색깔 지정
                cancelButtonColor: '#E42939', // cancel 버튼 색깔 지정
                confirmButtonText: '로그인 하러가기', // confirm 버튼 텍스트 지정
                cancelButtonText: '취소', // cancel 버튼 텍스트 지정

                reverseButtons: true, // 버튼 순서 거꾸로

            }).then(result => {
                // 만약 Promise리턴을 받으면,
                if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
                    navigate('/login');
                }
            });
        }
        if (ID !== null) {
            var start, end

            start = plan.split('~')[0]
            end = plan.split('~')[1]

            // console.log(ID, companyname, start, end, img, link);

            console.log(userBookmark);

            axios
                .post("/api/bookmark/save",
                    {
                        bookMarkName: companyname,
                        bookMarkImg: img,
                        bookMark_Start_Date: start,
                        bookMark_End_Date: end,
                        company_link: link

                    }, { headers: { Authorization: `Bearer ${sessionStorage.getItem("tokenId")}` } }
                ).then(result => {
                    // console.log("!!!!", result.data);
                    if (result.data.data === 1) {
                        Swal.fire({
                            icon: 'success',
                            title: '즐겨찾기 Success',
                            // timer: 100000,
                        })
                        setBookMarkState(!bookmarkState);
                    } else if (result.data.data === 2) {
                        Swal.fire({
                            icon: 'error',
                            title: '이미 즐겨찾기가 되어있습니다.',
                            // timer: 100000,
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: '로그인 후 이용해주세요',
                            // timer: 100000,
                        })
                    }


                });
        }
    }

    const check = (num = itemRef.current.childElementCount) => {
        console.log(num);
        if (num === 0) {
            setValue(true);
            setSearch(inputRef.current.value);
        } else {
            setValue(false);
            setSearch(inputRef.current.value);
        }
        return itemRef.current.childElementCount;
    }

    useEffect(() => {

    }, [value, search]);

    return (
        <div className="banner_box">
            <div css={css`
                border: none;
                width: 100%;
                height: 9.43em;
                display: flex;
                justify-content: center;
                align-items: center;
                background: url(${banner});
                object-fit: cover;
                background-position: 25% 60%; // width height 위치가 값에 따라 이동되서 나타나게 된다.
                margin-bottom: 4em;
            `}>
                <span css={css`
                    font-family: 'Pretendard-ExtraBold';
                    font-size: 1.6em;
                    color: white;
                    text-shadow: 0 10px 10px rgba(0,0,0,.2);
                    letter-spacing: -0.01em;
                `}>커리어팀은 취업을 위한 편안한 서비스를 제공합니다.</span>
            </div>
            <div css={css`
                width: 1048px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color: rgb(242, 244, 246, 0.6);
                border-radius: 1em;
                padding: 2em;
            `}>
                            <div css={css`
                display: flex;
                flex-direction: column;
                margin-bottom: 2em;
                color: #333D4B;
                row-gap: 0.5em;
                

                justify-content: center;
                align-items: center;
            `}>
                <span css={css`
                    display: block;
                    font-family: 'Pretendard-ExtraBold';
                    font-size: 2em;
                    letter-spacing: -0.03em;
                `}> 신입 공채 정보 서비스 </span>
                <span css={css`
                    display: block;
                    font-family: 'Pretendard-Medium';
                    font-size: 1em;
                    letter-spacing: -0.03em;
                `}>커리어 팀과 함께 신입 공채 서비스를 함께 알아보아요</span>
            </div>
            <img className="bannerImg" alt="banner_01" src={question} css={css`
                width: 8em;
                height: auto;
            `}/>

            <input type="text" css={css`
                width: 40em;
                height: 3.5em;
                font-size: 17px;
                border-radius: 0.7em;
                border: solid;
                margin-top: 30px;
                border-color: #e6e8ea;
                border-width: 0.0789em;
                font-family: 'Pretendard-Regular';
                letter-spacing: -0.03em;
                padding-left: 1.3em;
                transition: 0.4s all;
                outline-color: #4F85E8;
                margin-bottom: 1em;
                box-sizing: border-box;
                background-color: transparent;
                color: #333333;

                &::placeholder {
                    font-family: 'Pretendard-Regular';
                    text-align: center;
                }

                &:focus {
                    &::placeholder {
                        color: transparent;
                    }
                }
                // (event) => { setSearch(event.target.value) }
            `} placeholder="기업 검색을 통해 기업 공채 소식을 빠르게 받아볼 수 있어요!" ref={inputRef} onChange={(event) => {
                setSearch(event.target.value);
                // itemRef.current.focus();
            }}/>
            </div>
            <div css={css`
                width: 65.5em;
                margin-top: 2em;
                display: flex;
                flex-direction: column;
                row-gap: 2em;
            `}>
                <span css={css`
                    display: block;
                    font-family: 'Pretendard-ExtraBold';
                    font-size: 1.8em;
                    letter-spacing: -0.03em;
                    color: #333D4B;
                `}> 커리어에서 빠르게 공채 소식을 알려드려요 </span>
                {search.length === 0 &&                    
                    <div css={css`
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    `}>
                        <span css={css`
                            position: absolute;
                            display: block;
                            font-family: 'Pretendard-ExtraBold';
                            font-size: 1.1em;
                            text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
                            letter-spacing: -0.03em;
                            color: #333D4B;
                        `}> 현재 검색된 결과가 없어요! </span> 
                        <img src={rocket} css={css`
                            width: 27em;
                            height: auto;
                        `}/>
                </div>}
                <div css={css`
                width: 100%;
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    column-gap: 2em;
                    ${search.length === 0 ? css`height: 100%` : css`height: 23em`}
                `} ref={itemRef}>
                    {items}
                </div>
            </div>
        </div>
    )
    function ItemBox(props) {

        // var mark = "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
        //  userBookmark.map((userBookmark, key) => {
        //         if(userBookmark.companyname === props.name){
        //             mark = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        //         }
        //     })
        
        return (
            <div css={css`
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            column-gap: 0.3em;
            `}>
        <Card title={props.name} plan={props.plan} content={props.content} src={props.img} link={props.link} state={props.state} onClick={(e) => { bookmark(e, props.name, props.plan, props.img, props.link, props.bookmark) }} bookmark={userBookmark ? userBookmark[0] : null}/>
            {/*<div class="container" css={css`
                width: 30em;

                border: none;
                background-color: rgb(242, 244, 246, 0.6);
                border-radius: 1em;
                box-sizing: border-box;
        
                display: flex;
                flex-direction: column;
                align-items: left;
                justify-content: center;
            `}>
                
                <div class="card u-clearfix">
                    <div css={css`
                        width: 30em;
                    `} onClick={(e) => { jlink(props.link) }}>
                        <img src={props.img} alt="" css={css`
                            width: 9em;
                            height: auto;
                        `}/>
                    </div>

                    <div class="card-body">
                        <h2 class="card-body-heading">{props.name}</h2>
                        <div class="card-body-options">
                            <div class="card-body-option card-body-option-favorite" css={css`
                                background-color: red;
                            `}>
                                <svg fill="white" height="26" viewBox="0 0 24 24" width="26" xmlns="http://www.w3.org/2000/svg" onClick={(e) => { bookmark(e, props.name, props.plan, props.img, props.link, props.bookmark) }}>
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d= {mark}/> 
                                </svg>
                            </div>
                        </div>
                        <br />
                        <div class="card-button card-button-link">
                            <span>{props.state}</span>
                            <br />
                            <span>{props.content}</span>
                            <br />
                            <span>{props.position}</span>
                            <br />
                            <span>{props.plan}</span>
                        </div>
                    </div>

                </div>
            </div> 
            */}
            </div>
        )
    }
}

export default Main;