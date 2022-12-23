import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "App";

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Home: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  return (
    <>
      {isSignedIn && currentUser ? (
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
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
