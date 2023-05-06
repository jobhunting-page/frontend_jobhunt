import "./Index.css";
import React, { useState } from "react";

export default function Index() {
    const [search, setSearch] = useState('');
    const [active, setActive] = useState(false);
    const checkSearch = () => {
        search.length === 0 ? setActive(false) : setActive(true);
    }
    return (
        <div className="chat-container">
            <div className="sub-container">
                <h1 className="title">잡헌터 AI 면접코칭</h1>
                <h2 className="subTitle">면접 질문 예상부터 답변 피드백까지</h2>
            </div>
            <input type="text" placeholder="채용공고를 입력해주세요" className="input" onChange={event =>{setSearch(event.target.value)}}
                onKeyUp={checkSearch} value={search}/>
            <button className={active ? "activeBtn" : "unactiveBtn"} disabled={search.length === 0}>채용공고 분석하기</button>
        </div>
    );
}