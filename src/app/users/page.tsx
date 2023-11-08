"use client";
import { getUserAnalytics } from "@/service/user";
import CardData from "@/utils/data/UsersAnalytics.json";
import VMIcons from "@/utils/icons";
import { Button, Spinner } from "@nextui-org/react";
import { Refresh2 } from "iconsax-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardInnerLayout from "../components/General/Dashboard/DashboardInnerLayout";
import BasicCard from "../components/General/Widget/BasicCard";
import CounterCard from "../components/General/Widget/CounterCard";
import UserTable from "../components/General/Widget/DatatTable/UserTable";
import UserDetails from "../components/User/UserDetails";

const UsersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const [isShowModal, setIsShowModal] = useState(false);
  const [userID, setuserID] = useState<any>("");
  const [analyticsData, setAnalyticsData] = useState<any>({
    users: 0,
    admin: 0,
    banned: 0,
    allUsers: [],
  });

  const getAnalytics = async () => {
    setIsLoading(true);
    const { userAnalytics, allUsers }: any = await getUserAnalytics();
    if (userAnalytics) {
      setAnalyticsData({
        ...analyticsData,
        users: userAnalytics?.total_users,
        admin: userAnalytics?.total_admin_users,
        banned: userAnalytics?.total_banned_users,
        allUsers,
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    const viewUser = searchParams.get("viewUser");
    setIsShowModal(false);
    if (viewUser) setIsShowModal(true);
    setuserID(viewUser);
  }, [searchParams]);

  useEffect(() => {
    getAnalytics();
  }, []);
  return (
    <>
      {isShowModal && <UserDetails userID={userID} />}
      <DashboardInnerLayout
        title="Users"
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
          <BasicCard title="" desc="" options={<></>} maxHeight="auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-[200px] text-center">
                <Spinner />
              </div>
            ) : (
              <UserTable tableData={analyticsData.allUsers} />
            )}
          </BasicCard>
        </div>
      </DashboardInnerLayout>
    </>
  );
};

export default UsersPage;
