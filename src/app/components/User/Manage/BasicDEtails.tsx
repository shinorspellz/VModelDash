import { updUserDetails } from "@/service/user";
import { IFormInputBasic } from "@/types/service";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alerter } from "../../General/Alerter";
import TextInput from "../../General/TextInput";

const BasicDEtails = ({ userData }: { userData: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [NotificateionAlert, setNotificateionAlert] = useState({
    isEnabled: false,
    message: "",
    type: "",
  });
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm<IFormInputBasic>({
    defaultValues: {
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      display_name: userData?.display_name,
    },
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

  const onSubmit: SubmitHandler<IFormInputBasic> = async (data) => {
    clearAlert();
    setIsLoading(true);
    const response: any = await updUserDetails({
      userID: userData?.id,
      data,
    });
    if (response?.status) {
      setIsLoading(false);
      alertPreviewer(true, "Profile Updated Successfully", "success");
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-4">
          <TextInput
            type="text"
            placeholder="First name"
            control={control}
            label={"First Name"}
            name="first_name"
            id="first_name"
            required={"First Name is required"}
          />

          <TextInput
            type="text"
            placeholder="Last name"
            control={control}
            label={"Last Name"}
            name="last_name"
            id="last_name"
            required={"Last Name is required"}
          />

          <TextInput
            type="text"
            placeholder="Display Name"
            control={control}
            label={"Display Name"}
            name="display_name"
            id="display_name"
            required={"Display Name is required"}
          />

          {/* <TextInput
          type="text"
          placeholder="Email Address"
          control={control}
          label={"Email Address"}
          name="email"
          id="email"
          required={"Email Address is required"}
        /> */}

          {/* <SelectDropDown
          placeholder="Select Gender"
          control={control}
          label={"Select Gender"}
          name="gender"
          id="gender"
          required={"Gender is required"}
          listItems={[
            {
              label: "Male",
              value: "MALE",
            },
            {
              label: "Female",
              value: "FEMALE",
            },
            {
              label: "Any",
              value: "any",
            },
          ]}
        /> */}
        </div>
        {/* <div className="w-full py-4">
        <TextInput
          type="text"
          placeholder="Bio"
          control={control}
          label={"Bio"}
          name="bio"
          id="bio"
          isTextArea={true}
          required={"Bio is required"}
        />
      </div> */}
        <div className="mt-4">
          <Button
            type="submit"
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
      </form>
    </>
  );
};

export default BasicDEtails;
