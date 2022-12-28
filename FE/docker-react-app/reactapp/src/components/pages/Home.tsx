import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "App";
import axios from "axios";

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Home: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  const [flag, setFlag] = useState<string>("");

  const url = `http://localhost:3001/users/${currentUser?.id}/edit`;
  axios.get(url).then((response) => {
    const Flag = response.data.user.management_flag;
    setFlag(Flag);
  });

  return (
    <>
      {isSignedIn && currentUser ? (
        <>
          {flag ? (
            <>
              <h1>管理者用ページです</h1>
              <h2>メールアドレス: {currentUser?.email}</h2>
              <h2>名前: {currentUser?.name}</h2>
              <hr />
              <div className="center">
                <h3>
                  <Link to="/user_manage">ユーザ編集</Link>
                </h3>
                <h3>
                  <Link to="/post_manage">投稿編集</Link>
                </h3>
                <h3>
                  <Link to="/">投稿一覧</Link>
                </h3>
              </div>
            </>
          ) : (
            <>
              <h1>ログイン完了！！</h1>
              <h2>メールアドレス: {currentUser?.email}</h2>
              <h2>名前: {currentUser?.name}</h2>
              <hr />
              <div className="center">
                <h3>
                  <Link to="/users">登録情報</Link>
                </h3>
                <h3>
                  <Link to="/">allページ</Link>
                </h3>
                <h3>
                  <Link to="/mypage">myページ</Link>
                </h3>
              </div>
            </>
          )}
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

export default Home;
