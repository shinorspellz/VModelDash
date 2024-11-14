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
import SendMessage from "../components/User/SendMessage";

const UsersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenEdit, setIsOpenEdit] = useState({
    open: false,
    userID: "",
    userData: {},
  });
  const [isOpenMessage, setIsMessage] = useState({
    open: false,
    userID: "",
    userData: {},
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isShowModal, setIsShowModal] = useState(false);
  const [userID, setuserID] = useState<any>("");
  const [analyticsData, setAnalyticsData] = useState<any>({
    users: 0,
    admin: 0,
    banned: 0,
    allUsers: [],
  });
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
    const { userAnalytics }: any = await getUserAnalytics();
    if (userAnalytics) {
      setAnalyticsData({
        ...analyticsData,
        users: userAnalytics?.total_users,
        admin: userAnalytics?.total_admin_users,
        banned: userAnalytics?.total_banned_users,
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  const clearAlert = () => {
    setNotificateionAlert({
      isEnabled: false,
      message: "",
      type: "",
    });
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

  const _handleMesssage = async (userID: any) => {
    clearAlert();
    setIsPopLoader({
      open: true,
      text: "Deleting user, Please wait....",
    });
    await delUserDetails(userID);
    alertPreviewer(true, "User Deleted Successfully", "success");
    getAnalytics();
    // if (response?.status) {
    //   alertPreviewer(true, "User Deleted Successfully", "success");
    // } else {
    //   alertPreviewer(true, "An error occured. Please try again", "error");
    // }

    /// console.log(response);

    setIsPopLoader({
      open: false,
      text: "",
    });
  };

  const _handleDelete = async (userID: any) => {
    clearAlert();
    setIsPopLoader({
      open: true,
      text: "Deleting user, Please wait....",
    });
    await delUserDetails(userID);
    alertPreviewer(true, "User Deleted Successfully", "success");
    getAnalytics();
    // if (response?.status) {
    //   alertPreviewer(true, "User Deleted Successfully", "success");
    // } else {
    //   alertPreviewer(true, "An error occured. Please try again", "error");
    // }

    /// console.log(response);

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
          AlertTimeout={50000}
        />
      )}
      {isPopLoader?.open && (
        <PLoader showLiner={false} popText={isPopLoader?.text} />
      )}

      {isOpenEdit?.open && (
        <EditUser
          options={{
            onClose: () =>
              setIsOpenEdit({
                open: false,
                userID: "",
                userData: {},
              }),
            meta: { ...isOpenEdit?.userData },
          }}
        />
      )}
      {isOpenMessage?.open &&
      <SendMessage
        options={{
          onClose: () =>
            setIsMessage({
              open: false,
              userID: "",
              userData: {},
            }),
          meta: { ...isOpenMessage?.userData },
        }}
      />}


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
                url="/users/"
                enableRowSelection={false}
                enableRowActions={true}
                TableColumns={[
                  {
                    accessorFn: (row: any) => `${row.display_name}`, //accessorFn used to join multiple data into a single cell
                    id: "display_name", //id is still required when using accessorFn instead of accessorKey
                    header: "Name",
                    // size: 350,
                    Cell: ({ renderedCellValue, row }: any) => (
                      <User
                        avatarProps={{
                          radius: "lg",
                          src: row.original.profile_picture_url,
                        }}
                        description={row.original.email}
                        name={renderedCellValue}
                      >
                        {row.original.email}
                      </User>
                    ),
                  },
                  {
                    accessorKey: "personality",
                    header: "Personality",
                  },
                  {
                    accessorKey: "country",
                    header: "Country",
                  },
                  {
                    accessorKey: "views",
                    header: "Views",
                  },
                  {
                    accessorFn: (row: any) => `${row.display_name}`, //accessorFn used to join multiple data into a single cell
                    id: "is_verified", //id is still required when using accessorFn instead of accessorKey
                    header: "Status",
                    Cell: ({ renderedCellValue, row }: any) => (
                      <Chip
                        className="capitalize"
                        color={row.original.is_verified ? "success" : "danger"}
                        size="sm"
                        variant="flat"
                      >
                        {row.original.is_verified ? "Verified" : "Not Verified"}
                      </Chip>
                    ),
                  },
                  // {
                  //   accessorKey: "size",
                  //   header: "ACTION",
                  //   size: 60,
                  //   //custom conditional format and styling
                  //   Cell: ({ cell, row }: any) => (
                  //     <div className="relative flex justify-center items-center gap-2">
                  //       <Dropdown>
                  //         <DropdownTrigger
                  //           style={{
                  //             position: "relative",
                  //             zIndex: 0,
                  //           }}
                  //         >
                  //           <Button
                  //             endContent={
                  //               <ChevronDownIcon className="text-small" />
                  //             }
                  //             variant="flat"
                  //           >
                  //             Manage
                  //           </Button>
                  //         </DropdownTrigger>
                  //         <DropdownMenu>
                  //           <DropdownItem
                  //             onClick={() => {
                  //               router.push(
                  //                 `/users?viewUser=${row.original.id}`,
                  //                 {
                  //                   scroll: false,
                  //                 }
                  //               );
                  //             }}
                  //           >
                  //             View
                  //           </DropdownItem>
                  //           <DropdownItem>Edit</DropdownItem>
                  //         </DropdownMenu>
                  //       </Dropdown>
                  //     </div>
                  //   ),
                  // },
                  //end
                ]}
                renderRowActions={({ row, table }: any) => (
                  <div className="relative flex justify-center items-center gap-2">
                    <Dropdown aria-label="button">
                      <DropdownTrigger
                        style={{
                          position: "relative",
                          zIndex: 0,
                        }}
                        aria-label="button"
                      >
                        <Button
                          aria-label="button"
                          endContent={
                            <ChevronDownIcon className="text-small" />
                          }
                          variant="flat"
                        >
                          Manage
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="button">
                        <DropdownItem
                          closeOnSelect
                          aria-label="button"
                          onClick={() => {
                            router.push(`/users?viewUser=${row.original.id}`, {
                              scroll: false,
                            });
                          }}
                        >
                          View
                        </DropdownItem>
                        <DropdownItem
                          aria-label="button"
                          closeOnSelect
                          onClick={() =>
                            setIsOpenEdit({
                              open: true,
                              userID: row.original.id,
                              userData: row.original,
                            })
                          }
                        >
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          closeOnSelect
                          aria-label="button"
                          onClick={() =>
                            setIsMessage({
                              open: true,
                              userID: row.original.id,
                              userData: row.original,
                            })
                          }
                        >
                          Send Message
                        </DropdownItem>
                        <DropdownItem
                          closeOnSelect
                          aria-label="button"
                          onClick={() => _handleDelete(row.original.id)}
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

export default UsersPage;
