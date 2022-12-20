import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "App";
import { getTTFB } from "web-vitals";
import { responsiveFontSizes } from "@material-ui/core";

export const Index = () => {
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
      {books.map((book: any) => (
        <div>
          <p>
            ID:{book.id} タイトル:{book.title}
          </p>
          <p>
            {book.label && (
              <img src={book.label.url} width={200} height={200} />
            )}
          </p>
          <p>本文:{book.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Index;
