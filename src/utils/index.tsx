import Axios from "axios";
import Cookies from "js-cookie";
import { CACHE_KEYS } from "./constants";
import Env from "./env";
import { CacheFunc, ErrorResponseInt, RequestInt } from "./type";

export const devLog = (...keys: any) => {
  if (Env.isProd) return;
  console.log(`\n\n\n======${keys.shift()}======\n`);
  keys.forEach((key: any) => console.log(key));
};

export const cache: CacheFunc = {
  set: async (cacheKey, data, duration) => {
    const cacheData: any = { data };
    if (duration) cacheData.expireAt = Date.now() + 1000 * duration;
    Cookies.set(cacheKey, JSON.stringify(cacheData));
    return true;
  },
  get: async (cacheKey) => {
    const cachedData = Cookies.get(cacheKey);
    if (cachedData) {
      const { data, expireAt } = JSON.parse(cachedData);
      if (expireAt && Date.now() > expireAt) Cookies.remove(cacheKey);
      else return data;
    }
    return null;
  },

  remove: async (cacheKey) => {
    Cookies.remove(cacheKey);
    return true;
  },
};

export const handleError = (err: any): ErrorResponseInt => {
  const errorPayload: any = {
    message: "Something went wrong",
    statusCode: 500,
    errorCode: 0,
  };
  if (err?.name === "AxiosError") {
    const { data } = err.response;
    errorPayload.message =
      data?.message || "Something went wrong with your request";
    errorPayload.statusCode = data?.httpStatusCode || 500;
    errorPayload.errorCode = data?.errorCode;
  }

  if (!Env.isProd) devLog("Error message", errorPayload);
  return errorPayload;
};

export const request: RequestInt = {
  get: async (url, headers = {}) => {
    try {
      const Authorization = await cache.get(CACHE_KEYS.TOKEN);
      //  console.log(Authorization);
      headers = {
        Authorization: Authorization != null ? `Token  ${Authorization}` : "",
        ...headers,
      };
      const requestParams = {
        url: Env.API_BASE_URL + url,
        method: "GET",
        headers,
      };

      if (!Env.isProd) devLog("GET", requestParams);
      const { data } = await Axios(requestParams);

      return data;
    } catch (err) {
      const { message, statusCode } = handleError(err as Error);
      return { message, statusCode };
    }
  },

  post: async ({ url, data, headers = {} }) => {
    try {
      const Authorization = await cache.get(CACHE_KEYS.TOKEN);
      const requestParams = {
        url: Env.API_BASE_URL + url,
        method: "POST",
        data,
        headers: {
          ...headers,
          Authorization: Authorization != null ? `Token  ${Authorization}` : "",
        },
      };

      if (!Env.isProd) devLog("GET", requestParams);
      const response = await Axios(requestParams);

      devLog("POST response", response);
      return response.data;
    } catch (err) {
      const { message, statusCode, errorCode } = handleError(err as Error);
      return { message, statusCode, errorCode };
    }
  },

  delete: async (url, headers = {}) => {
    try {
      const Authorization = await cache.get(CACHE_KEYS.TOKEN);
      headers = {
        ...headers,
        Authorization: Authorization != null ? `Token  ${Authorization}` : "",
      };
      const { data } = await Axios.delete(Env.API_BASE_URL + url, { headers });

      return data;
    } catch (err) {
      const { message, statusCode } = handleError(err as Error);
      return { message, statusCode };
    }
  },
  patch: async ({ url, data, headers = {} }) => {
    try {
      const Authorization = await cache.get(CACHE_KEYS.TOKEN);
      const requestParams = {
        url: Env.API_BASE_URL + url,
        method: "PATCH",
        data,
        headers: {
          ...headers,
          Authorization: Authorization != null ? `Token  ${Authorization}` : "",
        },
      };

      if (!Env.isProd) devLog("PATCH", requestParams);
      const response = await Axios(requestParams);

      devLog("POST response", response);
      return response.data;
    } catch (err) {
      const { message, statusCode } = handleError(err as Error);
      return { message, statusCode };
    }
  },
};

export const objectToQueryString = (params: Record<string, any>) => {
  const queryParams: string[] = [];
  Object.keys(params).forEach((key) => {
    queryParams.push(`${key}=${params[key]}`);
  });

  return queryParams.join("&");
};
