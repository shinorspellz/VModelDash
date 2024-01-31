import React, { useState } from "react";
import BasicCard from "../General/Widget/BasicCard";
import LatestTable from "../General/Widget/DatatTable/LatestTable";
import {
  Avatar,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  User,
} from "@nextui-org/react";
import moment from "moment";
import { ChevronDownIcon } from "../Icons/ChevronDownIcon";
import { delPost } from "@/service/posts";
import { Alerter } from "../General/Alerter";
import { PLoader } from "../LoaderAlert";

const UsersPosts = ({ userData }: any) => {
  // console.log(userData?.id);
  const [Reloader, setReloader] = useState(true);
  const [NotificateionAlert, setNotificateionAlert] = useState({
    isEnabled: false,
    message: "",
    type: "",
  });
  const [isPopLoader, setIsPopLoader] = useState({
    open: false,
    text: "",
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
  const clearAlert = () => {
    setNotificateionAlert({
      isEnabled: false,
      message: "",
      type: "",
    });
  };

  const _handleDelete = async (id: number) => {
    clearAlert();
    setIsPopLoader({
      open: true,
      text: "Deleting post, Please wait....",
    });
    await delPost(id);
    alertPreviewer(true, "Post Deleted Successfully", "success");
    setIsPopLoader({
      open: false,
      text: "",
    });
    setReloader(false);
    setTimeout(() => {
      setReloader(true);
    }, 200);
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

      <BasicCard
        title=""
        desc=""
        options={<></>}
        maxHeight="auto"
        isPadding={true}
      >
        {Reloader && (
          <LatestTable
            url={`/posts/${userData?.id}`}
            enableRowSelection={false}
            enableRowActions={true}
            TableColumns={[
              {
                accessorFn: (row: any) => `${row.id}`, //accessorFn used to join multiple data into a single cell
                id: "id", //id is still required when using accessorFn instead of accessorKey
                header: "Media Resource(s)",
                // size: 350,
                Cell: ({ renderedCellValue, row }: any) => (
                  <>
                    {row.original?.resources?.length &&
                      row.original?.resources?.map((item: any, index: any) => (
                        <Image
                          style={{
                            zIndex: 1,
                          }}
                          key={index}
                          width={70}
                          alt="NextUI hero Image"
                          src={item}
                        />
                      ))}
                  </>
                ),
              },
              {
                accessorKey: "caption",
                header: "Caption",
              },
              {
                accessorKey: "likes",
                header: "Likes",
              },
              {
                accessorKey: "post_type",
                header: "Type",
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
                accessorFn: (row: any) => `${row.deleted}`, //accessorFn used to join multiple data into a single cell
                id: "deleted", //id is still required when using accessorFn instead of accessorKey
                header: "Status",
                Cell: ({ renderedCellValue, row }: any) => (
                  <Chip
                    className="capitalize"
                    color={
                      row?.original?.deleted == false ? "success" : "danger"
                    }
                    size="sm"
                    variant="flat"
                  >
                    {row?.original.deleted ? "Deleted" : "Active"}
                  </Chip>
                ),
              },
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
                      endContent={<ChevronDownIcon className="text-small" />}
                      variant="flat"
                    >
                      Manage
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="">
                    {/* <DropdownItem
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
                            </DropdownItem> */}
                    <DropdownItem
                      closeOnSelect
                      onClick={() => _handleDelete(row.original.id)}
                      aria-label=""
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            )}
          />
        )}
        {/* <UserTable tableData={analyticsData.allUsers} /> */}
      </BasicCard>
    </>
  );
};

export default UsersPosts;
