import { SVGProps } from "react";

export interface IFormInputs {
  username: string;
  password: string;
}

export interface InputTypes {
  type: "text" | "password";
  placeholder: string;
  id: string;
  name: string;
  control: any;
  label: string;
  required?: string;
}

export interface SidebarItemType {
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  url: string;
}

export interface DashboardInnerLayoutTypes {
  title: string;
  children: React.ReactNode;
}

export interface CounterCardsType {
  title: string;
  icon: React.ReactNode;
  counter: string | number;
  url: string;
}

export interface BasicCardTypes {
  title?: string;
  desc?: string;
  children: React.ReactNode;
  options?: React.ReactNode;
  maxHeight?: string;
  isPadding?: boolean;
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
