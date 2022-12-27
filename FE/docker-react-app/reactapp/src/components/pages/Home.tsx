import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "App";
import axios from "axios";

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Home: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  const [user_id, setCurrentId] = useState<string>("");
  const [flag, setFlag] = useState<string>("");

  const url = `http://localhost:3001/users/${currentUser?.id}/edit`;
  axios.get(url).then((response) => {
    const name = response.data.user.name;
    const Flag = response.data.user.management_flag;
    console.log(Flag);
    console.log(name);
    setFlag(Flag);
  });

  return (
    <>
      {flag ? (
        <>
          <h1>管理者用ページです</h1>
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
  );
};

export default Home;
