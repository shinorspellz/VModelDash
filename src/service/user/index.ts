import { cache, request,upload } from "@/utils";
import { LoginFunc } from "./type";
import { CACHE_KEYS } from "@/utils/constants";
import Cookies from "js-cookie";
import { TgetUserType } from "@/types/service";

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



export const sendUserMessage = async (data: any) => {
  try {
    const response = await request.post({
      url: '/system_message/',
        data,
    });
    return response;
  } catch (err) {
    return err;
  }
};


export const uploadImage = async (type: any,data:any) => {
  try {
    const response = await request.post({
      url: `/upload/${type}/`,
        data,
      headers: {
        "Content-Type": 'multipart/form-data',
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};


export const getUserType = async () => {
  try {
    const response = await request.get(`/user-type`);
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

export const updUserType = async ({ userID, typeData }: any) => {
  try {
    const response = await request.put({
      url: `/user-type/${userID}/`,
      data: typeData,
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
