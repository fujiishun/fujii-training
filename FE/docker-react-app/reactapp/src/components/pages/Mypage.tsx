import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "App";
import { getTTFB } from "web-vitals";
import { responsiveFontSizes } from "@material-ui/core";
import { valHooks } from "jquery";

export const Mypage = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/books/mypage/${currentUser?.id}`)
      .then((resp) => {
        setBooks(resp.data);
      });
  }, []);

  return (
    <>
      {isSignedIn && currentUser ? (
        <>
          <div>
            <h1>投稿一覧</h1>
            <br />
            <Link to="/signin">ログインページ</Link>
            <hr />
            {books.map((book: any) => (
              <div>
                投稿ID:{book.id}
                <br />
                投稿者ID:{book.user_id} タイトル:{book.title}
                <p>
                  {book.label && (
                    <img src={book.label.url} width={200} height={150} />
                  )}
                </p>
                <p>本文:{book.body}</p>
                <Link
                  to={{ pathname: "/editpost", state: { book_id: book.id } }}
                >
                  <p>編集</p>
                </Link>
                <hr />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h1>ログインしてください</h1>
          <hr />
          <Link to="/signin">サインイン</Link>
        </div>
      )}
    </>
  );
};

export default Mypage;
