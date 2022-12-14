import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import CommonLayout from "components/layouts/CommonLayout";
import Home from "components/pages/Home";
import Users from "components/pages/Users";
import EditUser from "components/pages/editUser";
import SignUp from "components/pages/SignUp";
import SignIn from "components/pages/SignIn";
import SignOut from "components/pages/SignOut";
import Post from "components/pages/Post";
import Search from "components/pages/Search";
import Index from "components/pages";
import MyPage from "components/pages/Mypage";
import Detail from "components/pages/detail";
import EditPost from "components/pages/editPost";
import { getCurrentUser } from "lib/api/auth";
import { User } from "interfaces/index";
import Post_manage from "components/pages/Post_manage";
import EditPost_manage from "components/pages/editPost_manage";
import User_manage from "components/pages/User_manage";
import EditUser_manage from "components/pages/editUser_manage";

// グローバルで扱う変数・関数
export const AuthContext = createContext(
  {} as {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: User | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  }
);

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res?.status === 200) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.currentUser);
      }
    } catch (err) {}
    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        return <Redirect to="/signin" />;
      }
    } else {
      return <></>;
    }
  };

  return (
    <Router>
      <AuthContext.Provider
        value={{
          loading,
          setLoading,
          isSignedIn,
          setIsSignedIn,
          currentUser,
          setCurrentUser,
        }}
      >
        <CommonLayout>
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signout" component={SignOut} />
            <Private>
              <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/edituser" component={EditUser} />
                <Route exact path="/post" component={Post} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/mypage" component={MyPage} />
                <Route exact path="/detail" component={Detail} />
                <Route exact path="/editpost" component={EditPost} />
                <Route exact path="/" component={Index} />
                <Route exact path="/post_manage" component={Post_manage} />
                <Route exact path="/user_manage" component={User_manage} />
                <Route
                  exact
                  path="/editpost_manage"
                  component={EditPost_manage}
                />
                <Route
                  exact
                  path="/edituser_manage"
                  component={EditUser_manage}
                />
              </Switch>
            </Private>
          </Switch>
        </CommonLayout>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
