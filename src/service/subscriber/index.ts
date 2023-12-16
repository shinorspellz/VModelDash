import { request } from "@/utils";

export const delSubsDetails = async (userID: any) => {
  try {
    const response = await request.delete(`/newsletter-subscribers/${userID}/`);
    return response;
  } catch (err) {
    return err;
  }
};
