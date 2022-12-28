import React, { useContext, useCallback, useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "App";

//投稿に紐付けるユーザーID
interface State {
  uid: string;
}

const CreateBook: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [label, setLabel] = useState<File>();

  const selectImage = useCallback((e: any) => {
    const selectedImage = e.target.files[0];
    setLabel(selectedImage);
  }, []);

  const location = useLocation();
  const { uid } = location.state as State;

  const createFormData = () => {
    const formData = new FormData();
    if (!label) return; //labelがundefinedの場合早期リターン
    formData.append("book[title]", title);
    formData.append("book[body]", body);
    formData.append("book[label]", label);
    formData.append("book[user_id]", `${uid}`);

    return formData;
  };

  const sendFormData = async () => {
    const url = "http://localhost:3001/books";
    const data = await createFormData(); //formdataが作成されるのを待つ
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(url, data, config)
      .then((response) => {})
      .catch((error) => {});
  };

  return (
    <div>
      <h1>投稿する</h1>
      <label>題名：</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label>本文：</label>
      <input
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <br />
      <br />
      <input type="file" onChange={(e) => selectImage(e)} />
      <button onClick={sendFormData}>送信</button>
      <hr />
      <Link to="/search">検索ページ</Link>
      <hr />
      <Link to="/">投稿一覧</Link>
    </div>
  );
};

export default CreateBook;
