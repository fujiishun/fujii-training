import React, { useCallback, useState, useContext } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "App";
import { getTTFB } from "web-vitals";

//編集するUSERのID
interface State {
  user_id: string;
}

const EditUser_manage: React.FC = () => {
  //表示用user
  const [userName, setName] = useState("");
  const [userNickName, setNickname] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userpassword, setPassword] = useState("");
  //更新用user
  const [newName, newBookTitle] = useState("");
  const [newNickname, newBookBody] = useState("");
  const [newEmail, newLabelUrl] = useState("");

  const selectImage = useCallback((e: any) => {
    const selectedImage = e.target.files[0];
    newLabelUrl(selectedImage);
  }, []);

  const location = useLocation();
  const { user_id } = location.state as State;

  const reqUrl = `http://localhost:3001/users/${user_id}/edit`;
  axios.get(reqUrl).then((response) => {
    const Name = response.data.user.name;
    setName(Name);
    const Nickname = response.data.user.nickname;
    setNickname(Nickname);
    const Email = response.data.user.email;
    setEmail(Email);
    const Password = response.data.user.password;
    setPassword(Password);
  });

  const editUserData = () => {
    axios
      .patch(`http://localhost:3001/users/${user_id}`, {
        name: newName,
        nickname: newNickname,
        email: newEmail,
      })
      .then((response) => {
        if (user_id === response.data.id) {
          setName(response.data.user.name);
          setNickname(response.data.user.nickname);
          setEmail(response.data.user.email);
        }
      });
  };

  const deleteUserData = async () => {
    const url = `http://localhost:3001/users/${user_id}`;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .delete(url, config)
      .then((response) => {})
      .catch((error) => {});
  };

  const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <>
      {isSignedIn && currentUser ? (
        <>
          <div>
            <h1>更新前</h1>
            <h2>登録No.{user_id}</h2>
            <h2>ユーザID:{userName}</h2>
            <h2>登録名: {userNickName}</h2>
            <h2>Email: {userEmail}</h2>
            <hr />
            <br />
            <h1>編集する</h1>
            <label>ユーザID:</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => newBookTitle(e.target.value)}
            />
            <br />
            <label>登録名:</label>
            <input
              type="text"
              value={newNickname}
              onChange={(e) => newBookBody(e.target.value)}
            />
            <br />
            <label>Email: </label>
            <input
              type="text"
              value={newEmail}
              onChange={(e) => newLabelUrl(e.target.value)}
            />
            <br />
            <button onClick={editUserData}>更新</button>
            <br />
            <button onClick={deleteUserData}>削除</button>
            <br />
            <Link to="/user_manage">ユーザ編集</Link>
          </div>
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

export default EditUser_manage;
