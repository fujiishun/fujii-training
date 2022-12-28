import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "App";
import axios from "axios";

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Users: React.FC = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const { isSignedIn, currentUser } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${currentUser?.id}/edit`)
      .then((resp) => {
        setId(resp.data.user.id);
        setName(resp.data.user.name);
        setNickname(resp.data.user.nickname);
        setEmail(resp.data.user.email);
      });
  }, []);

  return (
    <>
      {isSignedIn && currentUser ? (
        <>
          <h1>登録情報</h1>
          <h2>登録No: {id} </h2>
          <h2>名前: {name}</h2>
          <h2>ニックネーム: {nickname}</h2>
          <h2>メールアドレス: {email}</h2>
          <hr />
          <Link to="/signin">サインイン</Link>
          <br />
          <Link
            to={{ pathname: "/edituser", state: { u_id: currentUser?.id } }}
          >
            <p>登録情報編集</p>
          </Link>
          <br />
          <Link to={{ pathname: "/post", state: { uid: currentUser?.id } }}>
            投稿ページ
          </Link>
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

export default Users;
