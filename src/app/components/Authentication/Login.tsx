"use client";

import { Button, Card, CardBody, Input } from "@nextui-org/react";
import React, { useState } from "react";
import AuthHeader from "./AuthHeader";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { IFormInputs } from "@/types/service";
import TextInput from "../General/TextInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Login } from "@/service/user";
import { sign } from "jsonwebtoken";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logIn } from "@/redux/features/auth-slice";
import { Alerter } from "../General/Alerter";

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
    const userData = await Login({
      username: data.username,
      password: data.password,
    });

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
      <div className="vm-bg flex py-8 fixed w-full h-full items-center justify-center">
        <AuthHeader />
        <div className="px-4 md:px-0 max-w-[500px] w-full">
          <Card className="vm-shadow-sm">
            <CardBody>
              <div className="px-1 md:px-6 pt-8 pb-2">
                <h3 className="font-bold text-[18px]">Welcome Back!</h3>
                <p className="opacity-60 text-sm">
                  Login with your valid credentials.
                </p>
              </div>
              <div className="px-1 md:pt-4 pb-8 md:px-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-6">
                    <TextInput
                      type="text"
                      placeholder="Enter your username"
                      control={control}
                      label={"Username"}
                      name="username"
                      id="username"
                      required={"Username is required"}
                    />
                    <TextInput
                      type="password"
                      placeholder="Enter your password"
                      control={control}
                      label={"Password"}
                      name="password"
                      id="password"
                      required={"Password is required"}
                    />
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
                      Log In
                    </Button>
                    <div className="text-center">
                      <Link href="/">
                        <div className="text-primary text-sm">
                          Forgot Password?
                        </div>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
