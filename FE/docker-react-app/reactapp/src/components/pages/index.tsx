import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";
import { AuthContext } from "App";
import { getTTFB } from "web-vitals";
import { Button, responsiveFontSizes } from "@material-ui/core";

export const Index = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/books").then((resp) => {
      setBooks(resp.data);
    });
  }, []);

  const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <div>
      <h1>投稿一覧</h1>
      <Link to={{ pathname: "/post", state: { uid: currentUser?.id } }}>
        投稿ページ
      </Link>
      <br />
      <Link to="/signin">ログインページ</Link>
      <br />
      <Link to="/mypage">myページ</Link>
      <br />
      <Link to="/Home">Homeページ</Link>
      <hr />
      {books.map((book: any) => (
        <div>
          <Link to={{ pathname: "/detail", state: { book_id: book.id } }}>
            ID:{book.id} タイトル:{book.title}
            <p>
              {book.label && (
                <img src={book.label.url} width={200} height={150} />
              )}
            </p>
            <p>本文:{book.body}</p>
            <hr />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Index;
