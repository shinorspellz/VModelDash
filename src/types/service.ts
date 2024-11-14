import { SVGProps } from "react";
import { Control, SubmitHandler } from "react-hook-form";

export interface IFormInputs {
  username: string;
  password: string;
}

export interface IFormInputBasic {
  first_name?: string;
  last_name?: string;
  display_name?: string;
  ucat?: string;
  utype?: string;
  ustype?: string;
}

export interface MessageProp{
  message: string
} 
export interface InputTypes {
  type?: "text" | "password";
  placeholder: string;
  id: string;
  name: string;
  control: any;
  label: string;
  required?: string;
  isTextArea?: boolean;
  disabled?: boolean;
  listItems?:
    | {
        label: string;
        value: string;
      }[]
    | undefined;
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
  options?: React.ReactNode;
}

export interface CounterCardsType {
  title: string;
  icon: React.ReactNode;
  counter: string | number;
  url: string;
  isLoading?: boolean;
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

export interface TabDataTypes {
  id: number | string;
  label: string;
}

export interface VMTabTypes {
  initialValue: number | string;
  TabData: TabDataTypes[];
  activeTab: (clickedTab: string) => void;
  isDivider?: boolean;
}

export interface ChildType {
  children: React.ReactNode;
}

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface OnSubmitLogin {
  onSubmit: SubmitHandler<LoginFormValues>;
}

export interface AuthForm {
  control: Control<LoginFormValues>;
  handleSubmit: any;
  onSubmit: SubmitHandler<LoginFormValues>;
  isLoading: boolean;
}

export interface LatestTableType {
  url: string;
  TableColumns: any[];
  enableRowSelection: boolean;
  enableRowActions: boolean;
  renderRowActions: any;
}

export type TgetUserType =
  | {
      data: {};
      status: boolean;
      message: string;
    }
  | any;

export type TDropDown = {
  lable: string;
  value: string;
}[];
