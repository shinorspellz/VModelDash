import { request } from "@/utils";

export const getDashboardAnalytics = async () => {
  try {
    const [dashAnalytics, userAnalytics] = await Promise.allSettled([
      request.get(`/dashboard/analytics/`),
      request.get(`/users/analytics/`),
    ]);
    return {
      dashAnalytics:
        dashAnalytics?.status === "fulfilled"
          ? dashAnalytics?.value?.data
          : null,
      userAnalytics:
        userAnalytics?.status === "fulfilled"
          ? userAnalytics?.value?.data
          : null,
    };
  } catch (err) {
    return err;
  }
};
