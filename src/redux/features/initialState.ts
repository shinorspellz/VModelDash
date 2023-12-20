import { UserDetails } from "@/service/user/type";
import { cookieReader } from "@/utils/Helper";
import { CACHE_KEYS } from "@/utils/constants";
import { decode } from "jsonwebtoken";

let token: any = cookieReader(CACHE_KEYS.TOKEN, 1);
let tokenData: any = cookieReader("lStrt", 1);

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuth: boolean;
  token: string;
  user: UserDetails;
};

let isAuth = false;
let id = "";
let email = "";
let first_name = "";
let last_name = "";
let profile_picture_url = "";
let username = "";

//console.log(token);

if (JSON.parse(token)?.data) {
  let decoded: any = decode(tokenData);
  // console.log(decoded);
  isAuth = true;
  id = decoded?.user?.id;
  email = decoded?.user?.email;
  first_name = decoded?.user?.first_name;
  last_name = decoded?.user?.last_name;
  username = decoded?.user?.username;
  profile_picture_url = decoded?.user?.profile_picture_url;
}

export const AuthInitialState = {
  value: {
    isAuth,
    token: JSON.parse(token)?.data ?? "",
    user: {
      id,
      email,
      first_name,
      last_name,
      profile_picture_url,
      username,
    },
  } as AuthState,
} as InitialState;
