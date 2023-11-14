"use client";
import {
  Button,
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
import { ChevronDownIcon } from "../components/Icons/ChevronDownIcon";

const UsersPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const [isShowModal, setIsShowModal] = useState(false);
  const [metaInfo, setMetaInfo] = useState<any>("");

  const getAnalytics = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const view = searchParams.get("view");
    setIsShowModal(false);
    if (view) setIsShowModal(true);
    setMetaInfo({ view });
  }, [searchParams]);

  useEffect(() => {
    getAnalytics();
  }, []);
  return (
    <>
      {isShowModal && <Details metaInfo={metaInfo} />}
      <DashboardInnerLayout
        title="Coupons"
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
        <div>
          {isLoading ? (
            <BasicCard title="" desc="" options={<></>} maxHeight="auto">
              <div className="flex items-center justify-center h-[200px] text-center">
                <Spinner />
              </div>
            </BasicCard>
          ) : (
            <BasicCard
              title=""
              desc=""
              options={<></>}
              maxHeight="auto"
              isPadding={true}
            >
              <LatestTable
                url="/coupons/"
                enableRowSelection={false}
                enableRowActions={true}
                TableColumns={[
                  {
                    accessorKey: "title",
                    header: "Title",
                  },
                  {
                    accessorKey: "code",
                    header: "Code",
                  },
                  {
                    accessorKey: "added_by",
                    header: "Added by",
                  },

                  {
                    accessorKey: "use_limit",
                    header: "Use Limit",
                  },
                  {
                    accessorFn: (row: any) => `${row.date_created}`,
                    id: "date_created",
                    header: "Date Created",
                    Cell: ({ row }: any) =>
                      moment(row?.original?.date_created).format(
                        "MMMM Do YYYY, h:mm a"
                      ),
                  },
                  {
                    accessorFn: (row: any) => `${row.expiry_date}`,
                    id: "expiry_date",
                    header: "Date Created",
                    Cell: ({ row }: any) =>
                      row?.original?.expiry_date == null
                        ? "-"
                        : moment(row?.original?.expiry_date).format(
                            "MMMM Do YYYY, h:mm a"
                          ),
                  },
                ]}
                renderRowActions={({ row, table }: any) => (
                  <div className="relative flex justify-center items-center gap-2">
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
                            router.push(`/coupons?view=${row.original.id}`, {
                              scroll: false,
                            });
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
              {/* <UserTable tableData={analyticsData.allUsers} /> */}
            </BasicCard>
          )}
        </div>
      </DashboardInnerLayout>
    </>
  );
};

export default UsersPage;
