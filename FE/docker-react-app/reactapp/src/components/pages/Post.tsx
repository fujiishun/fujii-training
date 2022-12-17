import React, { useMemo } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import axios from "axios";

export default function APP() {
  const [file, setFile] = React.useState();
  const handleChangeFile = useMemo(
    () => (e: any) => {
      const file = e.target.files[0];
      setFile(file);
    },
    [file]
  );

  const createFormData = () => {
    const formData = new FormData();
    formData.append("user[file]", file!);
    return formData;
  };

  const postFile = async () => {
    const data = createFormData();
    await axios
      .post(`http://localhost:3000/post_file/`, data)
      .then((response) => {
        //成功したときの処理
      })
      .catch(() => {
        //失敗したときの処理
      });
  };

  return (
    <label htmlFor="contained-button-file">
      <Input
        id="contained-button-file"
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChangeFile(e);
        }}
      />
      <Button
        size="medium"
        onClick={() => {
          postFile();
        }}
      >
        Railsにファイルを送信
      </Button>
    </label>
  );
}
