import { getUserDetails } from "@/service/user";
import { getInitials } from "@/utils/Helper";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Unstable_Grid2 as Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Magicpen } from "iconsax-react";
import { useCallback, useEffect, useState } from "react";
import VMModal from "../General/Widget/VMModal";
import { CloaderS } from "../LoaderAlert";
import { UserBasicDetails } from "./UserBasicDetails";
import { AboutUser } from "./AboutUser";
import UserActivities from "./UserActivities";
import UserActMore from "./UserActMore";
import EditUser from "./EditUser";
import Image from "next/image";

const tabs = [
  { label: "About", value: "details" },
  { label: "Activities", value: "activities" },
  { label: "Social Media Analytics", value: "analytics" },
];
const UserDetails = ({ userID }: { userID: string }) => {
  const [currentTab, setCurrentTab] = useState("details");
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenEdit, setIsOpenEdit] = useState({
    open: false,
    userID: "",
  });
  const [userData, setUserData] = useState<any>({});
  const handleTabsChange = useCallback((event: any, value: any) => {
    setCurrentTab(value);
  }, []);

  const fetchUserDetails = async (userID: string) => {
    const response: any = await getUserDetails(userID);
    if (response) {
      setIsLoading(false);
      // console.log(response);
      setUserData(response?.data);
    }
  };

  useEffect(() => {
    fetchUserDetails(userID);
  }, [userID]);

  return (
    <VMModal url="/users" backTitle="Users">
      {isOpenEdit?.open && (
        <EditUser
          options={{
            onClose: () =>
              setIsOpenEdit({
                open: false,
                userID: "",
              }),
            meta: { ...userData },
          }}
        />
      )}

      {!isLoading ? (
        <>
          <Stack
            alignItems="flex-start"
            direction={{
              xs: "column",
              md: "row",
            }}
            justifyContent="space-between"
            spacing={4}
          >
            <Stack alignItems="center" direction="row" spacing={2}>
              <Avatar
                src={userData?.profile_picture_url}
                sx={{
                  height: 64,
                  width: 64,
                }}
              >
                {getInitials(userData?.display_name)}
              </Avatar>
              <Stack spacing={1} className="relative">
                <Typography variant="h4" className="relative">
                  <span className="relative">
                    {userData?.display_name}{" "}
                    <div className="absolute -right-[30px] top-[9px] w-[20px] h-[20px]  rounded-full">
                      <Image
                        alt="Verified"
                        priority
                        src={`/assets/images/verified.png`}
                        width={20}
                        height={20}
                        style={{
                          filter: userData?.blue_tick_verified
                            ? ""
                            : "grayscale(100%)",
                        }}
                        className="rounded-[999px]"
                      />
                    </div>
                  </span>
                </Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Typography variant="subtitle2">Email Address:</Typography>
                  <Chip label={userData?.email} size="small" />
                </Stack>
              </Stack>
            </Stack>
            <Stack alignItems="center" direction="row" spacing={2}>
              <Button
                color="primary"
                variant="contained"
                onClick={() =>
                  setIsOpenEdit({
                    open: true,
                    userID: userData?.id,
                  })
                }
                startIcon={<Magicpen size="32" color="rgba(255,255,255,.8)" />}
                sx={{
                  borderRadius: 40,
                  textTransform: "unset",
                  paddingLeft: 4,
                  paddingRight: 4,
                }}
              >
                Edit User
              </Button>
            </Stack>
          </Stack>
          <Box
            sx={{
              ".MuiButtonBase-root": {
                textTransform: "unset",
              },
            }}
          >
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ mt: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
            <Divider />
          </Box>

          {currentTab === "details" && (
            <div>
              <Grid container spacing={4}>
                <Grid xs={12} lg={4}>
                  <UserBasicDetails
                    title="Basic Details"
                    data={[
                      {
                        title: "Full Name",
                        desc: userData?.display_name,
                      },
                      {
                        title: "Personality",
                        desc: userData?.personality,
                      },
                      {
                        title: "Country",
                        desc: userData?.country,
                      },
                      {
                        title: "Date of Birth",
                        desc: userData?.dob,
                      },
                      {
                        title: "Email Address",
                        desc: userData?.email,
                      },
                      {
                        title: "Phone Number",
                        desc: userData?.phone_number?.number,
                      },
                    ]}
                  />
                </Grid>
                <Grid xs={12} lg={8}>
                  <Stack spacing={4}>
                    <AboutUser bioData={userData?.bio} />
                  </Stack>
                </Grid>
              </Grid>
            </div>
          )}

          {currentTab === "analytics" && (
            <div>
              <UserActivities userData={userData} />
            </div>
          )}
          {currentTab === "activities" && (
            <div>
              <UserActMore userData={userData} />
            </div>
          )}
        </>
      ) : (
        <div className="h-[60vh] flex justify-center items-center">
          <CloaderS />
        </div>
      )}
    </VMModal>
  );
};

export default UserDetails;
