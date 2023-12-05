import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import VMPopup from "../General/Widget/VMPopup";
import BasicDEtails from "./Manage/BasicDEtails";
import React, { useEffect } from "react";
import VerDetails from "./Manage/VerDetails";


const EditUser = ({ options }: { options: any }) => {
  const { onClose, meta } = options;
  let tabs = [
    {
      id: "basic",
      label: "Basic Details",
      content: <BasicDEtails userData={meta} />,
    },
    {
      id: "verify",
      label: "Verification",
      content: <VerDetails userData={meta} />,
    },
  ];

  return (
    <>
      <VMPopup isClose={onClose} title="Edit User" size="3xl">
        <div className="flex w-full flex-col">
          <Tabs aria-label="Dynamic tabs" items={tabs}>
            {(item) => (
              <Tab key={item.id} title={item.label}>
                <Card
                  classNames={{
                    base: "shadow mt-5",
                    body: "shadow",
                  }}
                >
                  <CardBody>{item.content}</CardBody>
                </Card>
              </Tab>
            )}
          </Tabs>
        </div>
      </VMPopup>
    </>
  );
};

export default EditUser;
