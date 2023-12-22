import { request } from "@/utils";

export const getJobService = async () => {
  try {
    const [jobs, services] = await Promise.allSettled([
      request.get(`/jobs/`),
      request.get(`/services/`),
    ]);

    return {
      jobs: jobs?.status === "fulfilled" ? jobs?.value?.results : null,
      services:
        services?.status === "fulfilled" ? services?.value?.results : null,
    };
  } catch (err) {
    return err;
  }
};

export const getJobServiceDetails = async (page: string, userID: any) => {
  try {
    const response = await request.delete(`/${page}/delete/${userID}/`);
    return response;
  } catch (err) {
    return err;
  }
};
