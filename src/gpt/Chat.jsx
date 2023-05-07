import "./Chat.css";
import React, {useState, useRef, useEffect} from "react";
import Header from "../js/Form/Header";
import axios from "axios";
import {IoMdSend} from "react-icons/io";
import qs from 'qs';

export default function Chat() {
  const [text, setText] = useState('');
  const [chats, setChats] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [mine, setMine] = useState();
  const [visible, setVisible] = useState(true);

  const chatInput = useRef();
  const textarea = useRef();

  const handleChatInput = (e) => {
    setText(e.target.value);
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px'; 
  };

  const submit = (e) => {
    const chatList = chats.concat({
      id: nextId,
      text: text,
      mine: true
    });
    setNextId(nextId + 1);
    setChats(chatList);
    setText('');
    console.log(chats);
    
    axios.post("/api/chat",
    qs.stringify({
      prompt: text
    }), {headers: {"Content-type": "application/x-www-form-urlencoded;charset=utf-8"}})
    .then (function (response) {
      console.log(response);
      const data = response.data;
      console.log(data);
      const chatList = chats.concat({
      id: nextId,
      text: data,
      mine: false
    });
    setNextId(nextId + 1);
    setChats(chatList);
    })
    .catch(function(error) {
      console.log(error);
    })

  }
  


  const myChat = chats.map((chat) =>  (
    <div opacity="1" key={chat.id}>
      <div className={chat.mine ? "me" : "gpt"}>
        <span>
          <p className={chat.mine ? "myText" : "gptText"}>{chat.text}</p>
        </span>
      </div>
    </div>
  ));

  return (
    <html>
    <body className="body">
      <Header />
    <div className="Container">
        <h1 className="title">당신의 커리어를 입력해보세요</h1>
        <p className="subTitle">면접 질문 예상부터 답변 피드백까지</p>
        <div className="chatGpt">
          <div className="chatBox">
            <div className="header">
              <div className="headerInside">
                <div className="projectName">
                  <div className="name">
                    <div className="icon">
                    </div>
                    <div className="career">커리어</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="chatting" ref={chatInput}>
              {myChat}
            </div>
            <div className="search">
              <div className="inputText">
                <textarea className="text" rows="1" height="18px"
                onChange={handleChatInput} onKeyUp = {() => {text.length === 0 ? setVisible(true) : setVisible(false)}}
                value={text} ref={textarea}></textarea>
                {visible && <div className="placeholder">말을 걸어보세요</div>}
              </div>
              <button className="btn" onClick={submit}><IoMdSend className="send"/></button>
            </div>
      </div>
      
          </div>   
      </div>
               
    </body>
    </html>
  );
}
