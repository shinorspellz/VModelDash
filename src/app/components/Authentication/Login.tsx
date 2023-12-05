"use client";

import { logIn } from "@/redux/features/auth-slice";
import { AppDispatch } from "@/redux/store";
import { Login } from "@/service/user";
import { IFormInputs } from "@/types/service";
import { Button, Card, CardBody } from "@nextui-org/react";
import { sign } from "jsonwebtoken";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Alerter } from "../General/Alerter";
import TextInput from "../General/TextInput";
import AuthHeader from "./AuthHeader";
import AuthForm from "./AuthForm";
import VMHeader from "../General/VMHeader";

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [_, setCookie] = useCookies(["lStrt"]);
  const dispatch = useDispatch<AppDispatch>();
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
  } = useForm<IFormInputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

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

  const TokenCookie = (data: any, userData: any) => {
    setCookie("lStrt", data, {
      path: "/",
      maxAge: 86400, // Expires after 1hr
      sameSite: true,
    });
    dispatch(logIn(userData));
  };
  const createToken = (data: any) => {
    const jwt = sign(
      {
        token: data?.token,
        user: data?.user,
      },
      "23cb736e-4b37-4e51-a085-b5587366ecbb",
      { expiresIn: "24h" }
    );
    return jwt;
  };

  const clearAlert = () => {
    setNotificateionAlert({
      isEnabled: false,
      message: "",
      type: "",
    });
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    clearAlert();
    setIsLoading(true);
    const userData = await Login(data);

    if (userData?.token) {
      let respToken = createToken(userData);
      if (respToken) {
        alertPreviewer(
          true,
          "Credentials validated successfully. Redirecting to dashboard...",
          "success"
        );
        TokenCookie(respToken, userData);
        // setTimeout(() => {
        //   router.push("dashboard");
        // }, 500);
      }
    } else {
      setIsLoading(false);
      alertPreviewer(true, "Invalid login credentials", "error");
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
      <div className="vm-bg-dark flex flex-col fixed w-full h-full">
        {/* <AuthHeader /> */}
        <div>
          <VMHeader />
        </div>
        <div className="flex w-full h-full md:items-center md:justify-center mt-12 md:mt-0">
          <div className="px-4 md:px-0 max-w-[500px] w-full">
            <Card className="vm-shadow-sm">
              <CardBody>
                <div className="px-1 md:px-6 pt-8 pb-2">
                  <h3 className="font-bold text-[18px]">Welcome Back!</h3>
                  <p className="opacity-60 text-sm">
                    Login with your valid credentials. You must be a VModel
                    employee to login.
                  </p>
                </div>
                <div className="px-1 md:pt-4 pb-8 md:px-6">
                  <AuthForm
                    control={control}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    onSubmit={onSubmit}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
