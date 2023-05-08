/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

export default function Card({src, title, content, state, link, onClick, bookmark, plan}) {

  const bookmarkName = bookmark !== null && bookmark.bookmark;
  const [bookMarkState, setState] = useState(false);
  let value = '해당 채용공고 즐겨찾기';
  console.log(bookmarkName);

  return (
    <>
    <div css={css`
        border: none;
        background-color: white;
        width: 20em;
        height: 18em;
        border-radius: 1em;
        box-sizing: border-box;
        padding: 1.5em;
        box-sizing: border-box;
        margin-bottom: 4em;

        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: center;
        box-shadow: 2px 2px 10px 2px rgb(0, 0, 0, 0.16);

        row-gap: 0.2em;
    `}>
    <a href={`https://www.jobkorea.co.kr/${link}`} target="_black" css={css`

    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;

      &:hover {
        color: #1B64DA;
      }
      transition: 0.4s all;
    `}>
        <img src={src} alt="기업 로고" css={css`
            width: 10em;
            margin-bottom: 1em;
        `}/>
        <span css={css`
          font-family: 'Pretendard-Medium';
          font-size: 1.5em;
          letter-spacing: -0.02em;
        `}> {title.includes("㈜") ? title.replaceAll("㈜", "") : title} </span>
        <span css={css`
        font-family: 'Pretendard-Regular';
        font-size: 1em;
        letter-spacing: -0.02em;
        `}> 채용 {state} </span>
        <span css={css`
        font-family: 'Pretendard-Regular';
        font-size: 1em;
        letter-spacing: -0.02em;
        `}> {plan} </span>
        <span css={css`
        font-family: 'Pretendard-Regular';
        font-size: 1em;
        letter-spacing: -0.02em;
        `}> {content} </span>
        </a>
        <div css={css`
          margin-top: 1em;
          background-color: rgba(49, 130, 246, 0.16);
          color: rgb(27, 100, 218);
          font-family: 'Pretendard-Regular';
          letter-spacing: -0.03em;
          width: 11em;
          height: 1.7em;
          border-radius: 0.2em;
          font-size: 14px;

          display: flex;
          justify-content: center;
          align-items: center;
          transition: 0.4s all;
          cursor: pointer;

          &:hover {
            opacity: 80%;
          }
        `} onClick={onClick}>
          {bookmarkName && bookmarkName.map((item) => {
            if (item.bookMarkName === title) {
              value = `이미 즐겨찾기된 채용공고`;
            }
          })}
          {value}
        </div>
    </div>
    </>
  )
}
