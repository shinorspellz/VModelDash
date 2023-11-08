"use client";

import { logOut } from "@/redux/features/auth-slice";
import { Logout } from "@/service/user";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
  User,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useDispatch } from "react-redux";

const ProfileNav = ({ profileData }: any) => {
  const { isLoader, authData } = profileData;
  const router = useRouter();
  const dispatch = useDispatch();
  //  console.log(authData);
  const _handleLogout = async () => {
    await Logout();
    dispatch(logOut());
    router.push("/");
  };
  return (
    <div className="flex items-center gap-4 relative">
      {isLoader ? (
        <div className="right-0 -top-[0px] h-[50px] w-[210px] z-[999] flex items-center">
          <div className="max-w-full w-full flex items-center gap-0 pl-4">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2 ml-2">
              <Skeleton className="h-4 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        </div>
      ) : (
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: authData.profile_picture_url,
              }}
              className="transition-transform"
              description={`@${authData?.username}`}
              name={`${authData?.first_name} ${authData?.last_name}`}
              classNames={{
                name: "font-bold",
              }}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-bold">Signed in as</p>
              <p className="font-bold">@{authData?.username}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={_handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
};

export default ProfileNav;
