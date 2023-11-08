import { cache, request } from "@/utils";
import { LoginFunc } from "./type";
import { CACHE_KEYS } from "@/utils/constants";
import Cookies from "js-cookie";

export const Login: LoginFunc = async ({ username, password }) => {
  const { data } = await request.post({
    url: "/login/",
    data: {
      username,
      password,
    },
  });
  if (data?.token) {
    await Promise.all([
      cache.set(CACHE_KEYS.TOKEN, data.token),
      cache.set(CACHE_KEYS.APP_IS_ACTIVE, true),
    ]);
  }
  return data;
};

export const Logout = async () => {
  await Promise.all([
    cache.remove(CACHE_KEYS.TOKEN),
    Cookies.remove("lStrt"),
    Cookies.remove("APP_IS_ACTIVE"),
  ]);
};
