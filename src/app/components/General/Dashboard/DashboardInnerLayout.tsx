import { DashboardInnerLayoutTypes } from "@/types/service";
import React from "react";

const DashboardInnerLayout = ({
  title,
  children,
  options,
}: DashboardInnerLayoutTypes) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between py-0 pb-8">
        <div>
          <h3 className="font-semibold text-2xl text-primary-700">{title}</h3>
        </div>
        <div>{options}</div>
      </div>
      {children}
    </>
  );
};

export default DashboardInnerLayout;
