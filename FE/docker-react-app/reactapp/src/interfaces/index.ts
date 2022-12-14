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
  management_flag: boolean;
  image?: string;
  allowPasswordChange: boolean;
}

export interface Post {
  id: string;
  content: string;
  image?: {
    url: string;
  };
}

export interface PostApiJson {
  posts: Post[];
}
