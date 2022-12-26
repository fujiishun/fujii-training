import React, { useCallback, useState, useContext } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "App";
import { getTTFB } from "web-vitals";

//編集する投稿のID
interface State {
  book_id: string;
}

const EditPost: React.FC = () => {
  //表示用book
  const [bookTitle, setBookTitle] = useState("");
  const [bookBody, setBookBody] = useState("");
  const [labelUrl, setLabelUrl] = useState("");
  //更新用book
  const [newTitle, newBookTitle] = useState("");
  const [newBody, newBookBody] = useState("");
  const [newUrl, newLabelUrl] = useState<File>();

  const selectImage = useCallback((e: any) => {
    const selectedImage = e.target.files[0];
    newLabelUrl(selectedImage);
  }, []);

  const location = useLocation();
  const { book_id } = location.state as State;

  const reqUrl = `http://localhost:3001/books/${book_id}/edit`;
  axios.get(reqUrl).then((response) => {
    const imageUrl = response.data.book.label.url;
    setLabelUrl(`${imageUrl}`);
    const title = response.data.book.title;
    setBookTitle(title);
    const body = response.data.book.body;
    setBookBody(body);
  });

  const createFormData = () => {
    const formData = new FormData();
    if (!newUrl) return; //labelがundefinedの場合早期リターン
    formData.append("book[title]", newTitle);
    formData.append("book[body]", newBody);
    formData.append("book[label]", newUrl);
    return formData;
  };

  const editFormData = async () => {
    const url = `http://localhost:3001/books/${book_id}`;
    const data = await createFormData(); //formdataが作成されるのを待つ
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .patch(url, data, config)
      .then((response) => {})
      .catch((error) => {});
  };

  return (
    <div>
      <h1>更新前</h1>
      <h2>タイトル:{bookTitle}</h2>
      {labelUrl && <img src={labelUrl} width={400} height={300} />}
      <h2>本文: {bookBody}</h2>
      <hr />
      <br />
      <h1>編集する</h1>
      <label>題名：</label>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => newBookTitle(e.target.value)}
      />
      <br />
      <label>本文：</label>
      <input
        type="text"
        value={newBody}
        onChange={(e) => newBookBody(e.target.value)}
      />
      <br />
      <br />
      <input type="file" onChange={(e) => selectImage(e)} />
      <button onClick={editFormData}>更新</button>
      <br />
      <br />
      <Link to="/mypage">マイページ</Link>
    </div>
  );
};

export default EditPost;
