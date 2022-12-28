import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "App";
import axios from "axios";

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const User_manage: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/users").then((resp) => {
      setUsers(resp.data);
    });
  }, []);

  return (
    <>
      {isSignedIn && currentUser ? (
        <>
          <h1>登録情報</h1>
          {users.map((user: any) => (
            <div>
              <h2>登録No: {user.id} </h2>
              <h2>名前: {user.name}</h2>
              <h2>ニックネーム: {user.nickname}</h2>
              <h2>メールアドレス: {user.email}</h2>
              <Link
                to={{
                  pathname: "/edituser_manage",
                  state: { user_id: user.id },
                }}
              >
                <p>編集</p>
              </Link>
              <hr />
            </div>
          ))}
          <Link to="/signin">サインイン</Link>
          <br />
          <Link
            to={{ pathname: "/edituser", state: { u_id: currentUser?.id } }}
          >
            <p>登録情報編集</p>
          </Link>
          <br />
        </>
      ) : (
        <div>
          <h1>編集権限がありません</h1>
          <h1>管理者としてログインしてください</h1>
          <hr />
          <Link to="/signin">サインイン</Link>
        </div>
      )}
    </>
  );
};

export default User_manage;
