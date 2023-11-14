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
  });
  const authData: any = useSelector(
    (state: RootState) => state.authReducer.value
  );

  const getAnalytics = async () => {
    const { data }: any = await getDashboardAnalytics();
    if (data) {
      setAnalyticsData({
        ...analyticsData,
        users: data?.total_number_of_users,
        coupons: data?.total_number_of_coupons,
        services: data?.total_number_of_services,
        jobs: data?.total_number_of_jobs,
        bookings: data?.total_number_of_bookings,
        applications: data?.total_number_of_applications,
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
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="mt-6 w-full md:w-[66%]">
          <BasicCard
            title="Recent Bookings"
            desc="Most Recent Booking"
            options={<></>}
            isPadding={true}
            maxHeight={"274px"}
          >
            <div className="h-[250px]">
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
        </div>

        <div className="mt-6 w-full md:w-[32%]">
          <BasicCard
            title="Trend Setters"
            desc="VModel Top 4 Trend-Setters"
            options={<></>}
          >
            <div className="h-[250px]">
              <TrendSetters />
            </div>
          </BasicCard>
        </div>
      </div>
    </DashboardInnerLayout>
  );
};

export default DashboardPage;
