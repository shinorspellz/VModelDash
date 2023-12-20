import { storeUserDetails } from "@/utils/AtomProviders";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useAtom } from "jotai";
import { useEffect } from "react";
import VMPopup from "../General/Widget/VMPopup";
import BasicDEtails from "./Manage/BasicDEtails";
import OtherDetails from "./Manage/OtherDetails";
import VerDetails from "./Manage/VerDetails";

const EditUser = ({ options }: { options: any }) => {
  const { onClose, meta } = options;
  const [_, setUserDetails] = useAtom(storeUserDetails);
  useEffect(() => {
    setUserDetails(meta);
  }, []);
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
    {
      id: "others",
      label: "Others",
      content: <OtherDetails />,
    },
  ];

  return (
    <>
      <VMPopup isClose={onClose} title="Edit User" size="4xl">
        <div className="flex w-full flex-col">
          <Tabs aria-label="Dynamic tabs" items={tabs}>
            {(item) => (
              <Tab
                key={item.id}
                title={
                  <div className="flex items-center space-x-2">
                    {" "}
                    {/* <User variant="Bold" size={14} /> */}
                    <div>{item.label}</div>
                  </div>
                }
              >
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
