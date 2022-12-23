import React, { useCallback, useState, useContext } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "App";
import { getTTFB } from "web-vitals";

interface State {
  u_id: string;
}

const EditUser: React.FC = () => {
  //user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  //更新用user
  const [newname, newName] = useState("");
  const [newemail, newEmail] = useState("");

  const location = useLocation();
  const { u_id } = location.state as State;
  axios.get(`http://localhost:3001/users/${u_id}/edit`).then((response) => {
    setName(response.data.user.nickname);
    setEmail(response.data.user.email);
  });

  const editUserData = () => {
    axios
      .patch(`http://localhost:3001/users/${u_id}`, {
        nickname: newname,
        email: newemail,
      })
      .then((response) => {
        if (u_id === response.data.id) {
          setName(response.data.user.nickname);
          setEmail(response.data.user.email);
        }
      });
  };

  return (
    <div>
      <h1>更新前</h1>
      <h2>nickname:{name}</h2>
      <h2>email: {email}</h2>
      <hr />
      <br />
      <h1>編集する</h1>
      <label>nickname:</label>
      <input
        type="text"
        value={newname}
        onChange={(e) => newName(e.target.value)}
      />
      <br />
      <label>email:</label>
      <input
        type="text"
        value={newemail}
        onChange={(e) => newEmail(e.target.value)}
      />
      <button onClick={editUserData}>更新</button>
      <br />
      <br />
      <Link to="/users">登録情報</Link>
    </div>
  );
};

export default EditUser;
