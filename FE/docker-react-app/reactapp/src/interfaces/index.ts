// サインアップ
export interface SignUpData {
  name: string;
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

// サインイン
export interface SignInData {
  name: string;
  password: string;
}

// ユーザー
export interface User {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  nickname: string;
  image?: string;
  allowPasswordChange: boolean;
}
