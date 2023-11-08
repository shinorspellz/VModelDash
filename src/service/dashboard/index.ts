import { request } from "@/utils";

export const getUsers = async () => {
  try {
    const { data } = await request.get(`/users/analytics/`);
    return data;
  } catch (err) {
    return err;
  }
};
