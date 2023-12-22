"use client";
import LatestTable from "@/app/components/General/Widget/DatatTable/LatestTable";
import { ChevronDownIcon } from "@/app/components/Icons/ChevronDownIcon";
import { PLoader } from "@/app/components/LoaderAlert";
import { getJobServiceDetails } from "@/service/jobservice";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alerter } from "../../Alerter";

const ServiceTable = ({ tableData }: any) => {
  const [isLoading, setIsLoading] = useState(false);
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
      setIsPopLoader({
        open: false,
        text: "",
      });
    }, 300);
  };

  const clearAlert = () => {
    setNotificateionAlert({
      isEnabled: false,
      message: "",
      type: "",
    });
  };

  const _handleDelete = async (userID: any) => {
    clearAlert();
    setIsPopLoader({
      open: true,
      text: "Deleting services, Please wait....",
    });
    await getJobServiceDetails("services", userID);
    alertPreviewer(true, "Services Deleted Successfully", "success");
    getAnalytics();
    //console.log(userID);
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
      {isLoading ? (
        <div className="flex items-center justify-center h-[200px] text-center">
          <Spinner />
        </div>
      ) : (
        <LatestTable
          url="/services/"
          enableRowSelection={false}
          enableRowActions={true}
          TableColumns={[
            {
              accessorKey: "title",
              header: "TITLE",
            },
            {
              accessorKey: "service_type",
              header: "TYPE",
            },
            {
              accessorKey: "added_by",
              header: "ADDED BY",
            },
            {
              accessorFn: (row: any) => `${row.display_name}`, //accessorFn used to join multiple data into a single cell
              id: "created_at", //id is still required when using accessorFn instead of accessorKey
              header: "Date Created",
              Cell: ({ renderedCellValue, row }: any) =>
                moment(row?.original?.created_at).format(
                  "MMMM Do YYYY, h:mm a"
                ),
            },
            {
              accessorFn: (row: any) => `${row.display_name}`, //accessorFn used to join multiple data into a single cell
              id: "status", //id is still required when using accessorFn instead of accessorKey
              header: "Status",
              Cell: ({ renderedCellValue, row }: any) => (
                <Chip
                  className="capitalize"
                  color={
                    row?.original?.status == "ACTIVE" ? "success" : "danger"
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
            <div className="relative flex justify-center items-center gap-2">
              <Dropdown aria-label="button" closeOnSelect>
                <DropdownTrigger
                  aria-label=""
                  style={{
                    position: "relative",
                    zIndex: 0,
                  }}
                >
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                  >
                    Manage
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="">
                  {/* <DropdownItem
                  onClick={() => {
                    router.push(`/jobs?view=${row.original.id}&type=service`, {
                      scroll: false,
                    });
                  }}
                >
                  View
                </DropdownItem> */}
                  <DropdownItem
                    aria-label=""
                    onClick={() => _handleDelete(row.original.id)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
        />
      )}
    </>
  );
};

export default ServiceTable;
