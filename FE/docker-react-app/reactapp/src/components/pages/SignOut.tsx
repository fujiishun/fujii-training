import React, { useContext } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "App"

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const SignOut: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)
  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <h1>goodby</h1>
            <h2>メールアドレス: {currentUser?.email}</h2>
            <h2>名前: {currentUser?.name}</h2>
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

export default SignOut