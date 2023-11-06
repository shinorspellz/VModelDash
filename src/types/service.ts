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
