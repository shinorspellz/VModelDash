"use client";
import { useEffect, useState } from "react";
import DashboardInnerLayout from "../components/General/Dashboard/DashboardInnerLayout";
import BasicCard from "../components/General/Widget/BasicCard";
import JobTable from "../components/General/Widget/DatatTable/JobTable";
import VMTab from "../components/General/Widget/VMTab";
import ServiceTable from "../components/General/Widget/DatatTable/ServiceTable";
import { getJobService } from "@/service/jobservice";
import { Button, Spinner } from "@nextui-org/react";
import { Refresh2 } from "iconsax-react";
import { useSearchParams } from "next/navigation";
import Details from "../components/General/JobService/Details";

const UsersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("jobs");
  const [isShowModal, setIsShowModal] = useState(false);
  const [metaInfo, setMetaInfo] = useState<any>("");
  const searchParams = useSearchParams();
  const [analyticsData, setAnalyticsData] = useState<any>({
    jobs: [],
    services: [],
  });

  const getAnalytics = async () => {
    setIsLoading(true);
    const { jobs, services }: any = await getJobService();
    if (jobs) {
      setAnalyticsData({
        ...analyticsData,
        jobs,
        services,
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    const view = searchParams.get("view");
    const type = searchParams.get("type");
    setIsShowModal(false);
    if (view) setIsShowModal(true);
    setMetaInfo({ view, type });
  }, [searchParams]);

  useEffect(() => {
    getAnalytics();
  }, []);
  return (
    <>
      {isShowModal && <Details metaInfo={metaInfo} />}
      <DashboardInnerLayout
        title="Jobs & Services"
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
        <BasicCard title="" desc="" options={<></>} maxHeight="auto">
          <div className="mb-6">
            <VMTab
              activeTab={(e) => setActiveTab(e)}
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
          {isLoading ? (
            <div className="flex items-center justify-center h-[200px] text-center">
              <Spinner />
            </div>
          ) : (
            <>
              {activeTab == "jobs" && (
                <JobTable tableData={analyticsData.jobs} />
              )}
              {activeTab == "services" && (
                <ServiceTable tableData={analyticsData.services} />
              )}
            </>
          )}
        </BasicCard>
      </DashboardInnerLayout>
    </>
  );
};

export default UsersPage;
