import React, { useContext } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "App"

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const TestPage: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)
  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <h1>登録情報</h1>
            <h2>名前: {currentUser?.name}</h2>
            <h2>ニックネーム: {currentUser?.nickname}</h2>
            <h2>メールアドレス: {currentUser?.email}</h2> 
            <hr />
            <Link to="/signin">サインイン</Link>
          </>
        ) : (
          <></>
        )
      }
    </>
  )
}

export default TestPage