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

export const getUserAnalytics = async () => {
  try {
    const [userAnalytics] = await Promise.allSettled([
      request.get(`/users/analytics/`),
    ]);

    return {
      userAnalytics:
        userAnalytics?.status === "fulfilled"
          ? userAnalytics?.value?.data
          : null,
    };
  } catch (err) {
    return err;
  }
};

export const getUserDetails = async (userID: string) => {
  try {
    const response = await request.get(`/users/fetch/${userID}`);
    return response;
  } catch (err) {
    return err;
  }
};

export const updUserDetails = async ({ userID, data }: any) => {
  try {
    const response = await request.put({
      url: `/users/update/${userID}/`,
      data,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const delUserDetails = async (userID: any) => {
  try {
    const response = await request.delete(`/users/delete/${userID}/`);
    return response;
  } catch (err) {
    return err;
  }
};
