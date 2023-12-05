import { updUserDetails } from "@/service/user";
import { IFormInputBasic } from "@/types/service";
import { Button, Switch, cn } from "@nextui-org/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alerter } from "../../General/Alerter";
import TextInput from "../../General/TextInput";

const VerDetails = ({ userData }: { userData: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [NotificateionAlert, setNotificateionAlert] = useState({
    isEnabled: false,
    message: "",
    type: "",
  });
  //console.log(userData);
  const [Meta, setMeta] = useState({
    blue_tick_verify: userData?.blue_tick_verify,
    id_verify: userData?.id_verify,
    ban: userData?.ban,
  });

  const clearAlert = () => {
    setNotificateionAlert({
      isEnabled: false,
      message: "",
      type: "",
    });
  };

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

  const _handleChange = (name: string, status: boolean) => {
    setMeta((prevData) => ({
      ...prevData,
      [name]: status,
    }));
  };

  const onSubmit = async () => {
    clearAlert();
    setIsLoading(true);
    const verData = {
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      display_name: userData?.display_name,
      blue_tick_verify: Meta?.blue_tick_verify == true ? "True" : "False",
      id_verify: Meta?.id_verify == true ? "True" : "False",
      ban: Meta?.ban == true ? "True" : "False",
    };
    const response: any = await updUserDetails({
      userID: userData?.id,
      data: verData,
    });
    if (response?.status) {
      setIsLoading(false);
      alertPreviewer(true, "User Status Updated Successfully", "success");
    } else {
      setIsLoading(false);
      alertPreviewer(true, "An error occured. Please try again", "error");
    }
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

      <div className="grid grid-cols-2 gap-4">
        <Switch
          onValueChange={(e) => _handleChange("blue_tick_verify", e)}
          isSelected={Meta?.blue_tick_verify}
          classNames={{
            base: cn(
              "inline-flex flex-row-reverse w-full bg-content1 bg-content2 items-center",
              "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
              "data-[selected=true]:border-primary"
            ),
            wrapper: "p-0 h-4 overflow-visible",
            thumb: cn(
              "w-6 h-6 border-2 shadow-lg",
              "group-data-[hover=true]:border-primary",
              //selected
              "group-data-[selected=true]:ml-6",
              // pressed
              "group-data-[pressed=true]:w-7",
              "group-data-[selected]:group-data-[pressed]:ml-4"
            ),
          }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-bold">Blue Tick Verify</p>
            <p className="text-tiny text-default-400">
              Switch to enable / disable the blue tick verification
            </p>
          </div>
        </Switch>
        <Switch
          isSelected={Meta?.id_verify}
          onValueChange={(e) => _handleChange("id_verify", e)}
          classNames={{
            base: cn(
              "inline-flex flex-row-reverse w-full bg-content1 bg-content2 items-center",
              "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
              "data-[selected=true]:border-primary"
            ),
            wrapper: "p-0 h-4 overflow-visible",
            thumb: cn(
              "w-6 h-6 border-2 shadow-lg",
              "group-data-[hover=true]:border-primary",
              //selected
              "group-data-[selected=true]:ml-6",
              // pressed
              "group-data-[pressed=true]:w-7",
              "group-data-[selected]:group-data-[pressed]:ml-4"
            ),
          }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-bold">ID Verify</p>
            <p className="text-tiny text-default-400">
              Switch to enable / disable the ID verification
            </p>
          </div>
        </Switch>
        <Switch
          isSelected={Meta?.ban}
          onValueChange={(e) => _handleChange("ban", e)}
          classNames={{
            base: cn(
              "inline-flex flex-row-reverse w-full bg-content1 bg-content2 items-center",
              "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
              "data-[selected=true]:border-primary"
            ),
            wrapper: "p-0 h-4 overflow-visible",
            thumb: cn(
              "w-6 h-6 border-2 shadow-lg",
              "group-data-[hover=true]:border-primary",
              //selected
              "group-data-[selected=true]:ml-6",
              // pressed
              "group-data-[pressed=true]:w-7",
              "group-data-[selected]:group-data-[pressed]:ml-4"
            ),
          }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-bold">Ban User</p>
            <p className="text-tiny text-default-400">
              Switch to ban / unban this user
            </p>
          </div>
        </Switch>
      </div>

      <div className="mt-4">
        <Button
          type="button"
          onClick={onSubmit}
          color="primary"
          isLoading={isLoading}
          style={{
            height: 56,
            outline: "none !important",
          }}
          className="w-full outline-none"
        >
          Update
        </Button>
      </div>
    </>
  );
};

export default VerDetails;
