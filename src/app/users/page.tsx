"use client";
import React from "react";
import DashboardInnerLayout from "../components/General/Dashboard/DashboardInnerLayout";
import CardData from "@/utils/UsersAnalytics.json";
import CounterCard from "../components/General/Widget/CounterCard";
import VMIcons from "@/utils/icons";
import BasicCard from "../components/General/Widget/BasicCard";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import { users } from "@/utils/UserData";
import UserTable from "../components/General/Widget/DatatTable/UserTable";

const UsersPage = () => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);
  return (
    <DashboardInnerLayout title="Users">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CardData.length &&
          CardData.map((cardItem) => (
            <CounterCard
              title={cardItem.title}
              url={cardItem.url}
              counter={cardItem.count}
              icon={<VMIcons iconType={cardItem.icon} />}
              key={cardItem.id}
            />
          ))}
      </div>
      <div className="mt-6">
        <BasicCard title="" desc="" options={<></>} maxHeight="500px">
          <UserTable />
        </BasicCard>
      </div>
    </DashboardInnerLayout>
  );
};

export default UsersPage;
