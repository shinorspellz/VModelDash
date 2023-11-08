"use client";

import { RootState } from "@/redux/store";
import { ChildType } from "@/types/service";
import { Spinner } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

import React, { useEffect, useCallback, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

const AuthGuard = (props: ChildType) => {
  const { children } = props;
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [getCookie, _] = useCookies(["lStrt"]);
  const authData = useSelector((state: RootState) => state.authReducer.value);
  const router = useRouter();

  useEffect(() => {
    if (authData?.isAuth) {
      if (pathname == "/") {
        router.push("/dashboard");
      } else {
        setChecked(true);
      }
    } else {
      if (pathname != "/") {
        router.push("/");
      } else {
        setChecked(true);
      }
    }
  }, [pathname, authData]);

  if (!checked) {
    return (
      <>
        <div className="absolute left-0 w-full h-full flex items-center justify-center top-0">
          <Spinner size="lg" />
        </div>
      </>
    );
  }
  return <>{children}</>;
};

export default AuthGuard;
