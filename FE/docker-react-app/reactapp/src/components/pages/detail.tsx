import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "App";
import { getTTFB } from "web-vitals";

//詳細表示投稿のID
interface State {
  book_id: string;
}

const Detail: React.FC = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [bookBody, setBookBody] = useState("");
  const [labelUrl, setLabelUrl] = useState("");

  const location = useLocation();
  const { book_id } = location.state as State;

  const reqUrl = `http://localhost:3001/books/${book_id}`;
  axios.get(reqUrl).then((response) => {
    const imageUrl = response.data.book.label.url;
    setLabelUrl(`${imageUrl}`);
    const title = response.data.book.title;
    setBookTitle(title);
    const body = response.data.book.body;
    setBookBody(body);
  });

  return (
    <div>
      <h1>タイトル:{bookTitle}</h1>
      {labelUrl && <img src={labelUrl} width={400} height={300} />}
      <h2>本文: {bookBody}</h2>
      <Link to="/">allページ</Link>
    </div>
  );
};

export default Detail;
