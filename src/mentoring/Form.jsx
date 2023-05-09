import {useState, useRef} from "react";
import "./Form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Form() {
    const [title, setTitle] = useState();
    const [tag, setTag] = useState();
    const [content, setContent] = useState();
    const [preview, setPreview] = useState();
    const [writer, setWriter] = useState();

    const navigate = useNavigate();

    const titleInput = useRef();
    const contentInput = useRef();
    const nextId = useRef(0);

    const handleInputTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleInputTag = (e) => {
        setTag(e.target.value);
    }
    const handleInputContent = (e) => {
        setContent(e.target.value);
    }
    const handleInputPreview = (e) => {
        setPreview(e.target.value);
    }
    const handleInputWriter = (e) => {
        setWriter(e.target.value);
    }

    const onSubmit = () => {
        axios.post('/api/board/write', {
            board_id: nextId.current,
            content: content,
            preview: preview,
            subject: tag,
            title: title,
            writer: writer
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("tokenId")}`,
                    refreshTokenId: `Bearer ${sessionStorage.getItem("refreshTokenId")}`,
                }
            })
            .then(response => {
                nextId.current += 1;
                console.log(response);
                navigate('/board');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="formMain">
            <form id="form">
                <div className="formWrite">
                    <div className="formWritePaper">
                        <div className="formWriteSubject">
                            <div className="formSubject">
                                <input type="text" path="form" placeholder="과목" id="formTag" name="formTag" value={tag} onChange={handleInputTag} required/>
                            </div>
                            <div className="formSubject">
                                <input type="text" path="form" placeholder="글쓴이" id="formWriter" name="formWriter" value={writer} onChange={handleInputWriter} required/>
                            </div>
                        </div>
                        <div className="formWriteTitle">
                            <textarea className="formWriteTitleText" placeholder="제목을 입력해주세요." value={title} onChange={handleInputTitle} required></textarea>
                        </div>
                        <div className="formWritePreview">
                            <textarea className="formWritePreviewText" placeholder="미리보기를 입력해주세요." value={preview} onChange={handleInputPreview} required></textarea>
                        </div>
                        <div className="formWriteContent">
                            <div className="formWriteContentText">
                                <textarea className="form-Content" placeholder="내용을 작성해주세요" value={content} onChange={handleInputContent} required></textarea>
                            </div>
                        </div>
                        <div className="formSubmit">
                            <div className="formSubmitButton">
                                <button type="button" className="form-button" form="form" disabled={!(title && tag && content && preview && writer)} onClick={onSubmit}>
                                    <span className="formSubmitText">등록하기</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form> 
        </div>
    )
}