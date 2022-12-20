import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "App";
import { getTTFB } from "web-vitals";

const ShowBook: React.FC = () => {
  const [bookId, setBookId] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookName, setBookName] = useState("");
  const [labelUrl, setLabelUrl] = useState("");

  const getBookUrl = () => {
    if (!bookId) return;
    const url = `http://localhost:3001/books/${bookId}`;
    axios.get(url).then((response) => {
      const url = response.data.book.label.url;
      setLabelUrl(`${url}`);
      const title = response.data.book.title;
      setBookTitle(title);
      const name = response.data.book.name;
      setBookName(name);
    });
  };
  return (
    <div>
      <h1>投稿を検索する</h1>
      <input
        type="number"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
      />
      <button onClick={getBookUrl}>検索</button>
      <p>タイトル:{bookTitle}</p>
      {labelUrl && <img src={labelUrl} width={200} />}
      <h2>名前: {bookName}</h2>
      <Link to="/">allページ</Link>
    </div>
  );
};

export default ShowBook;
