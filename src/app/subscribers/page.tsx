"use client";
import { delUserDetails, getUserAnalytics } from "@/service/user";
import CardData from "@/utils/data/UsersAnalytics.json";
import VMIcons from "@/utils/icons";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  User,
} from "@nextui-org/react";
import { Refresh2 } from "iconsax-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardInnerLayout from "../components/General/Dashboard/DashboardInnerLayout";
import BasicCard from "../components/General/Widget/BasicCard";
import CounterCard from "../components/General/Widget/CounterCard";
import LatestTable from "../components/General/Widget/DatatTable/LatestTable";
import { ChevronDownIcon } from "../components/Icons/ChevronDownIcon";
import { PLoader } from "../components/LoaderAlert";
import EditUser from "../components/User/EditUser";
import UserDetails from "../components/User/UserDetails";
import { Alerter } from "../components/General/Alerter";
import moment from "moment";
import { delSubsDetails } from "@/service/subscriber";

const SubscriberPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenEdit, setIsOpenEdit] = useState({
    open: false,
    userID: "",
    userData: {},
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isShowModal, setIsShowModal] = useState(false);
  const [userID, setuserID] = useState<any>("");
  const [analyticsData, setAnalyticsData] = useState<any>([{}]);
  const [isPopLoader, setIsPopLoader] = useState({
    open: false,
    text: "",
  });

  const [NotificateionAlert, setNotificateionAlert] = useState({
    isEnabled: false,
    message: "",
    type: "",
  });

  const alertPreviewer = (
    AlStatus: boolean,
    AlStmt: string,
    AlType: string
  ) => {
    setNotificateionAlert({
      isEnabled: AlStatus,
      message: AlStmt,
      type: AlType,
    });
  };

  const getAnalytics = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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

  const _handleDelete = async (userID: any) => {
    setIsPopLoader({
      open: true,
      text: "Deleting user, Please wait....",
    });
    const response: any = await delSubsDetails(userID);
    if (response?.status) {
      alertPreviewer(true, "Subscriber Deleted Successfully", "success");
    } else {
      alertPreviewer(true, "An error occured. Please try again", "error");
    }

    setIsPopLoader({
      open: false,
      text: "",
    });
  };
  return (
    <>
      {NotificateionAlert.isEnabled && (
        <Alerter
          Alerttype={NotificateionAlert.type}
          AlertStmt={NotificateionAlert.message}
          AlertTimeout={5000}
        />
      )}
      {isPopLoader?.open && (
        <PLoader showLiner={false} popText={isPopLoader?.text} />
      )}

      <DashboardInnerLayout
        title="Subscribers"
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
        <div className="mt-6">
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
                url="/newsletter-subscribers/"
                enableRowSelection={false}
                enableRowActions={true}
                TableColumns={[
                  {
                    accessorKey: "email",
                    header: "Email",
                  },
                  {
                    accessorKey: "business_type",
                    header: "Business Type",
                  },
                  {
                    accessorFn: (row: any) => `${row.created_at}`, //accessorFn used to join multiple data into a single cell
                    id: "registered_at", //id is still required when using accessorFn instead of accessorKey
                    header: "Date Reg.",
                    Cell: ({ renderedCellValue, row }: any) =>
                      moment(row?.original?.created_at).format(
                        "MMMM Do YYYY, h:mm a"
                      ),
                  },
                ]}
                renderRowActions={({ row, table }: any) => (
                  <div className="relative flex justify-start items-center gap-2">
                    <Dropdown aria-label="button" closeOnSelect>
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
                          Manage Subscriber
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        {/* <DropdownItem onClick={() => {}}>View</DropdownItem>
                        <DropdownItem onClick={() => {}}>Edit</DropdownItem> */}
                        <DropdownItem
                          onClick={() => _handleDelete(row.original.email)}
                        >
                          Delete
                        </DropdownItem>
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

export default SubscriberPage;
