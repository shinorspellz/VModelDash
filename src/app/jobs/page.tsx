"use client";
import DashboardInnerLayout from "../components/General/Dashboard/DashboardInnerLayout";
import BasicCard from "../components/General/Widget/BasicCard";
import JobTable from "../components/General/Widget/DatatTable/JobTable";
import VMTab from "../components/General/Widget/VMTab";

const UsersPage = () => {
  return (
    <DashboardInnerLayout title="Jobs & Services">
      <BasicCard title="" desc="" options={<></>} maxHeight="600px">
        <div className="mb-6">
          <VMTab
            activeTab={(e) => console.log(e)}
            TabData={[
              {
                id: "jobs",
                label: "Jobs",
              },
              {
                id: "services",
                label: "Services",
              },
            ]}
            initialValue={"jobs"}
            isDivider={true}
          />
        </div>
        <JobTable />
      </BasicCard>
    </DashboardInnerLayout>
  );
};

export default UsersPage;
