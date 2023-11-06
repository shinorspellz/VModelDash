import Link from "next/link";
import React from "react";
import { Logo } from "../General/logo";

const AuthHeader = () => {
  return (
    <header className="fixed left-0 w-full z-[1100] top-8 right-0">
      <div className="container vm-container">
        <div className="h-[64px] flex flex-row">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
