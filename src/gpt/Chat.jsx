import "./Chat.css";
import React, {useState, useRef} from "react";
import Header from "../js/Form/Header";
import axios from "axios";
import {IoMdSend} from "react-icons/io";
import qs from 'qs';
import logo from '../images/logo.png';

export default function Chat() {
  const [text, setText] = useState("");
  const [chats, setChats] = useState([]);
  const [visible, setVisible] = useState(true);

  const textarea = useRef();
  const nextId = useRef(0);

  const handleChatInput = (e) => {
    setText(e.target.value);
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px'; 
  };
  

  const submit = (e) => {
    const data = text;
    const chatList = chats.concat({
      id: nextId.current,
      text: data,
      mine: true
    });
    console.log(data);
    setChats(chatList);
    setText('');
    nextId.current += 1;
    console.log(chatList);
    axios.post("/api/chat",
    qs.stringify({
      prompt: text
    }), {headers: {"Content-type": "application/x-www-form-urlencoded;charset=utf-8"}})
    .then (function (response) {
      const data = response.data;
      console.log(data);
      const chatList2 = chats.concat({
      id: nextId.current,
      text: data,
      mine: false
    });
    /* setChats([...chatList, ...chatList2]);;
    nextId.current += 1;
    console.log(chats); */
    const newChats = chatList.concat(chatList2)
      .filter((chat, index, self) => self.findIndex(c => c.id === chat.id) === index);
    setChats(newChats);
    nextId.current += 1;
    console.log(chats);
    })
    .catch(function(error) {
      console.log(error);
    })

  };
  
  /*const uniqueChats = [];
  chats.forEach((chat) => {
    if (uniqueChats.findIndex((c) => c.id === chat.id) === -1) {
      uniqueChats.push(chat);
    }
  });
  
  const myChat = uniqueChats.map((chat) => (
    <div opacity="1" key={chat.id}>
      <div className={chat.mine ? "me" : "gpt"}>
        <span>
          <p className={chat.mine ? "myText" : "gptText"}>{chat.text}</p>
        </span>
      </div>
    </div>
  ));*/
  

  const myChat = chats
  .filter((chat, index, self) => self.findIndex(c => c.id === chat.id) === index) // 중복된 id 제거
  .map((chat) => (
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
                    <div className="career"><img src={logo} width="110em" height="30em"/></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="chatting">
              {myChat}
            </div>
            <div className="search">
              <div className="inputText">
                <textarea className="text" rows="1" height="18px"
                onChange={handleChatInput} onKeyUp = {() => {text.length === 0 ? setVisible(true) : setVisible(false)}}
                value={text} ref={textarea}></textarea>
                {visible && <div className="placeholder">말을 걸어보세요</div>}
              </div>
              <button type="button" className="btn" onClick={ (e) => {submit();}}><IoMdSend className="send"/></button>
            </div>
      </div>
      
          </div>   
      </div>
               
    </body>
    </html>
  );
}
