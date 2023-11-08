import { request } from "@/utils";

export const getDashboardAnalytics = async () => {
  try {
    const [userAnalytics, bookings, coupons, services, jobs] =
      await Promise.allSettled([
        request.get(`/users/analytics/`),
        request.get(`/bookings/`),
        request.get(`/coupons/`),
        request.get(`/services/`),
        request.get(`/jobs/`),
      ]);

    return {
      userAnalytics:
        userAnalytics?.status === "fulfilled" ? userAnalytics.value.data : null,
      bookings: bookings?.status === "fulfilled" ? bookings.value : null,
      coupons: coupons?.status === "fulfilled" ? coupons.value : null,
      services: services?.status === "fulfilled" ? services.value : null,
      jobs: jobs?.status === "fulfilled" ? jobs.value : null,
    };
  } catch (err) {
    return err;
  }
};
