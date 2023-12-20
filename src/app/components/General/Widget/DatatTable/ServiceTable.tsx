"use client";
import LatestTable from "@/app/components/General/Widget/DatatTable/LatestTable";
import { ChevronDownIcon } from "@/app/components/Icons/ChevronDownIcon";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import moment from "moment";
import { useRouter } from "next/navigation";

const ServiceTable = ({ tableData }: any) => {
  const router = useRouter();
  return (
    <>
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
              moment(row?.original?.created_at).format("MMMM Do YYYY, h:mm a"),
          },
          {
            accessorFn: (row: any) => `${row.display_name}`, //accessorFn used to join multiple data into a single cell
            id: "status", //id is still required when using accessorFn instead of accessorKey
            header: "Status",
            Cell: ({ renderedCellValue, row }: any) => (
              <Chip
                className="capitalize"
                color={row?.original?.status == "ACTIVE" ? "success" : "danger"}
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
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    router.push(`/jobs?view=${row.original.id}&type=service`, {
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
    </>
  );
};

export default ServiceTable;
