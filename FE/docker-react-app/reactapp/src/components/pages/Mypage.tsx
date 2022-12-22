import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "App";
import { getTTFB } from "web-vitals";
import { responsiveFontSizes } from "@material-ui/core";
import { valHooks } from "jquery";

export const Mypage = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/books").then((resp) => {
      setBooks(resp.data);
    });
  }, []);

  return (
    <div>
      <h1>投稿一覧</h1>
      <Link to="/post">投稿ページ</Link>
      <br />
      <Link to="/signin">ログインページ</Link>
      <hr />
      {books.map((book: any) => (
        <div>
          ID:{book.id} タイトル:{book.title}
          <p>ユーザ名:{}</p>
          <p>
            {book.label && (
              <img src={book.label.url} width={200} height={150} />
            )}
          </p>
          <p>本文:{book.body}</p>
          <Link to={{ pathname: "/editpost", state: { id: book.id } }}>
            <p>編集</p>
          </Link>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Mypage;
