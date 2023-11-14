import React from "react";
import TextInput from "../General/TextInput";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { AuthForm } from "@/types/service";

const AuthForm = ({ handleSubmit, onSubmit, control, isLoading }: AuthForm) => {
  return (
    <>
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
              <div className="text-primary text-sm">Forgot Password?</div>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default AuthForm;
