"use client";

import AuthGuard from "@/app/Providers/AuthGuard";
import { store } from "./store";

import { Provider } from "react-redux";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthGuard>{children}</AuthGuard>
    </Provider>
  );
}
