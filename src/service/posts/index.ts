import { request } from "@/utils";

export const delPost = async (userID: any) => {
  try {
    const response = await request.delete(`/post/delete/${userID}`);
    return response;
  } catch (err) {
    return err;
  }
};
