import { Alerter } from "@/app/components/General/Alerter";
import SelectDropDown from "@/app/components/General/SelectDropDown";
import { getUserType, updUserType } from "@/service/user";
import { IFormInputBasic, TDropDown, TgetUserType } from "@/types/service";
import { storeUserDetails } from "@/utils/AtomProviders";
import { formatString } from "@/utils/capitalize";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Usertype = () => {
  const [userData]: any = useAtom(storeUserDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [allCategories, setallCategories] = useState<any>([]);
  const [subCategories, setSubCategories] = useState<any>([]);
  const [subSubCategories, setSubSubCategories] = useState<any>([]);
  const [masterCategories, setMasterCategories] = useState<any>([]);
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
    watch,
    formState: { errors },
  } = useForm<IFormInputBasic>({
    defaultValues: {
      ucat: "",
      utype: "",
      ustype: "",
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

  useEffect(() => {
    const selectedMaster: any = watch().ucat;
    if (!selectedMaster || !allCategories?.[selectedMaster]) return;
    const selectedMasterCat: any = allCategories?.[selectedMaster];
    setSubSubCategories([]);
    if (isNaN(Number(Object.keys(selectedMasterCat)[0]))) {
      if (Object.keys(selectedMasterCat).length) {
        const subCats = Object.keys(selectedMasterCat).map((item: any) => ({
          label: formatString(item),
          value: item,
        }));
        setSubCategories(subCats);
      }
    } else {
      const subCats = Object.values(selectedMasterCat).map((item: any) => ({
        label: formatString(item),
        value: item,
      }));
      setSubCategories(subCats);
    }
  }, [watch().ucat]);

  useEffect(() => {
    const selectedMaster: any = watch().ucat;
    const selectedMasterSub: any = watch().utype;
    setSubSubCategories([]);
    if (
      !selectedMasterSub ||
      !allCategories?.[selectedMaster]?.[selectedMasterSub]
    )
      return;
    if (allCategories?.[selectedMaster]?.[selectedMasterSub].length) {
      const subList = allCategories?.[selectedMaster]?.[selectedMasterSub];
      if (subList.length) {
        const subCats = Object.values(subList).map((item: any) => ({
          label: formatString(item),
          value: item,
        }));
        setSubSubCategories(subCats);
      }
    }
  }, [watch().utype]);

  useEffect(() => {
    (async () => {
      const { data, message, status }: TgetUserType = await getUserType();
      if (data) {
        setSubCategories([]);
        setallCategories(data);
        const masterCat = Object.entries(data).map(([key, value]) => ({
          label: formatString(key),
          value: key,
        }));
        setMasterCategories(masterCat);
      }
    })();
  }, [userData?.id]);

  const onSubmitUType: SubmitHandler<IFormInputBasic> = async (data) => {
    clearAlert();
    setIsLoading(true);
    const typeData = {
      user_type: data?.ustype !== "" ? data?.ustype : data?.utype,
    };
    const response: any = await updUserType({
      userID: userData?.id,
      typeData,
    });
    if (response?.status) {
      setIsLoading(false);
      alertPreviewer(true, "User Type Updated Successfully", "success");
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
      <Card>
        <CardHeader>Update User Type</CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmitUType)}>
            <div className="flex flex-row gap-x-3">
              <div
                className={`w-[80%] grid ${
                  subSubCategories?.length > 0 ? "grid-cols-3" : "grid-cols-2"
                } gap-3`}
              >
                <SelectDropDown
                  placeholder="User Category Type"
                  control={control}
                  label={"User Category Type"}
                  name="ucat"
                  id="ucat"
                  required={"User Category Type is required"}
                  listItems={masterCategories}
                />
                <SelectDropDown
                  placeholder="User Type"
                  control={control}
                  label={"User Type"}
                  name="utype"
                  disabled={subCategories?.length > 0 ? false : true}
                  id="utype"
                  required={"User Type is required"}
                  listItems={subCategories}
                />
                {subSubCategories.length > 0 && (
                  <SelectDropDown
                    placeholder="Sub User Type"
                    control={control}
                    label={"Sub User Type"}
                    name="ustype"
                    disabled={subSubCategories?.length > 0 ? false : true}
                    id="utype"
                    required={"Sub User Type is required"}
                    listItems={subSubCategories}
                  />
                )}
              </div>
              <div className="w-[20%]">
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
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default Usertype;
