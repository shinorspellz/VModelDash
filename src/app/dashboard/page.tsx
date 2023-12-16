"use client";

import { RootState } from "@/redux/store";
import { getDashboardAnalytics } from "@/service/dashboard";
import CardData from "@/utils/data/CardAnalytics.json";
import VMIcons from "@/utils/icons";
import { Button } from "@nextui-org/react";
import { subDays } from "date-fns";
import { Refresh2 } from "iconsax-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardInnerLayout from "../components/General/Dashboard/DashboardInnerLayout";
import RecentBookings from "../components/General/Dashboard/RecentBookings";
import TrendSetters from "../components/General/Dashboard/TrendSetters";
import BasicCard from "../components/General/Widget/BasicCard";
import CounterCard from "../components/General/Widget/CounterCard";
import PostAnalytics from "../components/General/Dashboard/PostAnalytics";
import { Grid } from "@mui/material";

const now = new Date();

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<any>({
    users: 0,
    coupons: 0,
    services: 0,
    jobs: 0,
    bookings: 0,
    applications: 0,
    noOfPost: 0,
    intPost: 0,
  });
  const authData: any = useSelector(
    (state: RootState) => state.authReducer.value
  );

  const getAnalytics = async () => {
    const { dashAnalytics, userAnalytics }: any = await getDashboardAnalytics();
    // console.log(userAnalytics);
    if (dashAnalytics) {
      setAnalyticsData({
        ...analyticsData,
        users: dashAnalytics?.total_number_of_users,
        coupons: dashAnalytics?.total_number_of_coupons,
        services: dashAnalytics?.total_number_of_services,
        jobs: dashAnalytics?.total_number_of_jobs,
        bookings: dashAnalytics?.total_number_of_bookings,
        applications: dashAnalytics?.total_number_of_applications,
        noOfPost: userAnalytics?.total_number_of_posts,
        intPost: userAnalytics?.total_number_of_posts_with_interactions,
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    getAnalytics();
  }, []);

  return (
    <DashboardInnerLayout
      title={`Hello, ${authData?.user?.first_name}`}
      options={
        <>
          <Button
            color="primary"
            startContent={<Refresh2 size="19" color="#fff" />}
            onClick={getAnalytics}
          >
            Refresh
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CardData.length &&
          CardData.map((cardItem) => (
            <CounterCard
              title={cardItem.title}
              url={cardItem.url}
              counter={analyticsData[cardItem.id]}
              icon={<VMIcons iconType={cardItem.icon} />}
              key={cardItem.id}
              isLoading={isLoading}
            />
          ))}
      </div>
      <div className="mt-6">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <BasicCard
              title="Recent Bookings"
              desc="Most Recent Booking"
              options={<></>}
              isPadding={true}
              maxHeight={"440px"}
            >
              <div className="h-[400px]">
                <RecentBookings
                  transactions={[
                    {
                      id: "d46800328cd510a668253b45",
                      amount: 25000,
                      createdAt: now.getTime(),
                      currency: "usd",
                      sender: "Devias",
                      status: "on_hold",
                      type: "receive",
                    },
                    {
                      id: "b4b19b21656e44b487441c50",
                      amount: 6843,
                      createdAt: subDays(now, 1).getTime(),
                      currency: "usd",
                      sender: "Zimbru",
                      status: "confirmed",
                      type: "send",
                    },
                    {
                      id: "56c09ad91f6d44cb313397db",
                      amount: 91823,
                      createdAt: subDays(now, 1).getTime(),
                      currency: "usd",
                      sender: "Vertical Jelly",
                      status: "failed",
                      type: "send",
                    },
                    {
                      id: "aaeb96c5a131a55d9623f44d",
                      amount: 49550,
                      createdAt: subDays(now, 3).getTime(),
                      currency: "usd",
                      sender: "Devias",
                      status: "confirmed",
                      type: "receive",
                    },
                  ]}
                />
              </div>
            </BasicCard>
          </Grid>
          <Grid item xs={12} md={4}>
            {/* <PostAnalytics
              title="Post Analytics"
              chart={{
                series: [
                  {
                    id: "nop",
                    label: "Number of Post",
                    value: analyticsData?.noOfPost,
                  },
                  {
                    id: "pwi",
                    label: "Post With Interactions",
                    value: analyticsData?.intPost,
                  },
                ],
              }}
            /> */}
            {/* <TrendSetters /> */}
          </Grid>
        </Grid>
      </div>
    </DashboardInnerLayout>
  );
};

export default DashboardPage;
