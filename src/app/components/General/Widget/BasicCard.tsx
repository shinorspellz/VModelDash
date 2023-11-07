import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { BasicCardTypes } from "@/types/service";
import ScrollBar from "../ScrollBar";

const BasicCard = ({
  children,
  options,
  title,
  desc,
  maxHeight,
}: BasicCardTypes) => {
  return (
    <Card className="vm-shadow-xs">
      <CardBody>
        {title && (
          <div
            className="flex items-center"
            style={{
              height: 69,
              padding: "0 10px 16px",
            }}
          >
            <div
              style={{
                flex: "1 1 auto",
              }}
            >
              <span className="text-[1.0417rem] m-0 font-bold leading-[1.2] block">
                {title}
              </span>
              {desc && desc !== "" && (
                <div className="text-sm mt-1 opacity-80 text-primary-700">
                  {desc}
                </div>
              )}
            </div>

            <div>{options}</div>
          </div>
        )}
        <ScrollBar styles={{ maxHeight: maxHeight ?? "250px" }}>
          <div
            style={{
              padding: "0px 10px 16px",
            }}
          >
            {children}
          </div>
        </ScrollBar>
      </CardBody>
    </Card>
  );
};

export default BasicCard;
