import { request } from "@/utils";

export const getDashboardAnalytics = async () => {
  try {
    const dashAnalutics = await request.get(`/dashboard/analytics/`);

    return dashAnalutics;
  } catch (err) {
    return err;
  }
};
