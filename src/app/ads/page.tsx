"use client";
import DashboardInnerLayout from "../components/General/Dashboard/DashboardInnerLayout";
import BasicCard from "../components/General/Widget/BasicCard";

const UsersPage = () => {
  return (
    <DashboardInnerLayout title="Ads">
      <BasicCard title="" desc="" options={<></>} maxHeight="600px">
        <div className="flex items-center justify-center h-[500px]">
          <h3 className="font-medium text-7xl opacity-50 text-primary-700">
            Coming Soon
          </h3>
        </div>
      </BasicCard>
    </DashboardInnerLayout>
  );
};

export default UsersPage;
