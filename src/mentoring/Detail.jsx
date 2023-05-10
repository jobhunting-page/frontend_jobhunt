import {useState, useRef} from "react";
import "./Detail.css";
import axios from "axios";
import { useLocation } from "react-router-dom";


export default function Detail() {
    const [title, setTitle] = useState();
    const [tag, setTag] = useState();
    const [content, setContent] = useState();
    const [preview, setPreview] = useState();
    const [writer, setWriter] = useState();

    const location = useLocation();



    console.log(location.state);

    return (
        <div className="formMain">
            <form id="form">
                <div className="detailWrite">
                    <div className="detailPaper">
                        <div className="detailWriteSubject">
                            <div className="detailSubject">
                                <div id="detailTag" name="formTag" value={tag}>{location.state.post.subject}</div>
                            </div>
                            <div className="detailSubject">
                                <div id="detailWriter" name="formWriter" value={writer}>{location.state.post.writer}</div>
                            </div>
                        </div>
                        <div className="detailWriteTitle">
                            <div className="detailWriteTitleText" value={title}>{location.state.post.title}</div>
                        </div>
                        <div className="detailWriteContent">
                            <div className="detailWriteContentText">
                                <div className="detail-Content" value={content}>{location.state.post.content}</div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </form> 
        </div>
    )
}