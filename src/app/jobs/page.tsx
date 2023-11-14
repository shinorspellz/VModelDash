"use client";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";
import { Refresh2 } from "iconsax-react";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardInnerLayout from "../components/General/Dashboard/DashboardInnerLayout";
import Details from "../components/General/JobService/Details";
import BasicCard from "../components/General/Widget/BasicCard";
import LatestTable from "../components/General/Widget/DatatTable/LatestTable";
import ServiceTable from "../components/General/Widget/DatatTable/ServiceTable";
import VMTab from "../components/General/Widget/VMTab";
import { ChevronDownIcon } from "../components/Icons/ChevronDownIcon";

const UsersPage = () => {
  const router = useRouter();
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
    setIsLoading(false);
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
                <>
                  <LatestTable
                    url="/jobs/"
                    enableRowSelection={false}
                    enableRowActions={true}
                    TableColumns={[
                      {
                        accessorKey: "job_title",
                        header: "TITLE",
                      },
                      {
                        accessorKey: "job_type",
                        header: "TYPE",
                      },
                      {
                        accessorKey: "added_by",
                        header: "ADDED BY",
                      },
                      {
                        accessorFn: (row: any) => `${row.created_at}`, //accessorFn used to join multiple data into a single cell
                        id: "created_at", //id is still required when using accessorFn instead of accessorKey
                        header: "Date Created",
                        Cell: ({ renderedCellValue, row }: any) =>
                          moment(row?.original?.created_at).format(
                            "MMMM Do YYYY, h:mm a"
                          ),
                      },
                      {
                        accessorFn: (row: any) => `${row.status}`, //accessorFn used to join multiple data into a single cell
                        id: "status", //id is still required when using accessorFn instead of accessorKey
                        header: "Status",
                        Cell: ({ renderedCellValue, row }: any) => (
                          <Chip
                            className="capitalize"
                            color={
                              row?.original?.status == "ACTIVE"
                                ? "success"
                                : "danger"
                            }
                            size="sm"
                            variant="flat"
                          >
                            {row?.original.status}
                          </Chip>
                        ),
                      },
                    ]}
                    renderRowActions={({ row, table }: any) => (
                      <div className="relative flex justify-center items-center">
                        <Dropdown>
                          <DropdownTrigger
                            style={{
                              position: "relative",
                              zIndex: 0,
                            }}
                          >
                            <Button
                              endContent={
                                <ChevronDownIcon className="text-small" />
                              }
                              variant="flat"
                            >
                              Manage
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem
                              onClick={() => {
                                router.push(
                                  `/jobs?view=${row.original.id}&type=job`,
                                  {
                                    scroll: false,
                                  }
                                );
                              }}
                            >
                              View
                            </DropdownItem>
                            <DropdownItem>Edit</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    )}
                  />
                </>
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
