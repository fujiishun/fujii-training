import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"
import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import { AuthContext } from "App"
import AlertMessage from "components/utils/AlertMessage"
import { signUp } from "lib/api/auth"
import { SignUpData } from "interfaces/index"

//style
const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    paddingTop: theme.spacing(2),
    textAlign: "right",
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400
  }
}))

// サインアップ用ページ
const SignUp: React.FC = () => {
  const classes = useStyles()
  const histroy = useHistory()
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
  const [nickname, setNickname] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  
  // ボタン押下時
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const data: SignUpData = {
      nickname: nickname,
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    }

    try {
      const res = await signUp(data)
      if (res.status === 200) {
        // アカウント作成と同時にサインインさせてしまう
        // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
        Cookies.set("_access_token", JSON.stringify(res.headers["access-token"]))
        Cookies.set("_client", JSON.stringify(res.headers["client"]))
        Cookies.set("_uid", JSON.stringify(res.headers["uid"]))
        // サインイン時の処理
        setIsSignedIn(true)
        setCurrentUser(res.data.data)
        histroy.push("/")
      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      setAlertMessageOpen(true)
    }
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="サインアップ" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="ID"
              value={name}
              margin="dense"
              onChange={event => setName(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="ニックネーム"
              value={nickname}
              margin="dense"
              onChange={event => setNickname(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="メールアドレス"
              value={email}
              margin="dense"
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード"
              type="password"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード（確認用）"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPasswordConfirmation(event.target.value)}
            />
            <div className={classes.submitBtn}>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!name || !email || !password || !passwordConfirmation ? true : false}
                onClick={handleSubmit}
              >
                送信
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="メールアドレスかパスワードが間違っています"
      />
    </>
  )
}

export default SignUp